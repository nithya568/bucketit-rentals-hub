
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, ShoppingCart, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<{ fullName?: string; email?: string } | null>(null);

  useEffect(() => {
    // Check for user data in localStorage
    const storedUser = localStorage.getItem("bucketit_user");
    if (storedUser) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(storedUser));
    }

    // Listen for storage events to update login status
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("bucketit_user");
      setIsLoggedIn(!!updatedUser);
      setUserData(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Custom event for internal updates
    window.addEventListener("bucketit_storage_update", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("bucketit_storage_update", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("bucketit_user");
    setIsLoggedIn(false);
    setUserData(null);
    // Dispatch a custom event to notify other components about the change
    window.dispatchEvent(new Event("bucketit_storage_update"));
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">BucketIt</span>
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
            <Link to="/products" className="text-foreground hover:text-primary">
              Browse
            </Link>
            <Link to="/categories" className="text-foreground hover:text-primary">
              Categories
            </Link>
            <Link to="/how-it-works" className="text-foreground hover:text-primary">
              How It Works
            </Link>
            <div className="flex items-center space-x-2">
              <Link to="/cart">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </Link>
              
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <div className="bg-primary text-primary-foreground h-full w-full flex items-center justify-center text-xs font-medium">
                          {userData?.fullName?.charAt(0) || "U"}
                        </div>
                      </Avatar>
                      {userData?.fullName || "User"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="w-full cursor-pointer">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/wishlist" className="w-full cursor-pointer">
                        Wishlist
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/order-history" className="w-full cursor-pointer">
                        Order History
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
                    <Button variant="outline" className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button>Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
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
        <div className="md:hidden">
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
              to="/categories"
              className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary"
            >
              Categories
            </Link>
            <Link
              to="/how-it-works"
              className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary"
            >
              How It Works
            </Link>
            <Link
              to="/cart"
              className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary"
            >
              Cart
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary"
                >
                  Profile
                </Link>
                <Link
                  to="/wishlist"
                  className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary"
                >
                  Wishlist
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
