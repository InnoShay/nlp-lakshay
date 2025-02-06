
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

interface Recommendation {
  title: string;
  similarity_score: number;
  description: string;
  skills: string;
}

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRecs = localStorage.getItem("recommendations");
    if (!storedRecs) {
      navigate("/");
      return;
    }
    setRecommendations(JSON.parse(storedRecs));
  }, [navigate]);

  return (
    <div className="min-h-screen bg-accent py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-primary mb-4">
            Recommended Courses
          </h1>
          <p className="text-white/80">
            Based on your profile, here are the most suitable courses for you
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
              <Card className="p-6 bg-secondary/95 backdrop-blur-lg border border-primary/20 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-primary">
                    {rec.title}
                  </h3>
                  <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">
                      {(rec.similarity_score * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
                <p className="text-white/80 mb-4">{rec.description}</p>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-primary/90">Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {rec.skills.split(",").map((skill, i) => (
                      <span
                        key={i}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
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
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Get More Recommendations
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Recommendations;
