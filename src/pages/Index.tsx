
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/Hero";
import { InputForm } from "@/components/InputForm";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import { Brain, Sparkles } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          navigate("/auth");
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold gradient-text">Synapse Learn</h1>
              <p className="text-xs text-foreground/60 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Vision-X AI
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="text-foreground/60 hover:text-primary"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate("/auth");
            }}
          >
            Sign Out
          </Button>
        </div>
      </div>
      <div className="pt-20">
        <Hero />
        <InputForm />
        <Footer />
        <Chatbot />
      </div>
    </div>
  );
};

export default Index;
