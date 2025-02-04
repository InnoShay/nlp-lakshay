import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { FileUp, Send, BookOpen, Target, GraduationCap } from "lucide-react";

export const InputForm = () => {
  return (
    <section id="input-form" className="py-20 px-4 bg-accent">
      <div className="max-w-3xl mx-auto">
        <motion.div
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
              <Input 
                placeholder="Enter your qualifications"
                className="w-full bg-accent/10 border-primary/20 text-white placeholder:text-white/50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-primary/90 mb-2 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Future Goals
              </label>
              <Textarea 
                placeholder="What are your career aspirations?"
                className="w-full bg-accent/10 border-primary/20 text-white placeholder:text-white/50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-primary/90 mb-2 flex items-center gap-2">
                <FileUp className="w-4 h-4" />
                Course List (Optional)
              </label>
              <Input 
                type="file" 
                accept=".txt,.csv"
                className="w-full bg-accent/10 border-primary/20 text-white file:bg-primary file:text-white file:border-0 file:rounded-lg"
              />
            </div>
            
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              size="lg"
            >
              Get Recommendations
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};