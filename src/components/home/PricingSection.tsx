
import React, { useState } from "react";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const PricingSection = () => {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: "Basic",
      description: "Perfect for small classes and individual educators",
      monthlyPrice: 29,
      annualPrice: 290,
      features: [
        "Speech-to-text for up to 30 students",
        "Basic emotion analysis",
        "Student dashboard",
        "Teacher dashboard",
        "Email support",
      ],
      highlighted: false,
      buttonText: "Get Started",
    },
    {
      name: "Professional",
      description: "Ideal for schools and educational institutions",
      monthlyPrice: 79,
      annualPrice: 790,
      features: [
        "Speech-to-text for up to 100 students",
        "Advanced emotion analysis",
        "Student & Teacher dashboards",
        "Content generation tools",
        "Integration with LMS platforms",
        "Priority support",
      ],
      highlighted: true,
      buttonText: "Try it Free",
    },
    {
      name: "Enterprise",
      description: "For universities and large organizations",
      monthlyPrice: 199,
      annualPrice: 1990,
      features: [
        "Unlimited students",
        "Premium emotion analysis",
        "All dashboard features",
        "Advanced content generation",
        "Custom integrations",
        "API access",
        "24/7 dedicated support",
      ],
      highlighted: false,
      buttonText: "Contact Sales",
    },
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Simple, Transparent Pricing"
          subtitle="Choose the plan that best suits your educational needs"
        />

        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1 rounded-full inline-flex items-center">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                !annual
                  ? "bg-white text-hearlink-900 shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                annual
                  ? "bg-white text-hearlink-900 shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              Annual <span className="text-xs text-hearlink-600 ml-1">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                plan.highlighted
                  ? "border-2 border-hearlink-500 shadow-lg shadow-hearlink-100"
                  : "border border-gray-200 shadow-sm"
              }`}
            >
              {plan.highlighted && (
                <div className="bg-hearlink-500 py-2 text-white text-center text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold mb-2 text-hearlink-900">{plan.name}</h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-hearlink-900">
                    ${annual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground">
                    /{annual ? "year" : "month"}
                  </span>
                </div>
                <Link to="/signup">
                  <Button
                    className={`w-full mb-8 ${
                      plan.highlighted
                        ? "bg-hearlink-600 hover:bg-hearlink-700"
                        : "bg-white border border-hearlink-600 text-hearlink-600 hover:bg-hearlink-50"
                    }`}
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    {plan.buttonText}
                  </Button>
                </Link>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-hearlink-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-hearlink-50 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-hearlink-900">Need a custom solution?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            We understand that every educational institution has unique needs. Contact our team to discuss a tailored solution for your specific requirements.
          </p>
          <Link to="/contact">
            <Button className="bg-hearlink-600 hover:bg-hearlink-700">
              Contact Our Team
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
