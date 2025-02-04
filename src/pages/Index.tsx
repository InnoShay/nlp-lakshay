import { Hero } from "@/components/Hero";
import { InputForm } from "@/components/InputForm";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <InputForm />
      <Footer />
    </div>
  );
};

export default Index;