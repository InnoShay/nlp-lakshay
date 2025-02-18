
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')

if (!GEMINI_API_KEY) {
  console.error('Missing GEMINI_API_KEY environment variable')
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { prompt, type, education, goals, fileContent } = await req.json()

    let promptText = ''
    if (type === 'chat') {
      promptText = `You are a helpful AI assistant for a course recommendation platform. Respond to the following message in a friendly, concise, and helpful way: ${prompt}`
    } else {
      promptText = `You are a course recommendation system. Based on the following information, recommend up to 12 suitable courses:

Education Background: ${education || 'Not specified'}
Future Goals: ${goals || 'Not specified'}
Additional Context: ${fileContent || 'None provided'}

For each course, provide:
- A descriptive title
- A brief description
- Required skills
- Prerequisites
- Estimated price
- Difficulty level (beginner/intermediate/advanced)
- Duration
- A step-by-step learning roadmap
- A relevance score from 0.0 to 1.0

Format as JSON like this:
{
  "courses": [
    {
      "title": string,
      "description": string,
      "skills": string[],
      "prerequisites": string[],
      "price": string,
      "difficulty": string,
      "duration": string,
      "roadmap": string[],
      "similarity_score": number
    }
  ]
}`
    }

    console.log('Sending request to Gemini API with prompt:', promptText)

    const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GEMINI_API_KEY}`,
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: promptText
          }]
        }],
        generationConfig: {
          temperature: type === 'chat' ? 0.7 : 0.3,
          maxOutputTokens: 2048,
          topP: 0.8,
          topK: 40
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error('Gemini API error:', response.status, response.statusText)
      console.error('Error body:', errorBody)
      throw new Error(`Gemini API request failed: ${response.statusText} - ${errorBody}`)
    }

    const data = await response.json()
    console.log('Raw Gemini API response:', JSON.stringify(data))

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error('Invalid response format from Gemini:', data)
      throw new Error('Invalid response format from Gemini API')
    }

    const rawText = data.candidates[0].content.parts[0].text
    console.log('Raw text from Gemini:', rawText)

    if (type === 'chat') {
      return new Response(
        JSON.stringify({ response: rawText }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } else {
      try {
        const jsonMatch = rawText.match(/\{[\s\S]*\}/)
        const jsonString = jsonMatch ? jsonMatch[0] : rawText
        
        console.log('Attempting to parse JSON string:', jsonString)
        
        const recommendations = JSON.parse(jsonString)

        if (!recommendations?.courses?.length) {
          throw new Error('No courses found in response')
        }

        const validatedCourses = recommendations.courses
          .map((course, index) => ({
            ...course,
            similarity_score: course.similarity_score ?? (1 - (index * 0.05))
          }))
          .sort((a, b) => b.similarity_score - a.similarity_score)
          .slice(0, 12)

        return new Response(
          JSON.stringify({ courses: validatedCourses }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      } catch (parseError) {
        console.error('Error parsing Gemini response:', parseError)
        console.error('Failed to parse text:', rawText)
        
        return new Response(
          JSON.stringify({ 
            error: 'Failed to parse Gemini response',
            details: parseError.message,
            rawResponse: rawText
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500 
          }
        )
      }
    }
  } catch (error) {
    console.error('Error in Edge Function:', error)
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
