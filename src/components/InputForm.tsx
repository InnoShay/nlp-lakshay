import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { BookOpen, Send, Target, GraduationCap, Upload, Loader2, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Course {
  title: string;
  description: string;
  skills: string[];
  prerequisites: string[];
  price: string;
  difficulty: string;
  duration: string;
  roadmap: string[];
}

interface DeepseekResponse {
  courses: Course[];
}

export const InputForm = () => {
  const [education, setEducation] = useState("");
  const [goals, setGoals] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const readFileContent = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.readAsText(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let fileContent = '';
      if (file) {
        fileContent = await readFileContent(file);
      }

      // Get course recommendations from Deepseek
      const { data: recommendations, error: apiError } = await supabase.functions
        .invoke<DeepseekResponse>('generate-recommendations', {
          body: { education, goals, fileContent },
        });

      if (apiError) throw apiError;

      // Calculate similarity scores for the recommendations
      const recommendationsWithScores = recommendations.courses.map(course => ({
        ...course,
        similarity_score: calculateSimilarity(course, education, goals),
      }));

      localStorage.setItem("recommendations", JSON.stringify(recommendationsWithScores));
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

  const calculateSimilarity = (course: any, education: string, goals: string) => {
    const combinedUserInput = (education + " " + goals).toLowerCase();
    const courseText = (course.title + " " + course.description + " " + course.skills.join(" ")).toLowerCase();
    
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

            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2 flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Resume/CV (Optional)
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".txt,.pdf,.doc,.docx"
                className="w-full bg-background/50 dark:bg-white/5 border border-primary/20 rounded-lg p-2"
              />
              {file && (
                <p className="text-sm text-foreground/70 mt-2">
                  Selected file: {file.name}
                </p>
              )}
            </div>
            
            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 text-white rounded-xl py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Getting Recommendations...
                </>
              ) : (
                <>
                  Get Recommendations
                  <Send className="w-5 h-5" />
                </>
              )}
            </Button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};
