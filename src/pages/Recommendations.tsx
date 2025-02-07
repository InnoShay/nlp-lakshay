
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Star, ArrowLeft, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

interface Recommendation {
  title: string;
  similarity_score: number;
  description: string;
  skills: string;
}

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedRecs = localStorage.getItem("recommendations");
    if (!storedRecs) {
      navigate("/");
      return;
    }
    setRecommendations(JSON.parse(storedRecs));
  }, [navigate]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="fixed top-4 right-4 z-50">
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
                  <h3 className="text-xl font-semibold text-foreground">
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
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground/90">Key Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {rec.skills.split(",").map((skill, i) => (
                      <span
                        key={i}
                        className="bg-primary/5 text-primary px-3 py-1 rounded-full text-sm font-medium hover:bg-primary/10 transition-colors"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

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
