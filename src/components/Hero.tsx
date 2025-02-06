
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { GraduationCap, Brain, Sparkles, ChevronDown, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export const Hero = () => {
  const { theme, setTheme } = useTheme();

  return (
    <section className="min-h-screen relative bg-hero-pattern bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      
      <motion.button
        className="absolute top-4 right-4 z-20 p-2 rounded-full glass-morphism"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <Sun className="w-6 h-6 text-primary" />
        ) : (
          <Moon className="w-6 h-6 text-primary" />
        )}
      </motion.button>
      
      <div className="relative z-10 flex flex-col justify-center items-center text-center px-4 min-h-screen">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <GraduationCap className="w-10 h-10 text-primary floating-animation" />
          <Brain className="w-10 h-10 text-primary floating-animation delay-100" />
          <Sparkles className="w-10 h-10 text-primary floating-animation delay-200" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold gradient-text mb-6 tracking-tight"
        >
          AI-Powered Course
          <br />
          Recommendations
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl leading-relaxed glass-morphism p-6 rounded-xl"
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
            className="bg-primary hover:bg-primary-dark text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 button-hover-animation"
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
