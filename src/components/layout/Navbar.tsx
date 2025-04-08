
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, ShoppingCart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              <Link to="/login">
                <Button variant="outline" className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
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
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
