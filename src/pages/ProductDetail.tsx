
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Product } from "@/components/products/ProductCard";
import { Heart } from "lucide-react";

// Sample products data (In a real app, this would come from an API)
const sampleProducts: Product[] = [
  {
    id: 1,
    name: "MacBook Pro 16\" M1 Pro",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80",
    description: "Latest model with 16GB RAM and 512GB SSD. This powerful laptop is perfect for professionals and creatives who need high performance on the go. Features the M1 Pro chip, a brilliant Retina XDR display, and all-day battery life.",
    category: "electronics",
    dailyPrice: 25,
    weeklyPrice: 149,
    monthlyPrice: 499,
    featured: true
  },
  {
    id: 2,
    name: "Sony A7 III Camera",
    image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    description: "Full-frame mirrorless camera with 24.2MP sensor. Exceptional image quality, 4K video recording, and advanced autofocus make this camera ideal for both photography enthusiasts and professionals. Includes a versatile 28-70mm lens.",
    category: "electronics",
    dailyPrice: 20,
    weeklyPrice: 120,
    monthlyPrice: 399,
    featured: true
  },
  {
    id: 3,
    name: "Modern Lounge Chair",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1916&q=80",
    description: "Comfortable stylish chair for your living room. Ergonomically designed with premium upholstery and solid wood legs. Perfect for reading, relaxing, or adding a touch of modern elegance to any space.",
    category: "furniture",
    dailyPrice: 8,
    weeklyPrice: 45,
    monthlyPrice: 150,
    featured: true
  },
  {
    id: 4,
    name: "Power Drill Set",
    image: "https://images.unsplash.com/photo-1563754357749-4a981a6ef2cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    description: "Professional 18V cordless drill with accessories. This complete kit includes multiple drill bits, a charger, and a carrying case. Powerful enough for home projects and professional work alike.",
    category: "tools",
    dailyPrice: 7,
    weeklyPrice: 39,
    monthlyPrice: 129,
    featured: true
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [rentalPeriod, setRentalPeriod] = useState("daily");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch product details
    setLoading(true);
    setTimeout(() => {
      const foundProduct = sampleProducts.find((p) => p.id === Number(id));
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Check if item is in wishlist
        const wishlist = JSON.parse(localStorage.getItem("bucketit_wishlist") || "[]");
        setIsInWishlist(wishlist.some((item: any) => item.id === foundProduct.id));
      } else {
        // Product not found
        navigate("/products");
        toast.error("Product not found");
      }
      setLoading(false);
    }, 500);
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!product) return;
    
    // Get existing cart
    const existingCart = JSON.parse(localStorage.getItem("bucketit_cart") || "[]");
    
    // Check if item already in cart
    const itemInCart = existingCart.find((item: any) => item.id === product.id);
    
    if (itemInCart) {
      toast.info(`${product.name} is already in your cart`);
      return;
    }
    
    // Get price based on rental period
    const price = rentalPeriod === "daily" 
      ? product.dailyPrice 
      : rentalPeriod === "weekly" 
        ? product.weeklyPrice 
        : product.monthlyPrice;
    
    // Add item to cart
    const newItem = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: price,
      duration: rentalPeriod,
      quantity: selectedQuantity
    };
    
    const updatedCart = [...existingCart, newItem];
    localStorage.setItem("bucketit_cart", JSON.stringify(updatedCart));
    
    // Trigger storage update event
    window.dispatchEvent(new Event("bucketit_storage_update"));
    
    toast.success(`Added ${product.name} to your cart`);
  };
  
  const toggleWishlist = () => {
    if (!product) return;
    
    // Get existing wishlist
    const existingWishlist = JSON.parse(localStorage.getItem("bucketit_wishlist") || "[]");
    
    if (isInWishlist) {
      // Remove from wishlist
      const updatedWishlist = existingWishlist.filter((item: any) => item.id !== product.id);
      localStorage.setItem("bucketit_wishlist", JSON.stringify(updatedWishlist));
      setIsInWishlist(false);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      // Add to wishlist
      const wishlistItem = {
        ...product,
        addedAt: new Date().toISOString()
      };
      
      const updatedWishlist = [...existingWishlist, wishlistItem];
      localStorage.setItem("bucketit_wishlist", JSON.stringify(updatedWishlist));
      setIsInWishlist(true);
      toast.success(`${product.name} added to wishlist`);
    }
    
    // Trigger storage update event
    window.dispatchEvent(new Event("bucketit_storage_update"));
  };

  const getRentalPrice = () => {
    if (!product) return 0;
    
    return rentalPeriod === "daily" 
      ? product.dailyPrice 
      : rentalPeriod === "weekly" 
        ? product.weeklyPrice 
        : product.monthlyPrice;
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4">
          <div className="animate-pulse">
            <div className="h-10 bg-muted rounded w-3/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="aspect-square bg-muted rounded"></div>
              <div className="space-y-6">
                <div className="h-8 bg-muted rounded w-2/3"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-12 bg-muted rounded w-full mt-8"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="rounded-lg overflow-hidden border bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-4 flex justify-between items-start">
              <div>
                <span className="text-sm text-muted-foreground uppercase tracking-wider">
                  {product.category}
                </span>
                <h1 className="text-3xl font-bold mt-1">{product.name}</h1>
              </div>
              <Button 
                variant={isInWishlist ? "default" : "outline"}
                size="icon"
                onClick={toggleWishlist}
                className="flex-shrink-0"
              >
                <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
              </Button>
            </div>

            <div className="prose max-w-none mb-8">
              <p>{product.description}</p>
            </div>

            {/* Rental Options */}
            <div className="border rounded-lg p-6 bg-background mb-8">
              <h3 className="text-lg font-semibold mb-4">Choose Rental Period</h3>
              
              <Tabs value={rentalPeriod} onValueChange={setRentalPeriod}>
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
                
                <TabsContent value="daily" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Price per day:</span>
                    <span className="text-2xl font-bold">${product.dailyPrice}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Perfect for short-term needs or trying before committing to a longer rental.
                  </p>
                </TabsContent>
                
                <TabsContent value="weekly" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Price per week:</span>
                    <span className="text-2xl font-bold">${product.weeklyPrice}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Daily equivalent:</span>
                    <span>${(product.weeklyPrice / 7).toFixed(2)}/day</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Our most popular option - great value for projects lasting several days.
                  </p>
                </TabsContent>
                
                <TabsContent value="monthly" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Price per month:</span>
                    <span className="text-2xl font-bold">${product.monthlyPrice}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Weekly equivalent:</span>
                    <span>${(product.monthlyPrice / 4).toFixed(2)}/week</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Best value for long-term rentals. Significant savings compared to weekly rates.
                  </p>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Quantity</h3>
                <RadioGroup
                  value={selectedQuantity.toString()}
                  onValueChange={(value) => setSelectedQuantity(parseInt(value))}
                  className="flex space-x-4"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="flex items-center space-x-2">
                      <RadioGroupItem value={num.toString()} id={`quantity-${num}`} />
                      <Label htmlFor={`quantity-${num}`}>{num}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div className="mt-8 pt-6 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg">Total Price:</span>
                  <span className="text-3xl font-bold text-primary">
                    ${getRentalPrice() * selectedQuantity}
                  </span>
                </div>
                <Button onClick={handleAddToCart} className="w-full py-6 text-lg">
                  Add to Cart
                </Button>
              </div>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="font-medium mb-2">Rental Policy Summary</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• ID verification required for all rentals</li>
                <li>• Security deposit may be required</li>
                <li>• Free delivery for orders over $100</li>
                <li>• 24-hour support for all rental items</li>
                <li>• Flexible extensions available</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
