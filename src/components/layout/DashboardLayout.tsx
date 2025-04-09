
import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ShoppingCart, 
  Heart, 
  User, 
  Clock, 
  CreditCard,
  Settings,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [cartItemCount, setCartItemCount] = useState(0);
  const [wishlistItemCount, setWishlistItemCount] = useState(0);

  // Load cart and wishlist data on mount
  useEffect(() => {
    // Get cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem("bucketit_cart") || "[]");
    setCartItemCount(cartItems.length);

    // Get wishlist items from localStorage
    const wishlistItems = JSON.parse(localStorage.getItem("bucketit_wishlist") || "[]");
    setWishlistItemCount(wishlistItems.length);

    // Listen for storage events to update counts when cart/wishlist changes
    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem("bucketit_cart") || "[]");
      const updatedWishlist = JSON.parse(localStorage.getItem("bucketit_wishlist") || "[]");
      setCartItemCount(updatedCart.length);
      setWishlistItemCount(updatedWishlist.length);
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Custom event for internal updates (when localStorage is updated in the same window)
    window.addEventListener("bucketit_storage_update", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("bucketit_storage_update", handleStorageChange);
    };
  }, []);

  const sidebarItems = [
    { name: "Profile", path: "/profile", icon: User },
    { 
      name: "Cart", 
      path: "/cart", 
      icon: ShoppingCart,
      count: cartItemCount
    },
    { 
      name: "Wishlist", 
      path: "/wishlist", 
      icon: Heart,
      count: wishlistItemCount
    },
    { name: "Order History", path: "/order-history", icon: Clock },
    { name: "Payment Methods", path: "/payment", icon: CreditCard },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem("bucketit_user");
    // Redirect to home page
    window.location.href = "/";
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card className="p-4 md:col-span-1">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Link to={item.path} key={item.path}>
                <Button
                  variant={currentPath === item.path ? "default" : "ghost"}
                  className="w-full justify-start mb-1 relative"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                  {item.count > 0 && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.count}
                    </Badge>
                  )}
                </Button>
              </Link>
            ))}
            <Button 
              variant="outline" 
              className="w-full justify-start text-destructive hover:text-destructive mt-6"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </Card>

        {/* Main Content */}
        <div className="md:col-span-3">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
