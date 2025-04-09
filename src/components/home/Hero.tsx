
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="relative bg-background px-6 lg:px-8 py-24 sm:py-32 overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-accent opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl animate-slide-up">
          <span className="text-primary">love it</span>..
          <span className="text-accent">rent it</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground animate-slide-up" style={{ animationDelay: "0.2s" }}>
          Rent high-quality products at affordable prices. Why buy when you can
          BucketIt? Choose from thousands of electronics, furniture, and more.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <form onSubmit={handleSearch} className="w-full max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-muted-foreground" />
              </div>
              <Input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-20 py-6 text-base border-primary/20 focus:border-primary"
                placeholder="What would you like to rent?"
              />
              <Button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 px-4 bg-primary hover:bg-primary/90"
              >
                Search
              </Button>
            </div>
          </form>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: "0.6s" }}>
          <span>Popular:</span>
          <button 
            onClick={() => navigate("/products?category=electronics")}
            className="hover:text-primary transition-colors"
          >
            Electronics
          </button>
          <span>•</span>
          <button 
            onClick={() => navigate("/products?category=furniture")}
            className="hover:text-primary transition-colors"
          >
            Furniture
          </button>
          <span>•</span>
          <button 
            onClick={() => navigate("/products?category=appliances")}
            className="hover:text-primary transition-colors"
          >
            Appliances
          </button>
          <span>•</span>
          <button 
            onClick={() => navigate("/products?category=tools")}
            className="hover:text-primary transition-colors"
          >
            Tools
          </button>
        </div>
      </div>

      {/* Bottom gradient */}
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-accent to-primary opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
};

export default Hero;
