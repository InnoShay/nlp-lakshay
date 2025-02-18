
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const dataset = [
  {
    courseNumber: "CS-101",
    title: "Introduction to Artificial Intelligence",
    description: "Learn the fundamentals of AI, including machine learning, neural networks, and deep learning",
    organization: "Stanford Online",
    certificationType: "Professional Certificate",
    rating: 4.8,
    difficulty: "Beginner",
    studentsEnrolled: "450k",
    prerequisites: ["Basic Python", "Mathematics"],
    skills: ["AI", "Machine Learning", "Neural Networks"],
    price: "$99",
    duration: "8 weeks",
    roadmap: ["AI Fundamentals", "Machine Learning Basics", "Neural Networks", "Deep Learning"],
    similarity_score: 0.95
  },
  {
    courseNumber: "DS-201",
    title: "Data Science and Analytics",
    description: "Master data science techniques and tools for analyzing complex datasets",
    organization: "IBM Professional",
    certificationType: "Specialization",
    rating: 4.7,
    difficulty: "Intermediate",
    studentsEnrolled: "320k",
    prerequisites: ["Statistics", "Programming"],
    skills: ["Data Analysis", "Python", "Statistical Analysis"],
    price: "$149",
    duration: "12 weeks",
    roadmap: ["Data Analysis", "Statistical Methods", "Machine Learning", "Big Data"],
    similarity_score: 0.85
  },
  {
    courseNumber: "ML-301",
    title: "Advanced Machine Learning",
    description: "Deep dive into advanced ML concepts and applications",
    organization: "Google AI",
    certificationType: "Course",
    rating: 4.9,
    difficulty: "Advanced",
    studentsEnrolled: "180k",
    prerequisites: ["Machine Learning Basics", "Advanced Mathematics"],
    skills: ["Advanced ML", "Deep Learning", "Model Optimization"],
    price: "$199",
    duration: "10 weeks",
    roadmap: ["Advanced Algorithms", "Model Architecture", "Optimization", "Deployment"],
    similarity_score: 0.75
  }
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { education, goals } = await req.json()
    console.log('Received input:', { education, goals });

    // For now, we'll return dataset courses with calculated similarity scores
    const coursesWithScores = dataset.map((course, index) => ({
      ...course,
      // Calculate a decaying similarity score based on education and goals match
      // This is a simplified scoring - in production, you'd want more sophisticated matching
      similarity_score: Math.max(0.1, 1 - (index * 0.2))
    }));

    console.log('Sending courses:', coursesWithScores);

    return new Response(
      JSON.stringify({ courses: coursesWithScores }),
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
