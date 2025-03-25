import { ArrowRight } from "lucide-react";
import { cn, scrollToElement } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const handleJoinWaitlist = () => {
    scrollToElement("waitlist");
  };
  
  return (
    <section className="hero-gradient text-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left content (text) */}
          <div className="w-full md:w-1/2 md:pr-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Revolutionizing Your Workflow
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Stay ahead of the competition with our innovative platform. Join the waitlist today and be the first to experience the future.
            </p>
            <Button
              onClick={handleJoinWaitlist}
              className="inline-flex items-center px-6 py-6 bg-white text-primary-700 font-semibold rounded-lg shadow-md hover:bg-gray-50 transition-colors duration-200 h-auto"
            >
              Join Waitlist
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
          
          {/* Right content (image) */}
          <div className="w-full md:w-1/2 mt-12 md:mt-0 animate-slide-up">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Business professionals in a modern office" 
              className="rounded-lg shadow-2xl object-cover h-80 w-full md:h-96"
            />
          </div>
        </div>
      </div>
      
      {/* Curved bottom edge */}
      <div className="h-16 bg-gray-50 -mt-8 rounded-t-[50%]"></div>
    </section>
  );
}
