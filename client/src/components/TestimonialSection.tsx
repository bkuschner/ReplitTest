type Testimonial = {
  quote: string;
  name: string;
  title: string;
  image: string;
};

export default function TestimonialSection() {
  const testimonials: Testimonial[] = [
    {
      quote: "Future Forward has completely transformed how our team collaborates. The platform is intuitive, fast, and has the perfect balance of powerful features without overwhelming complexity.",
      name: "Michael Thompson",
      title: "CTO, TechFlow Inc.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    {
      quote: "As a product manager, I've tried dozens of tools, but Future Forward stands out. The analytics are insightful, and the interface is a joy to use. It's become an essential part of our workflow.",
      name: "Sarah Johnson",
      title: "Product Manager, Innovate Solutions",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    {
      quote: "The ROI we've seen since implementing Future Forward has been incredible. Our team productivity is up 32%, and the platform has paid for itself within the first month.",
      name: "David Chen",
      title: "COO, GrowthPath Ventures",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    }
  ];
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Beta Users Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't take our word for it – hear from some of our early adopters.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 relative">
              <div className="absolute -top-4 left-6 bg-primary-500 text-white rounded-full p-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                </svg>
              </div>
              <div className="pt-6">
                <p className="text-gray-700 mb-6">{testimonial.quote}</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image}
                    alt={`Profile picture of ${testimonial.name}`}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.title}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
