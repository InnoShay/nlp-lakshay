
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Star, ArrowLeft, Sun, Moon, Clock, DollarSign, BookOpen, Target, X, ThumbsUp, ThumbsDown } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Recommendation {
  title: string;
  similarity_score: number;
  description: string;
  skills: string[];
  prerequisites: string[];
  price: string;
  difficulty: string;
  duration: string;
  roadmap: string[];
  feedback?: 'like' | 'dislike';
}

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Recommendation | null>(null);
  const [sortBy, setSortBy] = useState<string>("similarity");
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
    const storedRecs = localStorage.getItem("recommendations");
    if (!storedRecs) {
      navigate("/");
      return;
    }
    const parsedRecs = JSON.parse(storedRecs);
    // Sort by similarity score by default
    setRecommendations(parsedRecs.sort((a: Recommendation, b: Recommendation) => 
      b.similarity_score - a.similarity_score
    ));
  }, [navigate]);

  const handleSort = (value: string) => {
    setSortBy(value);
    const sorted = [...recommendations].sort((a, b) => {
      switch (value) {
        case "similarity":
          return b.similarity_score - a.similarity_score;
        case "difficulty":
          const order = { beginner: 1, intermediate: 2, advanced: 3 };
          return (order[a.difficulty.toLowerCase() as keyof typeof order] || 0) - 
                 (order[b.difficulty.toLowerCase() as keyof typeof order] || 0);
        default:
          return 0;
      }
    });
    setRecommendations(sorted);
  };

  const handleFeedback = (index: number, type: 'like' | 'dislike') => {
    const updatedRecs = [...recommendations];
    updatedRecs[index] = { ...updatedRecs[index], feedback: type };
    setRecommendations(updatedRecs);
    localStorage.setItem("recommendations", JSON.stringify(updatedRecs));
    
    toast({
      title: "Thank you for your feedback!",
      description: "Your input helps us improve our recommendations.",
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'text-green-500';
      case 'intermediate':
        return 'text-yellow-500';
      case 'advanced':
        return 'text-red-500';
      default:
        return 'text-primary';
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="fixed top-4 right-4 z-50 flex items-center gap-4">
          <Select onValueChange={handleSort} defaultValue="similarity">
            <SelectTrigger className="w-[180px] bg-background/50 backdrop-blur-sm border-primary/20">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="similarity">Best Match</SelectItem>
              <SelectItem value="difficulty">Difficulty</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-10 h-10 bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-primary/10"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-primary transition-all" />
            ) : (
              <Moon className="h-5 w-5 text-primary transition-all" />
            )}
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Your Personalized Course Recommendations
          </h1>
          <p className="text-muted-foreground text-lg">
            Based on your profile, we've curated these courses just for you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass-card p-6 hover:scale-105 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 
                    className="text-xl font-semibold text-foreground cursor-pointer hover:text-primary transition-colors"
                    onClick={() => setSelectedCourse(rec)}
                  >
                    {rec.title}
                  </h3>
                  <div className="flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-full">
                    <Star className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">
                      {(rec.similarity_score * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{rec.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm">{rec.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span className="text-sm">{rec.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    <span className={`text-sm ${getDifficultyColor(rec.difficulty)}`}>
                      {rec.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span className="text-sm">{rec.prerequisites.length} prerequisites</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground/90">Key Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {rec.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-primary/5 text-primary px-3 py-1 rounded-full text-sm font-medium hover:bg-primary/10 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className={`rounded-full ${rec.feedback === 'like' ? 'bg-green-500/20' : ''}`}
                    onClick={() => handleFeedback(index, 'like')}
                  >
                    <ThumbsUp className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`rounded-full ${rec.feedback === 'dislike' ? 'bg-red-500/20' : ''}`}
                    onClick={() => handleFeedback(index, 'dislike')}
                  >
                    <ThumbsDown className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedCourse && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedCourse(null)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-background rounded-xl p-6 max-w-2xl w-full glass-card"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold gradient-text">{selectedCourse.title}</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedCourse(null)}
                    className="rounded-full hover:bg-primary/10"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-primary">Learning Roadmap</h3>
                  <div className="space-y-4">
                    {selectedCourse.roadmap.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-medium">{index + 1}</span>
                        </div>
                        <div className="flex-grow relative pl-4 pb-4">
                          {index < selectedCourse.roadmap.length - 1 && (
                            <div className="absolute left-0 top-8 bottom-0 w-0.5 bg-primary/20" />
                          )}
                          <p className="text-foreground">{step}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Button
            onClick={() => navigate("/")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground button-hover-animation"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Get More Recommendations
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Recommendations;
