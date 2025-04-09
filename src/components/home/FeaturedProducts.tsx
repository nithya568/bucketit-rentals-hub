
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

// Sample featured products data with better images
const featuredProducts = [
  {
    id: 1,
    name: "MacBook Pro 16\" M1 Pro",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80",
    description: "Latest model with 16GB RAM and 512GB SSD",
    category: "electronics",
    dailyPrice: 25,
    weeklyPrice: 149,
    monthlyPrice: 499,
  },
  {
    id: 2,
    name: "Sony A7 III Camera",
    image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    description: "Full-frame mirrorless camera with 24.2MP",
    category: "electronics",
    dailyPrice: 20,
    weeklyPrice: 120,
    monthlyPrice: 399,
  },
  {
    id: 3,
    name: "Modern Lounge Chair",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1916&q=80",
    description: "Comfortable stylish chair for your living room",
    category: "furniture",
    dailyPrice: 8,
    weeklyPrice: 45,
    monthlyPrice: 150,
  },
  {
    id: 4,
    name: "Power Drill Set",
    image: "https://images.unsplash.com/photo-1563754357749-4a981a6ef2cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    description: "Professional 18V cordless drill with accessories",
    category: "tools",
    dailyPrice: 7,
    weeklyPrice: 39,
    monthlyPrice: 129,
  },
];

const FeaturedProducts = () => {
  const addToCart = (product: any) => {
    // Get existing cart
    const existingCart = JSON.parse(localStorage.getItem("bucketit_cart") || "[]");
    
    // Check if item already in cart
    const itemInCart = existingCart.find((item: any) => item.id === product.id);
    
    if (itemInCart) {
      toast.info(`${product.name} is already in your cart`);
      return;
    }
    
    // Add item to cart
    const newItem = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.dailyPrice,
      duration: "daily",
      quantity: 1
    };
    
    const updatedCart = [...existingCart, newItem];
    localStorage.setItem("bucketit_cart", JSON.stringify(updatedCart));
    
    // Trigger storage update event
    window.dispatchEvent(new Event("bucketit_storage_update"));
    
    toast.success(`${product.name} added to cart`);
  };

  const addToWishlist = (product: any) => {
    // Get existing wishlist
    const existingWishlist = JSON.parse(localStorage.getItem("bucketit_wishlist") || "[]");
    
    // Check if item already in wishlist
    const itemInWishlist = existingWishlist.find((item: any) => item.id === product.id);
    
    if (itemInWishlist) {
      toast.info(`${product.name} is already in your wishlist`);
      return;
    }
    
    // Add item to wishlist with current timestamp
    const wishlistItem = {
      ...product,
      addedAt: new Date().toISOString()
    };
    
    const updatedWishlist = [...existingWishlist, wishlistItem];
    localStorage.setItem("bucketit_wishlist", JSON.stringify(updatedWishlist));
    
    // Trigger storage update event
    window.dispatchEvent(new Event("bucketit_storage_update"));
    
    toast.success(`${product.name} added to wishlist`);
  };

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
                <div className="absolute top-3 left-3 flex gap-2">
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="rounded-full h-8 w-8 opacity-80 hover:opacity-100"
                    onClick={() => addToWishlist(product)}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="rounded-full h-8 w-8 opacity-80 hover:opacity-100"
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
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
