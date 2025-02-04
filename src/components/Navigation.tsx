import { Instagram, Linkedin, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-sm py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Quick Links */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-6"
        >
          {["HOME", "SPONSORS", "EVENTS", "WORKSHOPS", "OUR TEAM"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-primary hover:text-primary/80 transition-colors font-bold tracking-wider text-sm"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              {link}
            </a>
          ))}
        </motion.div>

        {/* Social Icons */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-4"
        >
          <a href="#" className="text-primary hover:text-primary/80 transition-colors">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="#" className="text-primary hover:text-primary/80 transition-colors">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="#" className="text-primary hover:text-primary/80 transition-colors">
            <MessageSquare className="w-6 h-6" />
          </a>
        </motion.div>
      </div>
    </nav>
  );
};