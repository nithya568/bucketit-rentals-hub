
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  category: string;
  dailyPrice: number;
  weeklyPrice: number;
  monthlyPrice: number;
  featured?: boolean;
  available?: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
        {product.featured && (
          <Badge className="absolute top-3 right-3 bg-accent/90 hover:bg-accent">
            Featured
          </Badge>
        )}
        {product.available === false && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm py-1.5">
              Currently Unavailable
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4 flex-grow">
        <div className="mb-2">
          <Link
            to={`/category/${product.category}`}
            className="text-xs font-medium text-muted-foreground hover:text-primary uppercase tracking-wider"
          >
            {product.category}
          </Link>
        </div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">
          <Link to={`/product/${product.id}`} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center text-sm font-medium">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Daily</span>
            <span className="text-foreground">${product.dailyPrice}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Weekly</span>
            <span className="text-foreground">${product.weeklyPrice}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Monthly</span>
            <span className="text-foreground">${product.monthlyPrice}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          asChild 
          className="w-full" 
          disabled={product.available === false}
        >
          <Link to={`/product/${product.id}`}>
            {product.available === false ? "Not Available" : "View Details"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
