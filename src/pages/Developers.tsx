
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const developers = [
  {
    id: 1,
    name: "Ananya Sharma",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
    bio: "Full-stack developer with 5 years of experience in React and Node.js. Passionate about creating intuitive user experiences and scalable applications.",
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "ananya@example.com"
    }
  },
  {
    id: 2,
    name: "Raj Patel",
    role: "UI/UX Designer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
    bio: "Designer with an eye for creating beautiful and functional interfaces. Specializes in user research, wireframing, and prototyping with a focus on accessibility.",
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "raj@example.com"
    }
  },
  {
    id: 3,
    name: "Priya Mehta",
    role: "Backend Developer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1961&q=80",
    bio: "Backend specialist with expertise in database optimization, API development, and serverless architecture. Loves solving complex problems and mentoring junior developers.",
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "priya@example.com"
    }
  }
];

const Developers = () => {
  return (
    <Layout>
      <div className="py-16 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4 text-gradient-primary">Meet Our Team</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The talented individuals behind BucketIt who make renting simple, accessible, and enjoyable for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {developers.map((developer, index) => (
              <Card 
                key={developer.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 animate-scale-in" 
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={developer.image} 
                    alt={developer.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-1">{developer.name}</h2>
                  <p className="text-accent font-medium mb-4">{developer.role}</p>
                  <p className="text-muted-foreground mb-6">{developer.bio}</p>
                  
                  <div className="flex space-x-4">
                    <a href={developer.social.github} className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub">
                      <Github size={20} />
                    </a>
                    <a href={developer.social.linkedin} className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                      <Linkedin size={20} />
                    </a>
                    <a href={developer.social.twitter} className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                      <Twitter size={20} />
                    </a>
                    <a href={`mailto:${developer.social.email}`} className="text-muted-foreground hover:text-primary transition-colors" aria-label="Email">
                      <Mail size={20} />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-24 max-w-4xl mx-auto bg-card rounded-2xl p-8 shadow-md border animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-center">Our Development Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 hover-scale">
                <div className="text-primary text-4xl font-bold mb-2">01</div>
                <h3 className="text-lg font-semibold mb-2">Research & Design</h3>
                <p className="text-muted-foreground text-sm">Understanding user needs and creating intuitive interfaces</p>
              </div>
              <div className="text-center p-4 hover-scale">
                <div className="text-primary text-4xl font-bold mb-2">02</div>
                <h3 className="text-lg font-semibold mb-2">Development</h3>
                <p className="text-muted-foreground text-sm">Building robust and scalable solutions with modern technologies</p>
              </div>
              <div className="text-center p-4 hover-scale">
                <div className="text-primary text-4xl font-bold mb-2">03</div>
                <h3 className="text-lg font-semibold mb-2">Testing & Iteration</h3>
                <p className="text-muted-foreground text-sm">Refining the product through testing and user feedback</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Developers;
