
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/components/products/ProductCard";
import { Heart, ShoppingCart, Trash } from "lucide-react";
import { toast } from "sonner";

interface WishlistItem extends Product {
  addedAt: string;
}

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 2,
      name: "Sony A7 III Camera",
      image: "https://placehold.co/600x400/2DD4BF/FFFFFF?text=Sony+A7+III",
      description: "Full-frame mirrorless camera with 24.2MP",
      category: "electronics",
      dailyPrice: 20,
      weeklyPrice: 120,
      monthlyPrice: 399,
      addedAt: "2023-04-15"
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
      addedAt: "2023-04-12"
    }
  ]);

  const handleRemoveItem = (id: number) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
    toast.success("Item removed from wishlist");
  };

  const handleAddToCart = (item: WishlistItem) => {
    // In a real app, this would add to cart state or send to API
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
