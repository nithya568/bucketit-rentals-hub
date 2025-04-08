
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Sample featured products data
const featuredProducts = [
  {
    id: 1,
    name: "MacBook Pro 16\" M1 Pro",
    image: "https://placehold.co/600x400/2DD4BF/FFFFFF?text=MacBook+Pro",
    description: "Latest model with 16GB RAM and 512GB SSD",
    category: "electronics",
    dailyPrice: 25,
    weeklyPrice: 149,
    monthlyPrice: 499,
  },
  {
    id: 2,
    name: "Sony A7 III Camera",
    image: "https://placehold.co/600x400/2DD4BF/FFFFFF?text=Sony+A7+III",
    description: "Full-frame mirrorless camera with 24.2MP",
    category: "electronics",
    dailyPrice: 20,
    weeklyPrice: 120,
    monthlyPrice: 399,
  },
  {
    id: 3,
    name: "Modern Lounge Chair",
    image: "https://placehold.co/600x400/2DD4BF/FFFFFF?text=Lounge+Chair",
    description: "Comfortable stylish chair for your living room",
    category: "furniture",
    dailyPrice: 8,
    weeklyPrice: 45,
    monthlyPrice: 150,
  },
  {
    id: 4,
    name: "Power Drill Set",
    image: "https://placehold.co/600x400/2DD4BF/FFFFFF?text=Power+Drill+Set",
    description: "Professional 18V cordless drill with accessories",
    category: "tools",
    dailyPrice: 7,
    weeklyPrice: 39,
    monthlyPrice: 129,
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Featured Items</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Check out our most popular rental items. Quality products at
            affordable rental prices.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
                <Badge className="absolute top-3 right-3 bg-accent/90 hover:bg-accent">
                  Featured
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="mb-2">
                  <Link
                    to={`/category/${product.category}`}
                    className="text-xs font-medium text-muted-foreground hover:text-primary uppercase tracking-wider"
                  >
                    {product.category}
                  </Link>
                </div>
                <h3 className="text-lg font-semibold mb-2 line-clamp-1">
                  <Link to={`/product/${product.id}`} className="hover:text-primary">
                    {product.name}
                  </Link>
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center text-sm font-medium">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Daily</span>
                    <span className="text-foreground">${product.dailyPrice}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Weekly</span>
                    <span className="text-foreground">${product.weeklyPrice}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Monthly</span>
                    <span className="text-foreground">${product.monthlyPrice}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button asChild className="w-full">
                  <Link to={`/product/${product.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" asChild size="lg">
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
