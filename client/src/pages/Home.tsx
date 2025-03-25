import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import AboutSection from "@/components/AboutSection";
import TestimonialSection from "@/components/TestimonialSection";
import WaitlistSection from "@/components/WaitlistSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="font-sans text-gray-800 bg-gray-50">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
        <TestimonialSection />
        <WaitlistSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
