
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { GraduationCap, Brain, Sparkles, ChevronDown, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export const Hero = () => {
  const { theme, setTheme } = useTheme();

  return (
    <section className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-dark dark:opacity-90 light:opacity-0 transition-opacity duration-500"></div>
      
      <motion.button
        className="absolute top-4 right-4 z-20 p-3 rounded-full glass-card hover-scale"
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
          className="flex items-center gap-6 mb-8"
        >
          <GraduationCap className="w-12 h-12 text-primary floating-animation" />
          <Brain className="w-12 h-12 text-secondary floating-animation delay-100" />
          <Sparkles className="w-12 h-12 text-accent floating-animation delay-200" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold gradient-text mb-8 tracking-tight"
        >
          AI-Powered Course
          <br />
          Recommendations
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl md:text-2xl text-foreground/90 mb-12 max-w-2xl leading-relaxed glass-card p-8 rounded-2xl"
        >
          Get personalized course suggestions based on your qualifications and goals, powered by advanced NLP technology.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button 
            size="lg"
            className="bg-gradient-to-r from-primary via-secondary to-accent text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 button-hover-animation"
            onClick={() => document.getElementById('input-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started
            <ChevronDown className="w-5 h-5 ml-2 animate-bounce" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
