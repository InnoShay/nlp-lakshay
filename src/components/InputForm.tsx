
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { BookOpen, Send, Target, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const InputForm = () => {
  const [education, setEducation] = useState("");
  const [goals, setGoals] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // For now, we'll fetch all courses and do a simple matching
      // In a real recommendation system, you'd want more sophisticated matching
      const { data: courses, error } = await supabase
        .from('courses')
        .select('*');

      if (error) throw error;

      // Simple matching based on skills and prerequisites
      const recommendations = courses
        .map(course => ({
          ...course,
          similarity_score: calculateSimilarity(course, education, goals)
        }))
        .sort((a, b) => b.similarity_score - a.similarity_score)
        .slice(0, 3); // Get top 3 recommendations

      localStorage.setItem("recommendations", JSON.stringify(recommendations));
      navigate("/recommendations");
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to get recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Simple similarity calculation based on keyword matching
  const calculateSimilarity = (course: any, education: string, goals: string) => {
    const combinedUserInput = (education + " " + goals).toLowerCase();
    const courseText = (course.title + " " + course.description + " " + course.skills).toLowerCase();
    
    // Count how many course keywords appear in user input
    const courseWords = courseText.split(/\W+/);
    const matchingWords = courseWords.filter(word => 
      word.length > 3 && combinedUserInput.includes(word)
    );
    
    return matchingWords.length / courseWords.length;
  };

  return (
    <section id="input-form" className="py-20 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card p-8 rounded-2xl"
        >
          <h2 className="text-3xl font-bold text-primary mb-8 flex items-center gap-3">
            <BookOpen className="w-8 h-8" />
            Your Profile
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Educational Background
              </label>
              <Textarea 
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="Enter your qualifications, skills, and relevant experience..."
                className="w-full bg-background/50 dark:bg-white/5 border-primary/20 placeholder:text-foreground/50 min-h-[120px]"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Future Goals
              </label>
              <Textarea 
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                placeholder="What are your career aspirations and learning objectives?"
                className="w-full bg-background/50 dark:bg-white/5 border-primary/20 placeholder:text-foreground/50 min-h-[120px]"
                required
              />
            </div>
            
            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 text-white rounded-xl py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              size="lg"
            >
              {isLoading ? "Getting Recommendations..." : "Get Recommendations"}
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};
