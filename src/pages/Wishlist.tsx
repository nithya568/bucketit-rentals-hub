
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/components/products/ProductCard";
import { Heart, ShoppingCart, Trash } from "lucide-react";
import { toast } from "sonner";

interface WishlistItem extends Product {
  addedAt: string;
}

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  // Load wishlist items from localStorage on component mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("bucketit_wishlist");
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  // Update localStorage whenever wishlist items change
  useEffect(() => {
    localStorage.setItem("bucketit_wishlist", JSON.stringify(wishlistItems));
    // Dispatch custom event to notify other components of the change
    window.dispatchEvent(new Event("bucketit_storage_update"));
  }, [wishlistItems]);

  const handleRemoveItem = (id: number) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
    toast.success("Item removed from wishlist");
  };

  const handleAddToCart = (item: WishlistItem) => {
    // Get existing cart
    const existingCart = JSON.parse(localStorage.getItem("bucketit_cart") || "[]");
    
    // Check if item already in cart
    const itemInCart = existingCart.find((cartItem: any) => cartItem.id === item.id);
    
    if (itemInCart) {
      toast.info(`${item.name} is already in your cart`);
      return;
    }
    
    // Add item to cart
    const newItem = {
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.dailyPrice,
      duration: "daily",
      quantity: 1
    };
    
    const updatedCart = [...existingCart, newItem];
    localStorage.setItem("bucketit_cart", JSON.stringify(updatedCart));
    
    // Trigger storage update event
    window.dispatchEvent(new Event("bucketit_storage_update"));
    
    toast.success(`${item.name} added to cart`);
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Wishlist</h1>
          <div className="text-muted-foreground">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
          </div>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="overflow-hidden group">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Daily Price</span>
                      <span className="font-semibold">${item.dailyPrice}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Weekly Price</span>
                      <span className="font-semibold">${item.weeklyPrice}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Monthly Price</span>
                      <span className="font-semibold">${item.monthlyPrice}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Heart className="h-4 w-4 mr-2 fill-current" /> Remove
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Heart className="h-12 w-12 text-muted-foreground" />
              <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>
              <p className="text-muted-foreground">
                Save items you're interested in renting for later
              </p>
              <Button asChild className="mt-4">
                <a href="/products">Browse Products</a>
              </Button>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Wishlist;
