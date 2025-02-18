
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')

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

    console.log('Received input:', { education, goals, fileContent })

    // Create sample courses based on the Google Sheet data
    const courses = [
      {
        title: "Machine Learning and Data Analytics",
        description: "Comprehensive course covering machine learning fundamentals and data analysis techniques",
        skills: ["Python", "Machine Learning", "Data Analysis"],
        prerequisites: ["Basic Programming", "Statistics"],
        price: "$99",
        difficulty: "Intermediate",
        duration: "12 weeks",
        roadmap: ["Introduction to ML", "Data Processing", "Model Building", "Deployment"],
        courseNumber: "ML101",
        organization: "DeepMind Academy",
        certificationType: "Professional Certificate",
        rating: 4.8,
        studentsEnrolled: "250k",
        similarity_score: 0.95
      },
      {
        title: "AI for Business Applications",
        description: "Learn to apply AI solutions to real business problems",
        skills: ["AI", "Business Strategy", "Problem Solving"],
        prerequisites: ["Business Fundamentals", "Basic AI Knowledge"],
        price: "$149",
        difficulty: "Advanced",
        duration: "10 weeks",
        roadmap: ["AI Basics", "Business Use Cases", "Implementation", "Scaling"],
        courseNumber: "AI201",
        organization: "Google AI",
        certificationType: "Specialization",
        rating: 4.6,
        studentsEnrolled: "180k",
        similarity_score: 0.85
      },
      {
        title: "Introduction to Data Science",
        description: "Foundation course in data science principles and practices",
        skills: ["Python", "Statistics", "Data Visualization"],
        prerequisites: ["Basic Math"],
        price: "$79",
        difficulty: "Beginner",
        duration: "8 weeks",
        roadmap: ["Data Basics", "Python Programming", "Data Analysis", "Visualization"],
        courseNumber: "DS100",
        organization: "DataCamp",
        certificationType: "Course",
        rating: 4.9,
        studentsEnrolled: "500k",
        similarity_score: 0.75
      }
    ];

    // Log the response before sending
    console.log('Sending response:', { courses });

    return new Response(
      JSON.stringify({ courses }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json'
        } 
      }
    )

  } catch (error) {
    console.error('Error in generate-recommendations function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json'
        }
      }
    )
  }
})
