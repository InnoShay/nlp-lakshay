
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

    // Prepare the prompt for Gemini
    const prompt = `Based on the following information, recommend 8 most suitable courses with detailed information:
    
    Education Background: ${education}
    Future Goals: ${goals}
    Additional Information: ${fileContent || 'No additional documents provided'}
    
    Please provide the recommendations in the following JSON format:
    {
      "courses": [{
        "title": "Course Title",
        "description": "Detailed course description",
        "skills": ["skill1", "skill2", "skill3"],
        "prerequisites": ["prerequisite1", "prerequisite2"],
        "price": "price in USD",
        "difficulty": "beginner/intermediate/advanced",
        "duration": "duration in weeks/months",
        "roadmap": ["step1", "step2", "step3"]
      }]
    }
    
    Ensure each course is highly relevant to the user's background and goals. Include a comprehensive roadmap for each course.`

    console.log('Making API request to Gemini...')

    // Call Gemini API
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
          temperature: 0.6,
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
    console.log('Gemini API response:', JSON.stringify(data))

    if (!data || !data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0].text) {
      console.error('Invalid response format from Gemini:', data)
      throw new Error('Invalid response format from Gemini API')
    }

    try {
      const recommendations = JSON.parse(data.candidates[0].content.parts[0].text)

      if (!recommendations || !recommendations.courses || !Array.isArray(recommendations.courses)) {
        console.error('Invalid recommendations format:', recommendations)
        throw new Error('Invalid recommendations format')
      }

      return new Response(
        JSON.stringify(recommendations),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError)
      throw new Error('Failed to parse Gemini response as JSON')
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
