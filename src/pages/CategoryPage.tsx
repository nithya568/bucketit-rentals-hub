
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductCard, { Product } from "@/components/products/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

// Sample products data (In a real app, this would come from an API)
const sampleProducts: Product[] = [
  // Electronics
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
    id: 17,
    name: "Gaming Console",
    image: "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    description: "Latest gaming console with controllers and games",
    category: "electronics",
    dailyPrice: 18,
    weeklyPrice: 95,
    monthlyPrice: 280
  },
  
  // Furniture
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
    id: 18,
    name: "Sectional Sofa",
    image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Large comfortable sectional sofa for family gatherings",
    category: "furniture",
    dailyPrice: 15,
    weeklyPrice: 85,
    monthlyPrice: 250
  },
  
  // Tools
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
    id: 16,
    name: "Pressure Washer",
    image: "https://images.unsplash.com/photo-1621510007830-1835a9755279?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "High-pressure cleaner for outdoor surfaces and vehicles",
    category: "tools",
    dailyPrice: 15,
    weeklyPrice: 75,
    monthlyPrice: 220
  },
  {
    id: 19,
    name: "Table Saw",
    image: "https://images.unsplash.com/photo-1503789146722-cf137a3c0fea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Professional table saw for woodworking projects",
    category: "tools",
    dailyPrice: 18,
    weeklyPrice: 90,
    monthlyPrice: 270
  },
  
  // Books
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
    id: 20,
    name: "Children's Book Set",
    image: "https://images.unsplash.com/photo-1533903345306-15d1c30952de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Collection of popular children's books for all ages",
    category: "books",
    dailyPrice: 2,
    weeklyPrice: 10,
    monthlyPrice: 30
  },
  {
    id: 21,
    name: "Graphic Novel Collection",
    image: "https://images.unsplash.com/photo-1588580000645-f93292f46764?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Curated collection of popular graphic novels and comics",
    category: "books",
    dailyPrice: 4,
    weeklyPrice: 20,
    monthlyPrice: 60
  },
  
  // Appliances
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
    id: 22,
    name: "Stand Mixer",
    image: "https://images.unsplash.com/photo-1622480916113-9cafe97d8ef0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    description: "Professional stand mixer for baking and cooking",
    category: "appliances",
    dailyPrice: 9,
    weeklyPrice: 50,
    monthlyPrice: 150
  },
  {
    id: 23,
    name: "Air Fryer",
    image: "https://images.unsplash.com/photo-1648024131277-65e896e3a6e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    description: "Versatile air fryer for healthier cooking options",
    category: "appliances",
    dailyPrice: 6,
    weeklyPrice: 35,
    monthlyPrice: 100
  },
  
  // Outdoor
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
    id: 24,
    name: "Kayak",
    image: "https://images.unsplash.com/photo-1606908486799-0fd2a7281942?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Single-person kayak with paddle for water adventures",
    category: "outdoor",
    dailyPrice: 14,
    weeklyPrice: 75,
    monthlyPrice: 220
  },
  {
    id: 25,
    name: "Barbecue Grill",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80",
    description: "Portable barbecue grill for outdoor cooking and gatherings",
    category: "outdoor",
    dailyPrice: 10,
    weeklyPrice: 55,
    monthlyPrice: 160
  }
];

// Category information with better images
const categoryInfo = {
  electronics: {
    title: "Electronics",
    description: "Rent the latest tech gadgets, laptops, cameras, and more",
    bannerImage: "https://images.unsplash.com/photo-1468436139062-f60a71c5c892?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  furniture: {
    title: "Furniture",
    description: "Quality furniture for your home, office, or special events",
    bannerImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2158&q=80"
  },
  tools: {
    title: "Tools & Equipment",
    description: "Professional tools and equipment for any project or task",
    bannerImage: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  books: {
    title: "Books",
    description: "Textbooks, novels, and other reading materials for all ages",
    bannerImage: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  appliances: {
    title: "Appliances",
    description: "Kitchen appliances, vacuums, and other household necessities",
    bannerImage: "https://images.unsplash.com/photo-1556911220-bda9d6c3a0c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  outdoor: {
    title: "Outdoor & Camping",
    description: "Everything you need for outdoor adventures and activities",
    bannerImage: "https://images.unsplash.com/photo-1500835556837-99ac94a94552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
  }
};

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("relevance");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch products by category
    setLoading(true);
    setTimeout(() => {
      if (categoryId) {
        const filteredProducts = sampleProducts.filter(
          (product) => product.category === categoryId
        );
        setProducts(filteredProducts);
      }
      setLoading(false);
    }, 500);
  }, [categoryId]);

  const category = categoryId ? categoryInfo[categoryId as keyof typeof categoryInfo] : null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger an API call with the search query
  };

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "priceLowToHigh") {
      return a.dailyPrice - b.dailyPrice;
    } else if (sortOption === "priceHighToLow") {
      return b.dailyPrice - a.dailyPrice;
    }
    // Default: relevance (no change)
    return 0;
  });

  if (!category) {
    return (
      <Layout>
        <div className="container mx-auto py-16 px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The category you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/products">Browse All Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Category Banner with animation */}
      <div className="relative animate-fade-in">
        <div className="h-48 md:h-64 overflow-hidden">
          <img
            src={category.bannerImage}
            alt={category.title}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-white text-3xl md:text-4xl font-bold">
                {category.title}
              </h1>
              <p className="text-white/90 mt-2 max-w-2xl">
                {category.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        {/* Search and Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                type="search"
                placeholder={`Search in ${category.title}...`}
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
          Showing {sortedProducts.length} results in {category.title}
        </p>

        {/* Products Grid with animation */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video bg-muted rounded mb-4"></div>
                <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
                <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-muted rounded w-full mb-4"></div>
                <div className="flex justify-between mb-4">
                  <div className="h-4 bg-muted rounded w-1/5"></div>
                  <div className="h-4 bg-muted rounded w-1/5"></div>
                  <div className="h-4 bg-muted rounded w-1/5"></div>
                </div>
                <div className="h-10 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        ) : sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-fade-in" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-lg animate-fade-in">
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">
              We couldn't find any products matching your criteria
            </p>
            <Button 
              onClick={() => setSearchQuery("")}
              variant="outline"
              className="hover:bg-primary/10 transition-colors"
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
