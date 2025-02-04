import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { GraduationCap, Brain, Sparkles, ChevronDown } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen relative bg-hero-pattern bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      
      <div className="relative z-10 flex flex-col justify-center items-center text-center px-4 min-h-screen">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <GraduationCap className="w-10 h-10 text-primary" />
          <Brain className="w-10 h-10 text-primary" />
          <Sparkles className="w-10 h-10 text-primary" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-primary mb-6 tracking-tight"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
        >
          AI-Powered Course
          <br />
          Recommendations
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl leading-relaxed"
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
        >
          Get personalized course suggestions based on your qualifications and goals, powered by advanced NLP technology.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-6"
        >
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            onClick={() => document.getElementById('input-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};