import React from "react";

const testimonials = [
  {
    name: "Amit Sharma",
    feedback: "AstraTax saved me hours of tax filing! The AI suggestions were spot-on, and I got my biggest refund ever!",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    name: "Priya Verma",
    feedback: "I was always scared of tax season, but AstraTax made it effortless. The AI found deductions I never knew existed!",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    name: "Rahul Iyer",
    feedback: "Audit risk analysis helped me avoid penalties. The AI-powered insights are a game changer!",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black text-white text-center">
      <h2 className="text-5xl font-extrabold tracking-wide text-yellow-400 drop-shadow-lg">
        What Our Users Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-12 mt-12">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="relative p-6 bg-gray-800/50 backdrop-blur-xl border border-gray-700 shadow-lg rounded-xl max-w-sm mx-auto transform transition hover:scale-105 hover:shadow-xl"
          >
            {/* Profile Image */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full border-4 border-yellow-500 shadow-md"
              />
            </div>

            {/* Content */}
            <div className="mt-12 text-center">
              <h3 className="text-2xl font-semibold text-white">{testimonial.name}</h3>
              <p className="text-gray-300 mt-4 text-lg leading-relaxed">
                “{testimonial.feedback}”
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
