
import { ReactNode } from "react";
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

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const sidebarItems = [
    { name: "Profile", path: "/profile", icon: User },
    { name: "Cart", path: "/cart", icon: ShoppingCart },
    { name: "Wishlist", path: "/wishlist", icon: Heart },
    { name: "Order History", path: "/order-history", icon: Clock },
    { name: "Payment Methods", path: "/payment", icon: CreditCard },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

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
                  className="w-full justify-start mb-1"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            ))}
            <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive mt-6">
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
