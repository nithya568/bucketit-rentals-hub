
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Freelance Photographer",
    quote: "BucketIt has been a game-changer for my photography business. I can rent high-end equipment for specific shoots without the massive investment of buying.",
    avatar: "https://placehold.co/100/2DD4BF/FFFFFF?text=SJ",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "College Student",
    quote: "As a student, I can't afford to buy textbooks every semester. BucketIt helps me save hundreds of dollars by renting what I need just for the term.",
    avatar: "https://placehold.co/100/2DD4BF/FFFFFF?text=MC",
  },
  {
    id: 3,
    name: "Jessica Brown",
    role: "Interior Designer",
    quote: "I use BucketIt to test furniture arrangements for my clients before making final purchases. It's an incredible tool for my design process.",
    avatar: "https://placehold.co/100/2DD4BF/FFFFFF?text=JB",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground">
            Thousands of customers trust BucketIt for their rental needs. Here's what they have to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-none shadow-md bg-background">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 overflow-hidden rounded-full border-4 border-primary/20">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                      </svg>
                    </div>
                  </div>
                  <blockquote className="mb-4 italic text-muted-foreground">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
