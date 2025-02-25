import React from "react";

const ContactUs = () => {
  return (
    <section className="min-h-screen py-20 px-8 bg-black text-white relative overflow-hidden">
      {/* Background Gradient Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-black to-yellow-500 opacity-30 blur-2xl"></div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 drop-shadow-lg">
          Contact Us
        </h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto mt-6">
          Have questions or need assistance? Our team is here to help. Reach out to us anytime.
        </p>

        {/* Contact Info Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-center">
          {/* Email Card */}
          <div className="relative group p-8 bg-gray-900 bg-opacity-80 backdrop-blur-lg shadow-2xl rounded-xl border border-gray-700 transition-all duration-300 hover:border-yellow-500 hover:scale-105">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-20 rounded-xl transition-all duration-500"></div>
            <h3 className="text-3xl font-bold text-yellow-400 flex items-center justify-center">
              📧 Email
            </h3>
            <p className="text-gray-300 mt-4 text-lg font-medium">
              <a href="mailto:support@astratax.ai" className="hover:underline hover:text-yellow-500 transition duration-300">
                support@astratax.ai
              </a>
            </p>
          </div>

          {/* Office Location Card */}
          <div className="relative group p-8 bg-gray-900 bg-opacity-80 backdrop-blur-lg shadow-2xl rounded-xl border border-gray-700 transition-all duration-300 hover:border-yellow-500 hover:scale-105">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-20 rounded-xl transition-all duration-500"></div>
            <h3 className="text-3xl font-bold text-yellow-400 flex items-center justify-center">
              📍 Office
            </h3>
            <p className="text-gray-300 mt-4 text-lg font-medium">
              IIT Mandi, Himachal Pradesh
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16">
          <p className="text-gray-400 text-lg">
            Have an urgent query?{" "}
            <span className="text-yellow-400 font-bold">We're just a click away!</span>
          </p>
          <a
            href="mailto:support@astratax.ai"
            className="mt-6 inline-block px-8 py-3 text-lg font-semibold text-black bg-yellow-400 hover:bg-yellow-500 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
