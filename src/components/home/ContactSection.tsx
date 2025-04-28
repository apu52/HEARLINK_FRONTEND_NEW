
import React from "react";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Get in Touch"
          subtitle="Have questions about HearLink? Our team is here to help you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 order-2 lg:order-1">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hearlink-500 focus:border-hearlink-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hearlink-500 focus:border-hearlink-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hearlink-500 focus:border-hearlink-500"
                  placeholder="How can we help you?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hearlink-500 focus:border-hearlink-500"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <Button className="w-full bg-hearlink-600 hover:bg-hearlink-700">
                Send Message
              </Button>
            </form>
          </div>

          <div className="order-1 lg:order-2">
            <div className="bg-hearlink-600 text-white rounded-xl shadow-lg p-6 md:p-8 h-full flex flex-col">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="mb-8 text-hearlink-100">
                Our team is eager to hear from you. Reach out with any questions about our platform, pricing, or how HearLink can benefit your institution.
              </p>
              
              <div className="space-y-6 flex-grow">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-hearlink-300 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white mb-1">Address</h4>
                    <p className="text-hearlink-100">123 Education St, Learning City, 45678</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-hearlink-300 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white mb-1">Phone</h4>
                    <p className="text-hearlink-100">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-hearlink-300 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white mb-1">Email</h4>
                    <p className="text-hearlink-100">contact@hearlink.edu</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h4 className="font-medium text-white mb-3">Working Hours</h4>
                <p className="text-hearlink-100">Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p className="text-hearlink-100">Saturday: 10:00 AM - 2:00 PM</p>
                <p className="text-hearlink-100">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
