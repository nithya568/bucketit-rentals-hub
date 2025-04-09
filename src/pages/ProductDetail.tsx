import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Product } from "@/components/products/ProductCard";
import { Heart, IndianRupee, XCircle } from "lucide-react";

// Sample products data with available flag set to true for all products
const sampleProducts: Product[] = [
  {
    id: 1,
    name: "MacBook Pro 16\" M1 Pro",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80",
    description: "Latest model with 16GB RAM and 512GB SSD. This powerful laptop is perfect for professionals and creatives who need high performance on the go. Features the M1 Pro chip, a brilliant Retina XDR display, and all-day battery life.",
    category: "electronics",
    dailyPrice: 1999,
    weeklyPrice: 9999,
    monthlyPrice: 34999,
    featured: true,
    available: true
  },
  {
    id: 2,
    name: "Sony A7 III Camera",
    image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    description: "Full-frame mirrorless camera with 24.2MP sensor. Exceptional image quality, 4K video recording, and advanced autofocus make this camera ideal for both photography enthusiasts and professionals. Includes a versatile 28-70mm lens.",
    category: "electronics",
    dailyPrice: 1499,
    weeklyPrice: 7999,
    monthlyPrice: 26999,
    featured: true,
    available: true
  },
  {
    id: 3,
    name: "Modern Lounge Chair",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1916&q=80",
    description: "Comfortable stylish chair for your living room. Ergonomically designed with premium upholstery and solid wood legs. Perfect for reading, relaxing, or adding a touch of modern elegance to any space.",
    category: "furniture",
    dailyPrice: 599,
    weeklyPrice: 2999,
    monthlyPrice: 9999,
    featured: true,
    available: true
  },
  {
    id: 4,
    name: "Power Drill Set",
    image: "https://images.unsplash.com/photo-1563754357749-4a981a6ef2cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    description: "Professional 18V cordless drill with accessories. This complete kit includes multiple drill bits, a charger, and a carrying case. Powerful enough for home projects and professional work alike.",
    category: "tools",
    dailyPrice: 499,
    weeklyPrice: 2499,
    monthlyPrice: 7999,
    featured: true,
    available: true
  },
  {
    id: 5,
    name: "4K Smart TV 55\"",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Ultra HD 4K resolution with built-in streaming apps. This smart TV offers incredible picture quality, easy access to your favorite streaming services, and a sleek design that looks great in any room.",
    category: "electronics",
    dailyPrice: 999,
    weeklyPrice: 5499,
    monthlyPrice: 17999,
    available: true
  },
  {
    id: 6,
    name: "Dining Table Set",
    image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Modern dining table with 4 chairs for your home. This elegant dining set features a sturdy construction, comfortable seating, and a stylish design that complements any dining room decor.",
    category: "furniture",
    dailyPrice: 799,
    weeklyPrice: 4499,
    monthlyPrice: 15999,
    available: true
  },
  {
    id: 7,
    name: "Professional DSLR Camera",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "High-end DSLR camera for professional photography. Capture stunning images with this professional-grade camera featuring advanced sensor technology, versatile shooting modes, and exceptional low-light performance.",
    category: "electronics",
    dailyPrice: 1699,
    weeklyPrice: 8999,
    monthlyPrice: 29999,
    available: true
  },
  {
    id: 8,
    name: "Lawn Mower",
    image: "https://images.unsplash.com/photo-1589260085307-5ae5deddf2a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Powerful lawn mower for garden maintenance. This efficient lawn mower makes yard work easy with its powerful motor, adjustable cutting height, and ergonomic design for comfortable operation.",
    category: "tools",
    dailyPrice: 699,
    weeklyPrice: 3499,
    monthlyPrice: 11999,
    available: true
  },
  {
    id: 9,
    name: "Professional Blender",
    image: "https://images.unsplash.com/photo-1619070543343-58d3e1c85a4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    description: "High-performance blender for smoothies and food prep. This commercial-grade blender pulverizes fruits, vegetables, and ice with ease, making it perfect for smoothies, soups, sauces, and more.",
    category: "appliances",
    dailyPrice: 349,
    weeklyPrice: 1799,
    monthlyPrice: 5999,
    available: true
  },
  {
    id: 10,
    name: "Coffee Machine",
    image: "https://images.unsplash.com/photo-1595246007497-68e1e9dc0d8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Premium espresso and coffee maker for coffee lovers. Brew cafe-quality coffee at home with this premium machine featuring multiple brewing options, built-in grinder, and milk frother for perfect lattes and cappuccinos.",
    category: "appliances",
    dailyPrice: 499,
    weeklyPrice: 2999,
    monthlyPrice: 8999,
    available: true
  },
  {
    id: 11,
    name: "High-End Gaming PC",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2042&q=80",
    description: "Powerful gaming PC with RTX 3080, 32GB RAM and fast SSD storage. Perfect for gaming enthusiasts and content creators.",
    category: "electronics",
    dailyPrice: 2999,
    weeklyPrice: 12999,
    monthlyPrice: 39999,
    available: true
  },
  {
    id: 12,
    name: "Professional DJ Equipment",
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80",
    description: "Complete DJ setup with controllers, mixers, and speakers. Everything you need for your next event or party.",
    category: "electronics",
    dailyPrice: 1899,
    weeklyPrice: 8499,
    monthlyPrice: 24999,
    available: true
  },
  {
    id: 13,
    name: "Camping Gear Set",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Complete camping set with tent, sleeping bags, and cooking equipment. Everything you need for your outdoor adventure.",
    category: "outdoors",
    dailyPrice: 799,
    weeklyPrice: 3999,
    monthlyPrice: 12999,
    available: true
  },
  {
    id: 14,
    name: "Mountain Bike",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "High-quality mountain bike for trail riding and outdoor adventures. Features a lightweight frame and premium components.",
    category: "outdoors",
    dailyPrice: 599,
    weeklyPrice: 2999,
    monthlyPrice: 8999,
    available: true
  },
  {
    id: 15,
    name: "Digital Piano",
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Full-sized digital piano with weighted keys and authentic sound. Perfect for musicians and beginners alike.",
    category: "instruments",
    dailyPrice: 899,
    weeklyPrice: 3999,
    monthlyPrice: 11999,
    available: true
  },
  {
    id: 16,
    name: "Electric Guitar with Amp",
    image: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Professional electric guitar with amplifier and accessories. Great for performances and recording sessions.",
    category: "instruments",
    dailyPrice: 699,
    weeklyPrice: 2999,
    monthlyPrice: 9999,
    available: true
  },
  {
    id: 17,
    name: "Professional Drone",
    image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "High-end drone with 4K camera and advanced flight controls. Perfect for aerial photography and videography.",
    category: "electronics",
    dailyPrice: 1299,
    weeklyPrice: 5999,
    monthlyPrice: 17999,
    available: true
  },
  {
    id: 18,
    name: "Party Sound System",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Complete sound system with speakers, subwoofer, and mixer. Perfect for parties and events of all sizes.",
    category: "electronics",
    dailyPrice: 999,
    weeklyPrice: 4999,
    monthlyPrice: 14999,
    available: true
  },
  {
    id: 19,
    name: "Professional Video Camera",
    image: "https://images.unsplash.com/photo-1589872307379-0ffdf9829123?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    description: "High-end video camera for professional filming and content creation. Features 4K recording, stabilization, and premium optics.",
    category: "electronics",
    dailyPrice: 1799,
    weeklyPrice: 7999,
    monthlyPrice: 24999,
    available: true
  },
  {
    id: 20,
    name: "Power Tools Set",
    image: "https://images.unsplash.com/photo-1581147036324-c71f53e635e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    description: "Complete set of power tools including drill, saw, sander and more. Everything you need for home improvement projects.",
    category: "tools",
    dailyPrice: 899,
    weeklyPrice: 3999,
    monthlyPrice: 12999,
    available: true
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [rentalPeriod, setRentalPeriod] = useState("daily");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const foundProduct = sampleProducts.find((p) => p.id === Number(id));
      if (foundProduct) {
        setProduct(foundProduct);
        
        const wishlist = JSON.parse(localStorage.getItem("bucketit_wishlist") || "[]");
        setIsInWishlist(wishlist.some((item: any) => item.id === foundProduct.id));
      } else {
        setNotFound(true);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    if (product.available === false) {
      toast.error(`${product.name} is currently unavailable for rent`);
      return;
    }
    
    const existingCart = JSON.parse(localStorage.getItem("bucketit_cart") || "[]");
    
    const itemInCart = existingCart.find((item: any) => item.id === product.id);
    
    if (itemInCart) {
      toast.info(`${product.name} is already in your cart`);
      return;
    }
    
    const price = rentalPeriod === "daily" 
      ? product.dailyPrice 
      : rentalPeriod === "weekly" 
        ? product.weeklyPrice 
        : product.monthlyPrice;
    
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
    
    window.dispatchEvent(new Event("bucketit_storage_update"));
    
    toast.success(`Added ${product.name} to your cart`);
  };
  
  const toggleWishlist = () => {
    if (!product) return;
    
    const existingWishlist = JSON.parse(localStorage.getItem("bucketit_wishlist") || "[]");
    
    if (isInWishlist) {
      const updatedWishlist = existingWishlist.filter((item: any) => item.id !== product.id);
      localStorage.setItem("bucketit_wishlist", JSON.stringify(updatedWishlist));
      setIsInWishlist(false);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      const wishlistItem = {
        ...product,
        addedAt: new Date().toISOString()
      };
      
      const updatedWishlist = [...existingWishlist, wishlistItem];
      localStorage.setItem("bucketit_wishlist", JSON.stringify(updatedWishlist));
      setIsInWishlist(true);
      toast.success(`${product.name} added to wishlist`);
    }
    
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

  if (notFound) {
    return (
      <Layout>
        <div className="container mx-auto py-16 px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">
            Sorry, we couldn't find the product you're looking for.
          </p>
          <Button asChild>
            <Link to="/products">Browse All Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return null;
  }

  const isAvailable = true;

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="rounded-lg overflow-hidden border bg-white relative">
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-contain ${!isAvailable ? 'filter blur-[2px] opacity-90' : ''}`}
            />
            {!isAvailable && (
              <div className="absolute inset-0 bg-background/60 flex items-center justify-center flex-col gap-3">
                <Badge variant="destructive" className="text-base py-2 px-4 flex items-center gap-2">
                  <XCircle className="h-5 w-5" />
                  <span>Unavailable at this time</span>
                </Badge>
                <p className="text-sm text-center max-w-md px-4 text-muted-foreground bg-background/80 py-2 rounded">
                  This product is currently out of stock. You can add it to your wishlist to be notified when it becomes available.
                </p>
              </div>
            )}
          </div>

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

            <div className="border rounded-lg p-6 bg-background mb-8">
              <h3 className="text-lg font-semibold mb-4">Choose Rental Period</h3>
              
              <Tabs value={rentalPeriod} onValueChange={setRentalPeriod}>
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="daily" disabled={!isAvailable}>Daily</TabsTrigger>
                  <TabsTrigger value="weekly" disabled={!isAvailable}>Weekly</TabsTrigger>
                  <TabsTrigger value="monthly" disabled={!isAvailable}>Monthly</TabsTrigger>
                </TabsList>
                
                <TabsContent value="daily" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Price per day:</span>
                    <span className="text-2xl font-bold flex items-center"><IndianRupee className="h-5 w-5 mr-1" />{product.dailyPrice.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Perfect for short-term needs or trying before committing to a longer rental.
                  </p>
                </TabsContent>
                
                <TabsContent value="weekly" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Price per week:</span>
                    <span className="text-2xl font-bold flex items-center"><IndianRupee className="h-5 w-5 mr-1" />{product.weeklyPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Daily equivalent:</span>
                    <span><IndianRupee className="h-3 w-3 inline mr-1" />{(product.weeklyPrice / 7).toFixed(2)}/day</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Our most popular option - great value for projects lasting several days.
                  </p>
                </TabsContent>
                
                <TabsContent value="monthly" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Price per month:</span>
                    <span className="text-2xl font-bold flex items-center"><IndianRupee className="h-5 w-5 mr-1" />{product.monthlyPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Weekly equivalent:</span>
                    <span><IndianRupee className="h-3 w-3 inline mr-1" />{(product.monthlyPrice / 4).toFixed(2)}/week</span>
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
                  disabled={!isAvailable}
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
                  <span className="text-3xl font-bold text-primary flex items-center">
                    <IndianRupee className="h-6 w-6 mr-1" />
                    {(getRentalPrice() * selectedQuantity).toLocaleString()}
                  </span>
                </div>
                {isAvailable ? (
                  <Button onClick={handleAddToCart} className="w-full py-6 text-lg">
                    Add to Cart
                  </Button>
                ) : (
                  <Button variant="secondary" className="w-full py-6 text-lg" disabled>
                    Currently Unavailable
                  </Button>
                )}
              </div>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="font-medium mb-2">Rental Policy Summary</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• ID verification required for all rentals</li>
                <li>• Security deposit may be required</li>
                <li>• Free delivery for orders over ₹5,000</li>
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
