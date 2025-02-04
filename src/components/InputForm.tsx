import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

export const InputForm = () => {
  return (
    <section id="input-form" className="py-20 px-4 bg-accent">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-xl"
        >
          <h2 className="text-3xl font-bold text-secondary mb-6">Your Profile</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Educational Background
              </label>
              <Input 
                placeholder="Enter your qualifications"
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Future Goals
              </label>
              <Textarea 
                placeholder="What are your career aspirations?"
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course List (Optional)
              </label>
              <Input 
                type="file" 
                accept=".txt,.csv"
                className="w-full"
              />
            </div>
            
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-white"
              size="lg"
            >
              Get Recommendations
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};