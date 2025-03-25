import {
  Zap,
  Lock,
  Users,
  ClipboardList,
  LayoutGrid,
  Bell
} from "lucide-react";

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export default function FeaturesSection() {
  const features: Feature[] = [
    {
      icon: <Zap className="w-8 h-8 text-primary-600" />,
      title: "Lightning Fast",
      description: "Our platform is optimized for speed, ensuring that your workflows are never bottlenecked."
    },
    {
      icon: <Lock className="w-8 h-8 text-primary-600" />,
      title: "Enterprise Security",
      description: "Your data is protected with bank-level security protocols and end-to-end encryption."
    },
    {
      icon: <Users className="w-8 h-8 text-primary-600" />,
      title: "Team Collaboration",
      description: "Seamless collaboration tools that bring your team together, no matter where they are."
    },
    {
      icon: <ClipboardList className="w-8 h-8 text-primary-600" />,
      title: "Advanced Analytics",
      description: "Gain insights with our powerful analytics dashboard that helps you make data-driven decisions."
    },
    {
      icon: <LayoutGrid className="w-8 h-8 text-primary-600" />,
      title: "Intuitive Interface",
      description: "A beautiful, clean interface designed for maximum productivity and minimal learning curve."
    },
    {
      icon: <Bell className="w-8 h-8 text-primary-600" />,
      title: "Smart Notifications",
      description: "Stay in the loop with intelligent notifications that prioritize what matters most to you."
    }
  ];
  
  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform combines cutting-edge technology with intuitive design to help you achieve more.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg"
            >
              <div className="rounded-full bg-primary-100 w-14 h-14 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
