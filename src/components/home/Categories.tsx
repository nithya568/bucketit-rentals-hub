
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

// List of main categories with their icons
const categories = [
  {
    id: "electronics",
    name: "Electronics",
    icon: "💻",
    description: "Laptops, TVs, Tablets, Cameras and more",
  },
  {
    id: "furniture",
    name: "Furniture",
    icon: "🛋️",
    description: "Sofas, Beds, Tables, Chairs and more",
  },
  {
    id: "appliances",
    name: "Appliances",
    icon: "🔌",
    description: "Kitchen appliances, Washers, Dryers and more",
  },
  {
    id: "tools",
    name: "Tools",
    icon: "🔨",
    description: "Power tools, Garden equipment and more",
  },
  {
    id: "books",
    name: "Books",
    icon: "📚",
    description: "Textbooks, Novels, Comics and more",
  },
  {
    id: "outdoor",
    name: "Outdoor",
    icon: "🏕️",
    description: "Camping gear, Sports equipment and more",
  },
];

const Categories = () => {
  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Explore Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse through our wide range of rental categories to find exactly
            what you need, when you need it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link to={`/category/${category.id}`} key={category.id}>
              <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-medium mb-2">{category.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    {category.description}
                  </p>
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
