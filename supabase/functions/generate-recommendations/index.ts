
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { education, goals, fileContent } = await req.json()

    // Prepare the prompt for Gemini with more explicit instructions
    const prompt = `You are a course recommendation system. Based on the following information, recommend 8 most suitable courses. 
    
    Education Background: ${education}
    Future Goals: ${goals}
    Additional Information: ${fileContent || 'No additional documents provided'}
    
    IMPORTANT: Your response must be strictly formatted as a valid JSON object with this exact structure:
    {
      "courses": [
        {
          "title": "string",
          "description": "string",
          "skills": ["string"],
          "prerequisites": ["string"],
          "price": "string",
          "difficulty": "beginner/intermediate/advanced",
          "duration": "string",
          "roadmap": ["string"]
        }
      ]
    }
    
    DO NOT include any additional text, explanations, or formatting - ONLY the JSON object.`

    console.log('Making API request to Gemini with prompt:', prompt)

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': Deno.env.get('GEMINI_API_KEY') || '',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.3, // Reduced temperature for more consistent output
          maxOutputTokens: 4096,
        },
      }),
    })

    if (!response.ok) {
      console.error('Gemini API error:', response.status, response.statusText)
      const errorBody = await response.text()
      console.error('Error body:', errorBody)
      throw new Error(`Gemini API request failed: ${response.statusText}`)
    }

    const data = await response.json()
    console.log('Raw Gemini API response:', JSON.stringify(data))

    if (!data || !data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      console.error('Invalid response format from Gemini:', data)
      throw new Error('Invalid response format from Gemini API')
    }

    // Get the raw text response from Gemini
    const rawText = data.candidates[0].content.parts[0].text
    console.log('Raw text from Gemini:', rawText)

    try {
      // Try to extract JSON from the response text
      // First, try to find JSON-like content using regex
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : rawText;
      
      console.log('Attempting to parse JSON string:', jsonString)
      
      const recommendations = JSON.parse(jsonString)

      // Validate the parsed JSON structure
      if (!recommendations || !Array.isArray(recommendations.courses)) {
        console.error('Invalid recommendations structure:', recommendations)
        throw new Error('Invalid recommendations structure')
      }

      // Validate each course object
      const validatedCourses = recommendations.courses.map(course => {
        if (!course.title || !course.description || !Array.isArray(course.skills) || 
            !Array.isArray(course.prerequisites) || !course.price || !course.difficulty || 
            !course.duration || !Array.isArray(course.roadmap)) {
          console.error('Invalid course object:', course)
          throw new Error('Invalid course object structure')
        }
        return course
      })

      return new Response(
        JSON.stringify({ courses: validatedCourses }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError)
      console.error('Failed to parse text:', rawText)
      
      // Return a more detailed error response
      return new Response(
        JSON.stringify({ 
          error: 'Failed to parse Gemini response as JSON',
          details: parseError.message,
          rawResponse: rawText
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      )
    }
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
