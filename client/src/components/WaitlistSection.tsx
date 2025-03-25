import WaitlistForm from "./WaitlistForm";

export default function WaitlistSection() {
  return (
    <section id="waitlist" className="py-20 bg-white relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-50 rounded-full opacity-50"></div>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-50 rounded-full opacity-50"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Waitlist</h2>
            <p className="text-xl text-gray-600">
              Be among the first to experience Future Forward when we launch. 
              Early users will receive special benefits and priority support.
            </p>
          </div>
          
          <WaitlistForm />
          
          <div className="flex flex-col md:flex-row items-center justify-center mt-12 gap-4 md:gap-6">
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              <span>Secure Sign-up</span>
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span>No Spam</span>
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Cancel Anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
