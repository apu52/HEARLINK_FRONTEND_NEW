
import React from "react";
import SectionHeading from "@/components/ui/section-heading";

const testimonials = [
  {
    content:
      "HearLink has transformed how I teach my classes. The real-time transcription ensures all my students can follow along, and the emotional analysis helps me understand when concepts need further explanation.",
    author: "Dr. Emily Chen",
    role: "Professor, Stanford University",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    content:
      "As a student with hearing impairment, HearLink has been life-changing. I no longer miss important parts of lectures, and the content generation feature helps me study more effectively.",
    author: "Michael Rodriguez",
    role: "Computer Science Student",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    content:
      "Implementing HearLink across our institution has significantly improved accessibility for all students. The platform is intuitive, powerful, and has received overwhelmingly positive feedback.",
    author: "Sarah Johnson",
    role: "Director of Educational Technology",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Trusted by Educators and Students"
          subtitle="Discover why leading educational institutions and students choose HearLink"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-hearlink-900">{testimonial.author}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <blockquote>
                <p className="text-muted-foreground italic">{testimonial.content}</p>
              </blockquote>
              <div className="mt-4 flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-500 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Featured testimonial */}
        <div className="mt-16 bg-gradient-to-r from-hearlink-600 to-hearlink-700 rounded-2xl p-8 md:p-12 text-white shadow-xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-8 md:mb-0 md:pr-12">
              <svg
                className="w-12 h-12 text-hearlink-300 mb-6"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                HearLink has revolutionized how our university approaches inclusive education. It's not just a tool; it's a paradigm shift in making education accessible to all students.
              </h3>
              <div>
                <p className="font-semibold text-xl">Prof. David Nakamura</p>
                <p className="text-hearlink-200">Dean of Academic Affairs, MIT</p>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="Prof. David Nakamura"
                className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-hearlink-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
