import { useState, useEffect } from "react";
import { cn, scrollToElement } from "@/lib/utils";
import { Zap } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    scrollToElement(sectionId);
    setMobileMenuOpen(false);
  };
  
  return (
    <header className={cn(
      "w-full py-4 bg-white fixed top-0 z-50 transition-shadow duration-300",
      scrolled ? "shadow-md" : "shadow-sm"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Zap className="w-8 h-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold">Future Forward</span>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => handleNavClick("features")}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => handleNavClick("about")}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => handleNavClick("waitlist")}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Join Waitlist
            </button>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-md p-2 text-gray-600 hover:text-blue-600 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        
        {/* Mobile Nav */}
        <nav className={cn(
          "md:hidden pt-4 pb-3 space-y-2 transition-all duration-300 overflow-hidden",
          mobileMenuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        )}>
          <button
            onClick={() => handleNavClick("features")}
            className="block w-full text-left py-2 px-3 rounded-md text-gray-600 hover:bg-gray-100 hover:text-primary-600 font-medium transition-colors"
          >
            Features
          </button>
          <button
            onClick={() => handleNavClick("about")}
            className="block w-full text-left py-2 px-3 rounded-md text-gray-600 hover:bg-gray-100 hover:text-primary-600 font-medium transition-colors"
          >
            About
          </button>
          <button
            onClick={() => handleNavClick("waitlist")}
            className="block w-full text-left py-2 px-3 rounded-md text-gray-600 hover:bg-gray-100 hover:text-primary-600 font-medium transition-colors"
          >
            Join Waitlist
          </button>
        </nav>
      </div>
    </header>
  );
}
