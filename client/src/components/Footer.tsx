import { scrollToElement } from "@/lib/utils";
import { Facebook, Twitter, Github, Instagram } from "lucide-react";

export default function Footer() {
  const handleNavClick = (sectionId: string) => {
    scrollToElement(sectionId);
  };
  
  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features", action: () => handleNavClick("features") },
        { label: "Pricing", href: "#" },
        { label: "Integrations", href: "#" },
        { label: "Roadmap", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#about", action: () => handleNavClick("about") },
        { label: "Careers", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Press", href: "#" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "Help Center", href: "#" },
        { label: "Community", href: "#" },
        { label: "Partners", href: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Security", href: "#" },
        { label: "Compliance", href: "#" }
      ]
    }
  ];
  
  const socialIcons = [
    { icon: <Facebook className="w-6 h-6" />, href: "#" },
    { icon: <Twitter className="w-6 h-6" />, href: "#" },
    { icon: <Github className="w-6 h-6" />, href: "#" },
    { icon: <Instagram className="w-6 h-6" />, href: "#" }
  ];
  
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerLinks.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.action ? (
                      <button 
                        onClick={link.action} 
                        className="hover:text-white transition-colors"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a href={link.href} className="hover:text-white transition-colors">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <svg className="w-8 h-8 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-2 text-xl font-bold text-white">Future Forward</span>
          </div>
          
          <div className="flex space-x-4">
            {socialIcons.map((social, index) => (
              <a 
                key={index} 
                href={social.href} 
                className="text-gray-400 hover:text-white transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-500 mt-8">
          © {new Date().getFullYear()} Future Forward Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
