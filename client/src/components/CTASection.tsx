import { scrollToElement } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  const handleJoinWaitlist = () => {
    scrollToElement("waitlist");
  };
  
  return (
    <section className="bg-primary-700 text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to transform your workflow?</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
          Join thousands of forward-thinking businesses that are already on our waitlist.
        </p>
        <Button
          onClick={handleJoinWaitlist}
          className="inline-flex items-center px-6 py-3 bg-white text-primary-700 font-semibold rounded-lg shadow-md hover:bg-gray-50 transition-colors duration-200 h-auto"
        >
          Join Waitlist
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </section>
  );
}
