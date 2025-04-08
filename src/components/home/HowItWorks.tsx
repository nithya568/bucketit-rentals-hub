
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  {
    id: 1,
    title: "Browse & Select",
    description: "Explore our wide range of available products and choose what you need.",
    icon: "🔍",
  },
  {
    id: 2,
    title: "Choose Rental Period",
    description: "Select your preferred rental duration - daily, weekly, or monthly.",
    icon: "📅",
  },
  {
    id: 3,
    title: "Delivery & Pickup",
    description: "We'll deliver the items to your doorstep and pick them up when you're done.",
    icon: "🚚",
  },
  {
    id: 4,
    title: "Return & Review",
    description: "Return the items and share your experience with our community.",
    icon: "⭐",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How BucketIt Works</h2>
          <p className="text-muted-foreground">
            Renting with BucketIt is simple, affordable, and convenient. Follow these steps to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center text-3xl bg-primary/10 rounded-full mb-4">
                {step.icon}
              </div>
              <div className="flex items-center mb-2">
                <div className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium mr-2">
                  {step.id}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
              </div>
              <p className="text-muted-foreground">{step.description}</p>
              
              {step.id < steps.length && (
                <div className="hidden lg:flex justify-center mt-6">
                  <ArrowRight className="text-muted-foreground h-6 w-6" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link to="/how-it-works">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
