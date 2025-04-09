
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

// List of main categories with their icons and images
const categories = [
  {
    id: "electronics",
    name: "Electronics",
    icon: "💻",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Laptops, TVs, Tablets, Cameras and more",
  },
  {
    id: "furniture",
    name: "Furniture",
    icon: "🛋️",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Sofas, Beds, Tables, Chairs and more",
  },
  {
    id: "appliances",
    name: "Appliances",
    icon: "🔌",
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    description: "Kitchen appliances, Washers, Dryers and more",
  },
  {
    id: "tools",
    name: "Tools",
    icon: "🔨",
    image: "https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    description: "Power tools, Garden equipment and more",
  },
  {
    id: "books",
    name: "Books",
    icon: "📚",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Textbooks, Novels, Comics and more",
  },
  {
    id: "outdoor",
    name: "Outdoor",
    icon: "🏕️",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Camping gear, Sports equipment and more",
  },
];

const Categories = () => {
  return (
    <section className="py-16 bg-gradient-to-tr from-muted/50 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gradient-primary">Explore Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse through our wide range of rental categories to find exactly
            what you need, when you need it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link to={`/products?category=${category.id}`} key={category.id} className="block">
              <Card 
                className="h-full transition-all hover:shadow-lg hover:border-primary/50 hover:scale-[1.03] duration-300 overflow-hidden group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6 w-full">
                      <h3 className="text-2xl font-bold text-white mb-1">{category.name}</h3>
                      <p className="text-white/80 text-sm line-clamp-2">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-5 flex items-center">
                  <div className="text-4xl mr-4">{category.icon}</div>
                  <div className="text-sm text-muted-foreground">
                    Browse all {category.name.toLowerCase()} products →
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
