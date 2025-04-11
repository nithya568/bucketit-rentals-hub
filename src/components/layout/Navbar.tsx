import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, ShoppingCart, Search, LogOut, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<{ fullName?: string; email?: string } | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Load user data on component mount
  useEffect(() => {
    // Check for user data in localStorage
    const storedUser = localStorage.getItem("bucketit_user");
    if (storedUser) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(storedUser));
    }

    // Get cart and wishlist count
    updateCounts();

    // Listen for storage events to update login status and counts
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("bucketit_user");
      setIsLoggedIn(!!updatedUser);
      setUserData(updatedUser ? JSON.parse(updatedUser) : null);
      updateCounts();
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Custom event for internal updates
    window.addEventListener("bucketit_storage_update", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("bucketit_storage_update", handleStorageChange);
    };
  }, []);

  const updateCounts = () => {
    const cart = JSON.parse(localStorage.getItem("bucketit_cart") || "[]");
    const wishlist = JSON.parse(localStorage.getItem("bucketit_wishlist") || "[]");
    setCartCount(cart.length);
    setWishlistCount(wishlist.length);
  };

  const handleLogout = () => {
    localStorage.removeItem("bucketit_user");
    setIsLoggedIn(false);
    setUserData(null);
    // Dispatch a custom event to notify other components about the change
    window.dispatchEvent(new Event("bucketit_storage_update"));
    toast.success("You have been logged out successfully");
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setIsMenuOpen(false); // Close mobile menu if open
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary animate-fade-in">BucketIt</span>
              <span className="hidden md:block ml-2 text-sm font-medium text-muted-foreground">
                love it..rent it
              </span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center w-full max-w-md mx-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                type="text"
                placeholder="Search for items..."
                className="w-full pl-10 py-2"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/products" className="text-foreground hover:text-primary transition-colors">
              Browse
            </Link>
            <Link to="/how-it-works" className="text-foreground hover:text-primary transition-colors">
              How It Works
            </Link>
            <div className="flex items-center space-x-2">
              <Link to="/wishlist">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5 hover:text-primary transition-colors" />
                  {wishlistCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent text-white">
                      {wishlistCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5 hover:text-primary transition-colors" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="flex items-center ml-2 animate-fade-in cursor-pointer"
                      onClick={() => {}}
                    >
                      <Avatar className="h-6 w-6 mr-2">
                        <div className="bg-primary text-primary-foreground h-full w-full flex items-center justify-center text-xs font-medium">
                          {userData?.fullName?.charAt(0) || "U"}
                        </div>
                      </Avatar>
                      {userData?.fullName || "User"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="animate-fade-in">
                    <DropdownMenuItem onClick={handleProfileClick} className="cursor-pointer">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/wishlist" className="w-full cursor-pointer">
                        <Heart className="h-4 w-4 mr-2" />
                        Wishlist
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/order-history" className="w-full cursor-pointer">
                        Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="flex items-center hover:bg-primary/10 transition-colors">
                      <User className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="hover:shadow-md transition-all">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <div className="flex items-center space-x-1">
              <Link to="/wishlist">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent text-white">
                      {wishlistCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-b shadow-lg">
            {/* Search Bar - Mobile */}
            <div className="px-3 py-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  type="text"
                  placeholder="Search for items..."
                  className="w-full pl-10 py-2"
                />
              </div>
            </div>
            <Link
              to="/products"
              className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary"
            >
              Browse
            </Link>
            <Link
              to="/how-it-works"
              className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary"
            >
              How It Works
            </Link>
            
            {isLoggedIn ? (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-3 py-2 text-base font-medium text-foreground hover:text-primary"
                  onClick={handleProfileClick}
                >
                  Profile
                </Button>
                <Link
                  to="/wishlist"
                  className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary"
                >
                  Wishlist
                </Link>
                <Link
                  to="/order-history"
                  className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary"
                >
                  Order History
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full mt-2 text-destructive" 
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <div className="px-3 py-2 flex flex-col space-y-2">
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
