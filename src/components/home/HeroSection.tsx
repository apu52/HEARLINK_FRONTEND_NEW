
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import img1 from 'images/istockphoto-1280356530-612x612.jpg'

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden bg-gradient-to-br from-hearlink-50 to-blue-50">
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-hearlink-100 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-hearlink-200 rounded-full filter blur-3xl opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-block bg-hearlink-100 text-hearlink-700 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
              Empowering Education for All
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-hearlink-900 leading-tight">
              Breaking Barriers in
              <span className="text-hearlink-600 block md:inline md:ml-3">
                Education
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 animate-fade-in">
              HearLink connects educators with hearing-impaired students through AI-powered tools for seamless communication and learning.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-hearlink-600 hover:bg-hearlink-700 text-white rounded-lg text-lg px-8 py-6"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/#features">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white border-hearlink-200 text-hearlink-800 hover:bg-hearlink-50 rounded-lg text-lg px-8 py-6"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-hearlink-700">10k+</div>
                <div className="text-sm text-muted-foreground">Active Students</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-hearlink-700">500+</div>
                <div className="text-sm text-muted-foreground">Educators</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-hearlink-700">98%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 rounded-xl overflow-hidden shadow-xl animate-fade-in">
              <img
                src={img1}
                alt="Students learning with HearLink"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg z-20 animate-fade-in">
              <div className="flex items-center">
                <div className="bg-green-500 h-3 w-3 rounded-full mr-2"></div>
                <span className="font-medium">Live Translation</span>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg z-20 animate-fade-in">
              <div className="flex items-center">
                <div className="bg-hearlink-500 h-3 w-3 rounded-full mr-2"></div>
                <span className="font-medium">AI Assistants</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
