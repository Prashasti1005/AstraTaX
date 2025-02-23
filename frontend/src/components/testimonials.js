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
    <section className="py-12 bg-gray-100 text-center">
      <h2 className="text-4xl font-bold">What Our Users Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-12 mt-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="p-6 bg-white rounded-lg shadow-md">
            <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-bold">{testimonial.name}</h3>
            <p className="text-gray-600 mt-2">{testimonial.feedback}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
