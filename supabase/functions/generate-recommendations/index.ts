
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const { education, goals, fileContent } = body

    // Prepare the prompt for Deepseek
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
    
    Ensure each course is relevant to the user's background and goals.`

    const headers = {
      'Authorization': `Bearer ${Deno.env.get('DEEPSEEK_API_KEY')}`,
      'Content-Type': 'application/json',
    }

    const response = await fetch('https://api.groq.com/v1/chat/completions', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        messages: [{ role: 'user', content: prompt }],
        model: "deepseek-r1-distill-llama-70b",
        temperature: 0.6,
        max_completion_tokens: 4096,
        top_p: 0.95,
      }),
    })

    const data = await response.json()
    const recommendations = JSON.parse(data.choices[0].message.content)

    return new Response(
      JSON.stringify(recommendations),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
