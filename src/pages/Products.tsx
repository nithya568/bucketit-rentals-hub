
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

// Sample products data (In a real app, this would come from an API)
const sampleProducts: Product[] = [
  {
    id: 1,
    name: "MacBook Pro 16\" M1 Pro",
    image: "https://placehold.co/600x400/2DD4BF/FFFFFF?text=MacBook+Pro",
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
    image: "https://placehold.co/600x400/2DD4BF/FFFFFF?text=Sony+A7+III",
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
    image: "https://placehold.co/600x400/2DD4BF/FFFFFF?text=Lounge+Chair",
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
    image: "https://placehold.co/600x400/2DD4BF/FFFFFF?text=Power+Drill+Set",
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
    image: "https://placehold.co/600x400/2DD4BF/FFFFFF?text=Smart+TV",
    description: "Ultra HD 4K resolution with built-in streaming apps",
    category: "electronics",
    dailyPrice: 15,
    weeklyPrice: 89,
    monthlyPrice: 299,
    available: false
  },
  {
    id: 6,
    name: "Dining Table Set",
    image: "https://placehold.co/600x400/2DD4BF/FFFFFF?text=Dining+Table",
    description: "Modern dining table with 4 chairs for your home",
    category: "furniture",
    dailyPrice: 12,
    weeklyPrice: 70,
    monthlyPrice: 230
  },
  {
    id: 7,
    name: "Professional DSLR Camera",
    image: "https://placehold.co/600x400/2DD4BF/FFFFFF?text=DSLR+Camera",
    description: "High-end DSLR camera for professional photography",
    category: "electronics",
    dailyPrice: 22,
    weeklyPrice: 130,
    monthlyPrice: 420
  },
  {
    id: 8,
    name: "Lawn Mower",
    image: "https://placehold.co/600x400/2DD4BF/FFFFFF?text=Lawn+Mower",
    description: "Powerful lawn mower for garden maintenance",
    category: "tools",
    dailyPrice: 10,
    weeklyPrice: 55,
    monthlyPrice: 180
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
