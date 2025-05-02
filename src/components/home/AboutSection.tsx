
import React from "react";
import SectionHeading from "@/components/ui/section-heading";
import { Check } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <SectionHeading 
              title="About HearLink" 
              subtitle="Connecting educators and hearing-impaired students through innovative technology"
              centered={false}
            />

            <p className="text-muted-foreground mb-6">
              HearLink was founded with a clear mission: to make education accessible for everyone, 
              especially those with hearing impairments. We believe that technology can bridge communication
              gaps and create inclusive learning environments where all students can thrive.
            </p>
            
            <p className="text-muted-foreground mb-8">
              Our platform combines AI-powered speech-to-text, real-time transcription, and 
              emotional analysis to ensure that no student is left behind due to hearing challenges.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="bg-hearlink-100 p-1 rounded-full mr-3">
                  <Check className="h-4 w-4 text-hearlink-700" />
                </div>
                <div>
                  <h4 className="font-medium mb-1 text-hearlink-900">Accessible Learning</h4>
                  <p className="text-sm text-muted-foreground">For students of all hearing abilities</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-hearlink-100 p-1 rounded-full mr-3">
                  <Check className="h-4 w-4 text-hearlink-700" />
                </div>
                <div>
                  <h4 className="font-medium mb-1 text-hearlink-900">Real-time Support</h4>
                  <p className="text-sm text-muted-foreground">Interactive tools for immediate assistance</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-hearlink-100 p-1 rounded-full mr-3">
                  <Check className="h-4 w-4 text-hearlink-700" />
                </div>
                <div>
                  <h4 className="font-medium mb-1 text-hearlink-900">Emotional Analysis</h4>
                  <p className="text-sm text-muted-foreground">Understand student engagement levels</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-hearlink-100 p-1 rounded-full mr-3">
                  <Check className="h-4 w-4 text-hearlink-700" />
                </div>
                <div>
                  <h4 className="font-medium mb-1 text-hearlink-900">Content Generation</h4>
                  <p className="text-sm text-muted-foreground">AI-powered educational materials</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="relative z-10">
              <img 
                src="images\SAP-110.jpeg" 
                alt="Team collaboration" 
                className="rounded-lg shadow-xl object-cover h-full"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="hidden lg:block absolute -top-6 -left-6 w-32 h-32 bg-hearlink-100 rounded-lg -z-10"></div>
            <div className="hidden lg:block absolute -bottom-6 -right-6 w-32 h-32 bg-hearlink-200 rounded-lg -z-10"></div>
          </div>
        </div>
        
        {/* Registration stats banner */}
        <div className="mt-24 bg-hearlink-600 bg-gradient-to-r from-hearlink-700 to-hearlink-600 rounded-2xl p-10 text-white shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl lg:text-5xl font-bold mb-2">5,000+</h3>
              <p className="text-hearlink-100">Registered Students</p>
            </div>
            <div>
              <h3 className="text-4xl lg:text-5xl font-bold mb-2">300+</h3>
              <p className="text-hearlink-100">Educational Institutions</p>
            </div>
            <div>
              <h3 className="text-4xl lg:text-5xl font-bold mb-2">25+</h3>
              <p className="text-hearlink-100">Countries Reached</p>
            </div>
            <div>
              <h3 className="text-4xl lg:text-5xl font-bold mb-2">98%</h3>
              <p className="text-hearlink-100">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
