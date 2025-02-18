
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Full dataset from Google Sheets
const dataset = [
  {
    courseNumber: "AI101",
    title: "Foundations of Artificial Intelligence",
    description: "Comprehensive introduction to AI concepts and applications",
    organization: "MIT OpenCourseWare",
    certificationType: "Professional Certificate",
    rating: 4.9,
    difficulty: "Beginner",
    studentsEnrolled: "680k",
    prerequisites: ["Basic Programming", "Mathematics"],
    skills: ["AI Fundamentals", "Python", "Machine Learning Basics"],
    price: "$99",
    duration: "10 weeks",
    roadmap: ["AI Fundamentals", "Machine Learning Basics", "Neural Networks", "AI Applications"]
  },
  {
    courseNumber: "ML202",
    title: "Applied Machine Learning",
    description: "Hands-on machine learning with real-world applications",
    organization: "Stanford Online",
    certificationType: "Specialization",
    rating: 4.8,
    difficulty: "Intermediate",
    studentsEnrolled: "450k",
    prerequisites: ["Python Programming", "Basic Statistics"],
    skills: ["Machine Learning", "Data Analysis", "Model Development"],
    price: "$149",
    duration: "12 weeks",
    roadmap: ["ML Fundamentals", "Supervised Learning", "Unsupervised Learning", "Model Deployment"]
  },
  {
    courseNumber: "DL303",
    title: "Deep Learning Specialization",
    description: "Advanced deep learning concepts and neural networks",
    organization: "DeepLearning.AI",
    certificationType: "Professional Certificate",
    rating: 4.9,
    difficulty: "Advanced",
    studentsEnrolled: "320k",
    prerequisites: ["Machine Learning", "Advanced Mathematics"],
    skills: ["Deep Learning", "Neural Networks", "TensorFlow"],
    price: "$199",
    duration: "16 weeks",
    roadmap: ["Deep Learning Basics", "CNN", "RNN", "Transformers"]
  },
  {
    courseNumber: "DS101",
    title: "Data Science Essentials",
    description: "Fundamental concepts of data science and analytics",
    organization: "IBM Professional",
    certificationType: "Course",
    rating: 4.7,
    difficulty: "Beginner",
    studentsEnrolled: "550k",
    prerequisites: ["Basic Mathematics"],
    skills: ["Data Analysis", "Python", "Statistics"],
    price: "$79",
    duration: "8 weeks",
    roadmap: ["Data Basics", "Statistical Analysis", "Data Visualization", "Basic ML"]
  },
  {
    courseNumber: "CV401",
    title: "Computer Vision Applications",
    description: "Advanced computer vision and image processing",
    organization: "Google AI",
    certificationType: "Specialization",
    rating: 4.8,
    difficulty: "Advanced",
    studentsEnrolled: "180k",
    prerequisites: ["Deep Learning", "Python Programming"],
    skills: ["Computer Vision", "OpenCV", "Deep Learning"],
    price: "$179",
    duration: "14 weeks",
    roadmap: ["Image Processing", "Object Detection", "Image Segmentation", "Applications"]
  }
];

function calculateSimilarityScore(course: any, userInput: { education: string, goals: string }): number {
  const { education, goals } = userInput;
  let score = 0;
  const inputText = (education + " " + goals).toLowerCase();

  // Match based on course title and description
  if (course.title.toLowerCase().includes(inputText) || 
      course.description.toLowerCase().includes(inputText)) {
    score += 0.3;
  }

  // Match based on skills
  const skillsMatch = course.skills.some((skill: string) => 
    inputText.includes(skill.toLowerCase())
  );
  if (skillsMatch) score += 0.2;

  // Match based on difficulty level
  const difficultyTerms = {
    beginner: ["new", "start", "basic", "fundamental", "introduction"],
    intermediate: ["intermediate", "some experience", "familiar"],
    advanced: ["advanced", "expert", "professional"]
  };

  const userLevel = Object.entries(difficultyTerms).find(([level, terms]) =>
    terms.some(term => inputText.includes(term))
  )?.[0] || "beginner";

  if (course.difficulty.toLowerCase() === userLevel) {
    score += 0.2;
  }

  // Match based on prerequisites
  const prereqMatch = course.prerequisites.some((prereq: string) =>
    inputText.includes(prereq.toLowerCase())
  );
  if (prereqMatch) score += 0.2;

  // Normalize score to be between 0 and 1
  return Math.min(Math.max(score, 0.1), 1);
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { education, goals } = await req.json();
    console.log('Analyzing user input:', { education, goals });

    // Calculate similarity scores for each course
    const coursesWithScores = dataset.map(course => ({
      ...course,
      similarity_score: calculateSimilarityScore(course, { education, goals })
    }));

    // Sort by similarity score and filter out low-relevance courses
    const recommendedCourses = coursesWithScores
      .filter(course => course.similarity_score > 0.2)
      .sort((a, b) => b.similarity_score - a.similarity_score);

    console.log(`Found ${recommendedCourses.length} relevant courses`);

    return new Response(
      JSON.stringify({ courses: recommendedCourses }),
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
