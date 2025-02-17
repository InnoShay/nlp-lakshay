
import { Hero } from "@/components/Hero";
import { InputForm } from "@/components/InputForm";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <InputForm />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
