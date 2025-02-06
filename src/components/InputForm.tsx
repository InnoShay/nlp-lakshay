
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { BookOpen, Send, Target, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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
      const response = await fetch("YOUR_BACKEND_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ education, goals }),
      });

      if (!response.ok) throw new Error("Failed to get recommendations");

      const data = await response.json();
      // Store recommendations in localStorage to access them in the recommendations page
      localStorage.setItem("recommendations", JSON.stringify(data));
      navigate("/recommendations");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="input-form" className="py-20 px-4 bg-accent min-h-screen">
      <div className="max-w-3xl mx-auto">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-secondary/95 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-primary/20"
        >
          <h2 className="text-3xl font-bold text-primary mb-8 flex items-center gap-3">
            <BookOpen className="w-8 h-8" />
            Your Profile
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-primary/90 mb-2 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Educational Background
              </label>
              <Textarea 
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="Enter your qualifications, skills, and relevant experience..."
                className="w-full bg-accent/10 border-primary/20 text-white placeholder:text-white/50 min-h-[120px]"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-primary/90 mb-2 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Future Goals
              </label>
              <Textarea 
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                placeholder="What are your career aspirations and learning objectives?"
                className="w-full bg-accent/10 border-primary/20 text-white placeholder:text-white/50 min-h-[120px]"
                required
              />
            </div>
            
            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
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
