
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  duration: "daily" | "weekly" | "monthly";
  quantity: number;
}

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("bucketit_cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Update localStorage whenever cart items change
  useEffect(() => {
    localStorage.setItem("bucketit_cart", JSON.stringify(cartItems));
    // Dispatch custom event to notify other components of the change
    window.dispatchEvent(new Event("bucketit_storage_update"));
  }, [cartItems]);

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };

  const handleChangeDuration = (id: number, duration: "daily" | "weekly" | "monthly") => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        // Adjust price based on duration
        let price = item.price;
        if (duration === "daily") {
          price = 25; // Sample daily price
        } else if (duration === "weekly") {
          price = 45; // Sample weekly price
        } else {
          price = 150; // Sample monthly price
        }
        return { ...item, duration, price };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const handleChangeQuantity = (id: number, quantity: number) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const handleCheckout = () => {
    // Make sure we have items in the cart
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    // Navigate to checkout
    navigate("/checkout");
  };

  // Calculate totals from actual cart items
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Items ({cartItems.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                              <div>
                                <p className="font-medium">{item.name}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={item.duration}
                              onValueChange={(value) => handleChangeDuration(item.id, value as "daily" | "weekly" | "monthly")}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue placeholder="Duration" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={item.quantity.toString()}
                              onValueChange={(value) => handleChangeQuantity(item.id, parseInt(value))}
                            >
                              <SelectTrigger className="w-20">
                                <SelectValue placeholder="Qty" />
                              </SelectTrigger>
                              <SelectContent>
                                {[1, 2, 3, 4, 5].map((num) => (
                                  <SelectItem key={num} value={num.toString()}>
                                    {num}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <Trash className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            
            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-4 border-t">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleCheckout}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Proceed to Checkout
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="p-8 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              <h2 className="text-2xl font-semibold">Your cart is empty</h2>
              <p className="text-muted-foreground">
                Looks like you haven't added anything to your cart yet
              </p>
              <Button asChild className="mt-4">
                <Link to="/products">Browse Products</Link>
              </Button>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
