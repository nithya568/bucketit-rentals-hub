
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

export interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  category: string;
  dailyPrice: number;
  weeklyPrice: number;
  monthlyPrice: number;
  featured?: boolean;
  available?: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const addToWishlist = () => {
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

  const addToCart = () => {
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

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col group">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.featured && (
          <Badge className="absolute top-3 right-3 bg-accent/90 hover:bg-accent animate-fade-in">
            Featured
          </Badge>
        )}
        {product.available === false && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm py-1.5">
              Currently Unavailable
            </Badge>
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            size="icon" 
            variant="secondary" 
            className="rounded-full h-8 w-8 shadow-md hover:bg-primary hover:text-white"
            onClick={addToWishlist}
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="secondary" 
            className="rounded-full h-8 w-8 shadow-md hover:bg-primary hover:text-white"
            onClick={addToCart}
            disabled={product.available === false}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <CardContent className="p-4 flex-grow">
        <div className="mb-2">
          <Link
            to={`/category/${product.category}`}
            className="text-xs font-medium text-muted-foreground hover:text-primary uppercase tracking-wider"
          >
            {product.category}
          </Link>
        </div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          <Link to={`/product/${product.id}`}>
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
        <Button 
          asChild 
          className="w-full transition-transform hover:translate-y-[-2px]" 
          disabled={product.available === false}
        >
          <Link to={`/product/${product.id}`}>
            {product.available === false ? "Not Available" : "View Details"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
