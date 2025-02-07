
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { GraduationCap, Brain, Sparkles, ChevronDown, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export const Hero = () => {
  const { theme, setTheme } = useTheme();

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Images with Transitions */}
      <div className="absolute inset-0 transition-opacity duration-700">
        <div 
          className="absolute inset-0 bg-[url('/lovable-uploads/3aada347-1304-4cad-aa56-83c587319e44.png')] bg-cover bg-center opacity-50 dark:opacity-0 transition-opacity duration-700"
          style={{ backgroundBlendMode: 'overlay' }}
        />
        <div 
          className="absolute inset-0 bg-[url('/lovable-uploads/327ffa51-44b3-4545-9c5c-5cb17682ad0e.png')] bg-cover bg-center opacity-0 dark:opacity-30 transition-opacity duration-700"
          style={{ backgroundBlendMode: 'overlay' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 to-background/95 dark:from-background/30 dark:to-background" />
      </div>
      
      <motion.button
        className="absolute top-6 right-6 z-20 p-4 rounded-full glass-card hover:scale-105 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <Sun className="w-6 h-6 text-primary animate-spin-slow" />
        ) : (
          <Moon className="w-6 h-6 text-primary animate-spin-slow" />
        )}
      </motion.button>
      
      <div className="relative z-10 flex flex-col justify-center items-center text-center px-4 min-h-screen">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-8 mb-12"
        >
          <GraduationCap className="w-14 h-14 text-primary floating-animation" />
          <Brain className="w-14 h-14 text-secondary floating-animation delay-100" />
          <Sparkles className="w-14 h-14 text-accent floating-animation delay-200" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-6xl md:text-7xl font-bold gradient-text mb-12 tracking-tight leading-tight"
        >
          AI-Powered Course
          <br />
          Recommendations
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl md:text-2xl text-foreground/90 mb-16 max-w-2xl leading-relaxed glass-card p-8 rounded-2xl shadow-xl"
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
            className="bg-gradient-to-r from-primary via-secondary to-accent text-white px-10 py-7 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 button-hover-animation"
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
