
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, ShieldCheck, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartSummary, setCartSummary] = useState({
    items: [],
    subtotal: 0,
    tax: 0,
    total: 0,
    currency: "₹" // Default to Indian Rupees
  });
  
  // Load cart items from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("bucketit_cart");
    if (savedCart) {
      const items = JSON.parse(savedCart);
      setCartItems(items);
      
      // Calculate totals
      const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const tax = subtotal * 0.18; // GST in India is typically 18%
      const total = subtotal + tax;
      
      setCartSummary({
        items,
        subtotal,
        tax,
        total,
        currency: "₹"
      });
    }
  }, []);

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    
    // Generate a unique order ID
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    
    // Create a new order object
    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      items: cartItems,
      total: cartSummary.total,
      currency: "₹", // Set currency for order
      status: "active"
    };
    
    // Get existing orders or initialize empty array
    const existingOrders = JSON.parse(localStorage.getItem("bucketit_orders") || "[]");
    
    // Add the new order to the orders array
    const updatedOrders = [newOrder, ...existingOrders];
    
    // Store in localStorage
    localStorage.setItem("bucketit_orders", JSON.stringify(updatedOrders));
    
    // Clear the cart
    localStorage.setItem("bucketit_cart", JSON.stringify([]));
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Order placed successfully!");
      
      // Dispatch custom event to notify other components of the change
      window.dispatchEvent(new Event("bucketit_storage_update"));
      
      navigate("/order-history");
    }, 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
                <CardDescription>
                  Please enter your shipping details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Mumbai" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select defaultValue="MH">
                      <SelectTrigger id="state">
                        <SelectValue placeholder="Select a state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MH">Maharashtra</SelectItem>
                        <SelectItem value="DL">Delhi</SelectItem>
                        <SelectItem value="KA">Karnataka</SelectItem>
                        <SelectItem value="TN">Tamil Nadu</SelectItem>
                        <SelectItem value="UP">Uttar Pradesh</SelectItem>
                        <SelectItem value="GJ">Gujarat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">PIN Code</Label>
                    <Input id="zipCode" placeholder="400001" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="+91 98765 43210" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox id="saveAddress" />
                  <Label htmlFor="saveAddress" className="text-sm">
                    Save this address for future orders
                  </Label>
                </div>
              </CardContent>
            </Card>
            
            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>
                  Select your preferred payment method
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="card">
                      <CreditCard className="mr-2 h-4 w-4" /> Credit Card
                    </TabsTrigger>
                    <TabsTrigger value="upi">
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.5 8.5h-2a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3Z" stroke="currentColor" strokeWidth="2" />
                        <path d="M16.5 14.5v5a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2h9" stroke="currentColor" strokeWidth="2" />
                      </svg>
                      UPI
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="card" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input id="expiryDate" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="nameOnCard">Name on Card</Label>
                      <Input id="nameOnCard" placeholder="John Doe" />
                    </div>
                    
                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox id="saveCard" />
                      <Label htmlFor="saveCard" className="text-sm">
                        Save this card for future payments
                      </Label>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="upi" className="py-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="upiId">UPI ID</Label>
                        <Input id="upiId" placeholder="yourname@upi" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        You will receive a payment request on your UPI app to complete the transaction.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          {/* Order Summary */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3">
                  {cartSummary.items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {cartSummary.currency}{item.price} × {item.quantity} ({item.duration})
                        </p>
                      </div>
                      <p>{cartSummary.currency}{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{cartSummary.currency}{cartSummary.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GST (18%)</span>
                    <span>{cartSummary.currency}{cartSummary.tax.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{cartSummary.currency}{cartSummary.total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="pt-4 space-y-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <ShieldCheck className="mr-2 h-4 w-4 text-primary" />
                    <span>Your personal data is protected</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Lock className="mr-2 h-4 w-4 text-primary" />
                    <span>Secure payment processing</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
