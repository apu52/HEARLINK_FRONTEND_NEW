
import React from "react";
import SectionHeading from "@/components/ui/section-heading";
import { MessageSquare, Headphones, LayoutDashboard, BarChart, FileText, Users } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Headphones className="h-8 w-8 text-hearlink-600" />,
      title: "Speech to Text Conversion",
      description: "Real-time transcription of lectures and discussions for hearing-impaired students",
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-hearlink-600" />,
      title: "Emotion Analysis",
      description: "AI-powered detection of student engagement and emotional responses during classes",
    },
    {
      icon: <LayoutDashboard className="h-8 w-8 text-hearlink-600" />,
      title: "Intuitive Dashboards",
      description: "Separate interfaces for teachers and students with customized tools and features",
    },
    {
      icon: <BarChart className="h-8 w-8 text-hearlink-600" />,
      title: "Progress Tracking",
      description: "Comprehensive analytics to monitor student performance and identify areas for improvement",
    },
    {
      icon: <FileText className="h-8 w-8 text-hearlink-600" />,
      title: "Content Generation",
      description: "AI-assisted creation of educational materials tailored to different learning styles",
    },
    {
      icon: <Users className="h-8 w-8 text-hearlink-600" />,
      title: "Collaborative Learning",
      description: "Tools that facilitate interaction between students regardless of hearing ability",
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Powerful Features"
          subtitle="Discover the tools that make HearLink an essential platform for inclusive education"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 group"
            >
              <div className="bg-hearlink-50 p-3 rounded-lg inline-block mb-5 group-hover:bg-hearlink-100 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-hearlink-900">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Main features highlight */}
        <div className="mt-24 bg-white rounded-2xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-hearlink-900">
                One Stop Solution for Accessible Education
              </h3>
              <p className="text-muted-foreground mb-8">
                HearLink combines multiple technologies to create a seamless experience for both 
                educators and students. Our platform is designed to be intuitive, powerful, and 
                focused on breaking down communication barriers in educational settings.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-hearlink-100 p-1.5 rounded-full mr-3 mt-0.5">
                    <svg className="h-4 w-4 text-hearlink-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-hearlink-900">Real-time Transcription</h4>
                    <p className="text-sm text-muted-foreground">
                      Convert spoken words to text instantly during lectures and discussions
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-hearlink-100 p-1.5 rounded-full mr-3 mt-0.5">
                    <svg className="h-4 w-4 text-hearlink-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-hearlink-900">Emotional Intelligence</h4>
                    <p className="text-sm text-muted-foreground">
                      Track student engagement and emotional responses to optimize teaching methods
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-hearlink-100 p-1.5 rounded-full mr-3 mt-0.5">
                    <svg className="h-4 w-4 text-hearlink-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-hearlink-900">AI-Assisted Learning</h4>
                    <p className="text-sm text-muted-foreground">
                      Generate personalized learning materials based on individual student needs
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-hearlink-600 p-8 lg:p-0 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="Student using HearLink on tablet"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
