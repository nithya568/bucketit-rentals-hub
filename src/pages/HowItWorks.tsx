
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Browse & Select",
    description:
      "Start by exploring our extensive collection of rental items. Filter by category, search for specific items, or browse through our featured selections. Click on any item to view detailed information, including specifications, availability, and pricing options.",
    image: "https://placehold.co/600x400/2DD4BF/FFFFFF?text=Browse+and+Select",
  },
  {
    id: 2,
    title: "Choose Rental Period",
    description:
      "Select your preferred rental duration - daily, weekly, or monthly. Each option offers different pricing, with longer rentals providing better value. Review the terms and add the item to your cart with your chosen rental period.",
    image: "https://placehold.co/600x400/2DD4BF/FFFFFF?text=Choose+Rental+Period",
  },
  {
    id: 3,
    title: "Complete Checkout",
    description:
      "Proceed to checkout, where you'll provide delivery details and payment information. For first-time renters, you'll need to create an account. Our secure platform ensures your information is protected throughout the process.",
    image: "https://placehold.co/600x400/2DD4BF/FFFFFF?text=Checkout",
  },
  {
    id: 4,
    title: "Delivery & Pickup",
    description:
      "We'll deliver your rental items directly to your doorstep at the scheduled time. Our delivery personnel will ensure everything is in perfect working condition. When your rental period ends, we'll arrange pickup at your convenience.",
    image: "https://placehold.co/600x400/2DD4BF/FFFFFF?text=Delivery+and+Pickup",
  },
  {
    id: 5,
    title: "Return & Review",
    description:
      "After enjoying your rental, simply prepare the items for pickup. Once returned, you'll have the opportunity to share your experience by leaving a review. Your feedback helps us maintain quality service and assists other customers.",
    image: "https://placehold.co/600x400/2DD4BF/FFFFFF?text=Return+and+Review",
  },
];

const benefits = [
  {
    title: "Cost-Effective",
    description: "Save money by renting instead of buying items you'll only use occasionally.",
  },
  {
    title: "Environmentally Friendly",
    description: "Reduce waste and environmental impact by participating in the sharing economy.",
  },
  {
    title: "Try Before You Buy",
    description: "Test products before making a purchase decision to ensure they meet your needs.",
  },
  {
    title: "No Maintenance Worries",
    description: "Avoid repair and maintenance costs - we ensure everything works perfectly.",
  },
  {
    title: "Access Premium Products",
    description: "Use high-end equipment and products that would be expensive to purchase.",
  },
  {
    title: "Save Storage Space",
    description: "Don't clutter your home with items you only need occasionally.",
  },
];

const faqs = [
  {
    question: "Do I need to create an account to rent?",
    answer: "Yes, an account is required to complete the rental process. This helps us verify your identity and provides you with access to your rental history and current rentals.",
  },
  {
    question: "Is a security deposit required?",
    answer: "Some high-value items require a security deposit, which is fully refundable upon the item's return in good condition. The deposit amount, if applicable, is clearly indicated on the product page.",
  },
  {
    question: "What happens if I damage a rental item?",
    answer: "If an item is damaged during your rental period, we assess the damage and may charge a repair fee or partial replacement cost, depending on the extent of the damage. We encourage customers to report any issues immediately.",
  },
  {
    question: "Can I extend my rental period?",
    answer: "Yes! You can extend your rental through your account dashboard. We recommend requesting extensions at least 24 hours before your scheduled return date to ensure availability.",
  },
  {
    question: "How does delivery and pickup work?",
    answer: "We offer scheduled delivery and pickup services within our service areas. During checkout, you'll select your preferred delivery date and time window. For pickup, you'll receive a notification to schedule a convenient time as your rental end date approaches.",
  },
];

const HowItWorks = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How BucketIt Works
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Renting with BucketIt is simple, affordable, and convenient.
            Follow our easy process to get the items you need without the
            commitment of ownership.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="text-primary font-medium"
          >
            <Link to="/products">Start Browsing Now</Link>
          </Button>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Rental Process
          </h2>

          <div className="space-y-20">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-8 lg:gap-16`}
              >
                <div className="w-full lg:w-1/2">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-3">
                      {step.id}
                    </div>
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-lg mb-6">
                    {step.description}
                  </p>
                  {step.id < steps.length && (
                    <div className="hidden lg:block text-muted-foreground">
                      <ArrowRight
                        className={`h-8 w-8 ${
                          index % 2 === 0 ? "ml-auto" : "mr-auto"
                        } transform ${
                          index % 2 === 0
                            ? "rotate-0"
                            : "rotate-180 lg:rotate-0"
                        }`}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">
            Benefits of Renting with BucketIt
          </h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
            Discover why thousands of customers choose BucketIt for their rental needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-background rounded-lg p-6 shadow-sm border"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
            Have questions about our rental process? Find answers to common
            questions below.
          </p>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-background rounded-lg p-6 shadow-sm border"
              >
                <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Renting?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join thousands of satisfied customers who are already saving money
            and reducing waste by renting instead of buying.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-primary font-medium"
            >
              <Link to="/products">Browse Products</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10"
            >
              <Link to="/signup">Create an Account</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HowItWorks;
