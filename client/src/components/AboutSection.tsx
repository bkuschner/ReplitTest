export default function AboutSection() {
  const stats = [
    { value: "500+", label: "Beta Users" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "24/7", label: "Support" },
    { value: "15+", label: "Integrations" }
  ];
  
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left side (image) */}
          <div className="w-full md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Modern startup office with team members" 
              className="rounded-lg shadow-xl"
            />
          </div>
          
          {/* Right side (text) */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About Future Forward</h2>
            <p className="text-lg text-gray-700 mb-6">
              Founded in 2023, Future Forward is on a mission to transform how businesses operate in the digital age. 
              Our team of industry veterans has combined decades of experience to build a platform that addresses the 
              real challenges companies face today.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              We believe that technology should work for you, not the other way around. That's why we've designed 
              our solution to be powerful yet intuitive, helping you accomplish more with less effort.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
