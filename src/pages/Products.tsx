
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductCard, { Product } from "@/components/products/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

// Sample products data with high-quality images
const sampleProducts: Product[] = [
  {
    id: 1,
    name: "MacBook Pro 16\" M1 Pro",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80",
    description: "Latest model with 16GB RAM and 512GB SSD",
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
    description: "Full-frame mirrorless camera with 24.2MP",
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
    description: "Comfortable stylish chair for your living room",
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
    description: "Professional 18V cordless drill with accessories",
    category: "tools",
    dailyPrice: 7,
    weeklyPrice: 39,
    monthlyPrice: 129,
    featured: true
  },
  {
    id: 5,
    name: "4K Smart TV 55\"",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Ultra HD 4K resolution with built-in streaming apps",
    category: "electronics",
    dailyPrice: 15,
    weeklyPrice: 89,
    monthlyPrice: 299
  },
  {
    id: 6,
    name: "Dining Table Set",
    image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Modern dining table with 4 chairs for your home",
    category: "furniture",
    dailyPrice: 12,
    weeklyPrice: 70,
    monthlyPrice: 230
  },
  {
    id: 7,
    name: "Professional DSLR Camera",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "High-end DSLR camera for professional photography",
    category: "electronics",
    dailyPrice: 22,
    weeklyPrice: 130,
    monthlyPrice: 420
  },
  {
    id: 8,
    name: "Lawn Mower",
    image: "https://images.unsplash.com/photo-1589260085307-5ae5deddf2a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Powerful lawn mower for garden maintenance",
    category: "tools",
    dailyPrice: 10,
    weeklyPrice: 55,
    monthlyPrice: 180
  },
  {
    id: 9,
    name: "Professional Blender",
    image: "https://images.unsplash.com/photo-1619070543343-58d3e1c85a4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    description: "High-performance blender for smoothies and food prep",
    category: "appliances",
    dailyPrice: 5,
    weeklyPrice: 30,
    monthlyPrice: 90
  },
  {
    id: 10,
    name: "Coffee Machine",
    image: "https://images.unsplash.com/photo-1595246007497-68e1e9dc0d8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Premium espresso and coffee maker for coffee lovers",
    category: "appliances",
    dailyPrice: 8,
    weeklyPrice: 45,
    monthlyPrice: 135
  },
  {
    id: 11,
    name: "Camping Tent (4-Person)",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Waterproof tent with easy setup for outdoor adventures",
    category: "outdoor",
    dailyPrice: 12,
    weeklyPrice: 65,
    monthlyPrice: 190
  },
  {
    id: 12,
    name: "Mountain Bike",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "All-terrain mountain bike for trail riding and adventure",
    category: "outdoor",
    dailyPrice: 15,
    weeklyPrice: 80,
    monthlyPrice: 240
  },
  {
    id: 13,
    name: "Bestseller Book Collection",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2198&q=80",
    description: "Collection of 10 bestselling novels for your reading pleasure",
    category: "books",
    dailyPrice: 3,
    weeklyPrice: 15,
    monthlyPrice: 40
  },
  {
    id: 14,
    name: "Study Textbooks Bundle",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
    description: "Bundle of textbooks for various subjects - perfect for students",
    category: "books",
    dailyPrice: 5,
    weeklyPrice: 25,
    monthlyPrice: 75
  },
  {
    id: 15,
    name: "Office Desk",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2036&q=80",
    description: "Spacious modern desk perfect for home office setup",
    category: "furniture",
    dailyPrice: 10,
    weeklyPrice: 50,
    monthlyPrice: 150
  },
  {
    id: 16,
    name: "Pressure Washer",
    image: "https://images.unsplash.com/photo-1621510007830-1835a9755279?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "High-pressure cleaner for outdoor surfaces and vehicles",
    category: "tools",
    dailyPrice: 15,
    weeklyPrice: 75,
    monthlyPrice: 220
  }
];

// All possible categories
const allCategories = ["electronics", "furniture", "tools", "books", "appliances", "outdoor"];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(true);
  const [sortOption, setSortOption] = useState("relevance");

  useEffect(() => {
    // Initialize with sample data (in a real app, would fetch from API)
    setProducts(sampleProducts);
    
    // Initialize selected category from URL if present
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
  }, [searchParams]);

  useEffect(() => {
    let result = [...products];
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by selected categories
    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }
    
    // Filter by availability
    if (showOnlyAvailable) {
      result = result.filter((product) => product.available !== false);
    }
    
    // Sort products
    if (sortOption === "priceLowToHigh") {
      result.sort((a, b) => a.dailyPrice - b.dailyPrice);
    } else if (sortOption === "priceHighToLow") {
      result.sort((a, b) => b.dailyPrice - a.dailyPrice);
    }
    // If sortOption is "relevance", we leave the order as is
    
    setFilteredProducts(result);
  }, [products, searchQuery, selectedCategories, showOnlyAvailable, sortOption]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL search parameters
    setSearchParams({ search: searchQuery });
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked
        ? [...prev, category]
        : prev.filter((cat) => cat !== category)
    );
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Browse Products</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 space-y-6">
            <div className="bg-background p-4 rounded-md border">
              <h3 className="font-semibold mb-3">Categories</h3>
              <div className="space-y-2">
                {allCategories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) =>
                        handleCategoryChange(category, checked === true)
                      }
                    />
                    <Label
                      htmlFor={`category-${category}`}
                      className="capitalize cursor-pointer"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-background p-4 rounded-md border">
              <h3 className="font-semibold mb-3">Availability</h3>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="available"
                  checked={showOnlyAvailable}
                  onCheckedChange={(checked) =>
                    setShowOnlyAvailable(checked === true)
                  }
                />
                <Label htmlFor="available" className="cursor-pointer">
                  Show only available items
                </Label>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sort Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-10 pr-16"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button
                    type="submit"
                    className="absolute right-1 top-1/2 -translate-y-1/2 py-1 px-2 h-8"
                  >
                    Search
                  </Button>
                </div>
              </form>

              <div className="w-full sm:w-48">
                <Select
                  value={sortOption}
                  onValueChange={(value) => setSortOption(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
                    <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Information */}
            <p className="text-muted-foreground mb-4">
              Showing {filteredProducts.length} results
            </p>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
