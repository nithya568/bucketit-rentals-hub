
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

// Category information
const categoryInfo = {
  electronics: {
    title: "Electronics",
    description: "Rent the latest tech gadgets, laptops, cameras, and more",
    bannerImage: "https://placehold.co/1200x300/2DD4BF/FFFFFF?text=Electronics+Category"
  },
  furniture: {
    title: "Furniture",
    description: "Quality furniture for your home, office, or special events",
    bannerImage: "https://placehold.co/1200x300/2DD4BF/FFFFFF?text=Furniture+Category"
  },
  tools: {
    title: "Tools & Equipment",
    description: "Professional tools and equipment for any project or task",
    bannerImage: "https://placehold.co/1200x300/2DD4BF/FFFFFF?text=Tools+Category"
  },
  books: {
    title: "Books",
    description: "Textbooks, novels, and other reading materials for all ages",
    bannerImage: "https://placehold.co/1200x300/2DD4BF/FFFFFF?text=Books+Category"
  },
  appliances: {
    title: "Appliances",
    description: "Kitchen appliances, vacuums, and other household necessities",
    bannerImage: "https://placehold.co/1200x300/2DD4BF/FFFFFF?text=Appliances+Category"
  },
  outdoor: {
    title: "Outdoor & Camping",
    description: "Everything you need for outdoor adventures and activities",
    bannerImage: "https://placehold.co/1200x300/2DD4BF/FFFFFF?text=Outdoor+Category"
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
      {/* Category Banner */}
      <div className="relative">
        <div className="h-48 md:h-64 overflow-hidden">
          <img
            src={category.bannerImage}
            alt={category.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center">
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

        {/* Products Grid */}
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
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">
              We couldn't find any products matching your criteria
            </p>
            <Button 
              onClick={() => setSearchQuery("")}
              variant="outline"
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
