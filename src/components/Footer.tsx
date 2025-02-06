
import { Github, Linkedin, Twitter, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-background py-12 border-t border-primary/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Course Recommender
            </h3>
            <p className="text-foreground/80">
              Powered by advanced NLP technology to help you find the perfect courses.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors transform hover:scale-110">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors transform hover:scale-110">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors transform hover:scale-110">
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary/10 mt-8 pt-8 text-center text-foreground/60">
          <p>&copy; 2024 Course Recommender. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
