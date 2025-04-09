
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

// Sample products data with high-quality images - expanded to have at least 10 per category
const sampleProducts: Product[] = [
  // ELECTRONICS CATEGORY (10+ items)
  {
    id: 1,
    name: "MacBook Pro 16\" M1 Pro",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80",
    description: "Latest model with 16GB RAM and 512GB SSD",
    category: "electronics",
    dailyPrice: 1999,
    weeklyPrice: 9999,
    monthlyPrice: 34999,
    featured: true
  },
  {
    id: 2,
    name: "Sony A7 III Camera",
    image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    description: "Full-frame mirrorless camera with 24.2MP",
    category: "electronics",
    dailyPrice: 1499,
    weeklyPrice: 7999,
    monthlyPrice: 26999,
    featured: true
  },
  {
    id: 5,
    name: "4K Smart TV 55\"",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Ultra HD 4K resolution with built-in streaming apps",
    category: "electronics",
    dailyPrice: 999,
    weeklyPrice: 5999,
    monthlyPrice: 19999
  },
  {
    id: 7,
    name: "Professional DSLR Camera",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "High-end DSLR camera for professional photography",
    category: "electronics",
    dailyPrice: 1699,
    weeklyPrice: 8999,
    monthlyPrice: 29999
  },
  {
    id: 17,
    name: "Gaming Console",
    image: "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    description: "Latest gaming console with controllers and games",
    category: "electronics",
    dailyPrice: 1199,
    weeklyPrice: 6499,
    monthlyPrice: 19999
  },
  {
    id: 101,
    name: "iPad Pro 12.9\"",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Apple iPad Pro with M1 chip and Liquid Retina XDR display",
    category: "electronics",
    dailyPrice: 999,
    weeklyPrice: 5499,
    monthlyPrice: 17999
  },
  {
    id: 102,
    name: "DJI Drone",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Professional aerial photography drone with 4K camera",
    category: "electronics",
    dailyPrice: 1399,
    weeklyPrice: 7499,
    monthlyPrice: 24999
  },
  {
    id: 103,
    name: "High-End DJ Equipment",
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    description: "Professional DJ controller, mixer and speakers setup",
    category: "electronics",
    dailyPrice: 1799,
    weeklyPrice: 8999,
    monthlyPrice: 29999
  },
  {
    id: 104,
    name: "Gaming PC Setup",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2042&q=80",
    description: "High-performance gaming PC with RGB lighting and peripherals",
    category: "electronics",
    dailyPrice: 1899,
    weeklyPrice: 9999,
    monthlyPrice: 32999
  },
  {
    id: 105,
    name: "VR Headset",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Immersive virtual reality headset with controllers",
    category: "electronics",
    dailyPrice: 899,
    weeklyPrice: 4999,
    monthlyPrice: 16999
  },
  
  // FURNITURE CATEGORY (10+ items)
  {
    id: 3,
    name: "Modern Lounge Chair",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1916&q=80",
    description: "Comfortable stylish chair for your living room",
    category: "furniture",
    dailyPrice: 599,
    weeklyPrice: 2999,
    monthlyPrice: 9999,
    featured: true
  },
  {
    id: 6,
    name: "Dining Table Set",
    image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Modern dining table with 4 chairs for your home",
    category: "furniture",
    dailyPrice: 799,
    weeklyPrice: 4999,
    monthlyPrice: 15999
  },
  {
    id: 15,
    name: "Office Desk",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2036&q=80",
    description: "Spacious modern desk perfect for home office setup",
    category: "furniture",
    dailyPrice: 699,
    weeklyPrice: 3499,
    monthlyPrice: 9999
  },
  {
    id: 18,
    name: "Sectional Sofa",
    image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Large comfortable sectional sofa for family gatherings",
    category: "furniture",
    dailyPrice: 999,
    weeklyPrice: 5999,
    monthlyPrice: 16999
  },
  {
    id: 106,
    name: "King Size Bed Frame",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Elegant king size bed frame with headboard",
    category: "furniture",
    dailyPrice: 899,
    weeklyPrice: 4999,
    monthlyPrice: 15999
  },
  {
    id: 107,
    name: "Designer Coffee Table",
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
    description: "Stylish modern coffee table with storage space",
    category: "furniture",
    dailyPrice: 499,
    weeklyPrice: 2499,
    monthlyPrice: 7999
  },
  {
    id: 108,
    name: "Bookshelves Set",
    image: "https://images.unsplash.com/photo-1600123460988-8acb96567ccc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Set of modern bookshelves for your home library",
    category: "furniture",
    dailyPrice: 599,
    weeklyPrice: 2999,
    monthlyPrice: 9999
  },
  {
    id: 109,
    name: "Accent Chairs (Pair)",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Pair of stylish accent chairs for living room",
    category: "furniture",
    dailyPrice: 699,
    weeklyPrice: 3499,
    monthlyPrice: 11999
  },
  {
    id: 110,
    name: "Dresser with Mirror",
    image: "https://images.unsplash.com/photo-1617104678098-de229db51175?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1213&q=80",
    description: "Elegant bedroom dresser with large mirror",
    category: "furniture",
    dailyPrice: 699,
    weeklyPrice: 3499,
    monthlyPrice: 11999
  },
  {
    id: 111,
    name: "Outdoor Patio Set",
    image: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
    description: "Complete patio furniture set for outdoor entertaining",
    category: "furniture",
    dailyPrice: 1199,
    weeklyPrice: 5999,
    monthlyPrice: 19999
  },
  
  // TOOLS CATEGORY (10+ items)
  {
    id: 4,
    name: "Power Drill Set",
    image: "https://images.unsplash.com/photo-1563754357749-4a981a6ef2cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    description: "Professional 18V cordless drill with accessories",
    category: "tools",
    dailyPrice: 499,
    weeklyPrice: 2499,
    monthlyPrice: 7999,
    featured: true
  },
  {
    id: 8,
    name: "Lawn Mower",
    image: "https://images.unsplash.com/photo-1589260085307-5ae5deddf2a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Powerful lawn mower for garden maintenance",
    category: "tools",
    dailyPrice: 699,
    weeklyPrice: 3499,
    monthlyPrice: 11999
  },
  {
    id: 16,
    name: "Pressure Washer",
    image: "https://images.unsplash.com/photo-1621510007830-1835a9755279?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "High-pressure cleaner for outdoor surfaces and vehicles",
    category: "tools",
    dailyPrice: 999,
    weeklyPrice: 4999,
    monthlyPrice: 14999
  },
  {
    id: 19,
    name: "Table Saw",
    image: "https://images.unsplash.com/photo-1503789146722-cf137a3c0fea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Professional table saw for woodworking projects",
    category: "tools",
    dailyPrice: 1199,
    weeklyPrice: 5999,
    monthlyPrice: 17999
  },
  {
    id: 112,
    name: "Chainsaw",
    image: "https://images.unsplash.com/photo-1563456161948-d6718150c91d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1213&q=80",
    description: "Gas-powered chainsaw for tree cutting and trimming",
    category: "tools",
    dailyPrice: 899,
    weeklyPrice: 4499,
    monthlyPrice: 13999
  },
  {
    id: 113,
    name: "Air Compressor",
    image: "https://images.unsplash.com/photo-1568478555168-52c6c2b3da28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Portable air compressor with accessories",
    category: "tools",
    dailyPrice: 699,
    weeklyPrice: 3499,
    monthlyPrice: 10999
  },
  {
    id: 114,
    name: "Generator",
    image: "https://images.unsplash.com/photo-1617789160764-fef12cbd0d29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Portable power generator for outdoor events or backup power",
    category: "tools",
    dailyPrice: 1499,
    weeklyPrice: 7499,
    monthlyPrice: 24999
  },
  {
    id: 115,
    name: "Concrete Mixer",
    image: "https://images.unsplash.com/photo-1566482605864-4ea76c1659ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Electric concrete mixer for construction projects",
    category: "tools",
    dailyPrice: 1299,
    weeklyPrice: 6499,
    monthlyPrice: 19999
  },
  {
    id: 116,
    name: "Tile Cutter",
    image: "https://images.unsplash.com/photo-1622473541057-880c023cef3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Professional tile cutter for renovation projects",
    category: "tools",
    dailyPrice: 599,
    weeklyPrice: 2999,
    monthlyPrice: 8999
  },
  {
    id: 117,
    name: "Scaffolding Set",
    image: "https://images.unsplash.com/photo-1603099094276-8e1660407653?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Complete scaffolding set for construction and painting jobs",
    category: "tools",
    dailyPrice: 1499,
    weeklyPrice: 7499,
    monthlyPrice: 22999
  },
  
  // BOOKS CATEGORY (10+ items)
  {
    id: 13,
    name: "Bestseller Book Collection",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2198&q=80",
    description: "Collection of 10 bestselling novels for your reading pleasure",
    category: "books",
    dailyPrice: 199,
    weeklyPrice: 999,
    monthlyPrice: 2499
  },
  {
    id: 14,
    name: "Study Textbooks Bundle",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
    description: "Bundle of textbooks for various subjects - perfect for students",
    category: "books",
    dailyPrice: 299,
    weeklyPrice: 1499,
    monthlyPrice: 4999
  },
  {
    id: 20,
    name: "Children's Book Set",
    image: "https://images.unsplash.com/photo-1533903345306-15d1c30952de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Collection of popular children's books for all ages",
    category: "books",
    dailyPrice: 149,
    weeklyPrice: 749,
    monthlyPrice: 1999
  },
  {
    id: 21,
    name: "Graphic Novel Collection",
    image: "https://images.unsplash.com/photo-1588580000645-f93292f46764?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Curated collection of popular graphic novels and comics",
    category: "books",
    dailyPrice: 249,
    weeklyPrice: 1299,
    monthlyPrice: 3999
  },
  {
    id: 118,
    name: "Fantasy Series Collection",
    image: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Complete set of popular fantasy series books",
    category: "books",
    dailyPrice: 299,
    weeklyPrice: 1499,
    monthlyPrice: 4499
  },
  {
    id: 119,
    name: "Business Books Bundle",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Selection of bestselling business and entrepreneurship books",
    category: "books",
    dailyPrice: 199,
    weeklyPrice: 999,
    monthlyPrice: 2999
  },
  {
    id: 120,
    name: "Cookbook Collection",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Assortment of premium cookbooks from renowned chefs",
    category: "books",
    dailyPrice: 249,
    weeklyPrice: 1299,
    monthlyPrice: 3499
  },
  {
    id: 121,
    name: "Self-Help Book Bundle",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    description: "Collection of popular self-improvement and personal development books",
    category: "books",
    dailyPrice: 179,
    weeklyPrice: 899,
    monthlyPrice: 2499
  },
  {
    id: 122,
    name: "Science Fiction Collection",
    image: "https://images.unsplash.com/photo-1518744386442-2d48ac47a7eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1208&q=80",
    description: "Complete set of classic and modern sci-fi novels",
    category: "books",
    dailyPrice: 199,
    weeklyPrice: 999,
    monthlyPrice: 2999
  },
  {
    id: 123,
    name: "Encyclopedia Set",
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80",
    description: "Complete encyclopedia set for research and learning",
    category: "books",
    dailyPrice: 349,
    weeklyPrice: 1799,
    monthlyPrice: 5499
  },
  
  // APPLIANCES CATEGORY (10+ items)
  {
    id: 9,
    name: "Professional Blender",
    image: "https://images.unsplash.com/photo-1619070543343-58d3e1c85a4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    description: "High-performance blender for smoothies and food prep",
    category: "appliances",
    dailyPrice: 349,
    weeklyPrice: 1799,
    monthlyPrice: 5999
  },
  {
    id: 10,
    name: "Coffee Machine",
    image: "https://images.unsplash.com/photo-1595246007497-68e1e9dc0d8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Premium espresso and coffee maker for coffee lovers",
    category: "appliances",
    dailyPrice: 499,
    weeklyPrice: 2999,
    monthlyPrice: 8999
  },
  {
    id: 22,
    name: "Stand Mixer",
    image: "https://images.unsplash.com/photo-1622480916113-9cafe97d8ef0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    description: "Professional stand mixer for baking and cooking",
    category: "appliances",
    dailyPrice: 599,
    weeklyPrice: 3499,
    monthlyPrice: 9999
  },
  {
    id: 23,
    name: "Air Fryer",
    image: "https://images.unsplash.com/photo-1648024131277-65e896e3a6e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    description: "Versatile air fryer for healthier cooking options",
    category: "appliances",
    dailyPrice: 399,
    weeklyPrice: 1999,
    monthlyPrice: 6999
  },
  {
    id: 124,
    name: "Refrigerator",
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Double door refrigerator with freezer compartment",
    category: "appliances",
    dailyPrice: 999,
    weeklyPrice: 4999,
    monthlyPrice: 16999
  },
  {
    id: 125,
    name: "Washing Machine",
    image: "https://images.unsplash.com/photo-1626806787461-102c1a7f1c62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Front-loading washing machine with multiple programs",
    category: "appliances",
    dailyPrice: 899,
    weeklyPrice: 4499,
    monthlyPrice: 14999
  },
  {
    id: 126,
    name: "Microwave Oven",
    image: "https://images.unsplash.com/photo-1585659722983-3a381788f5e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Convection microwave with grill function",
    category: "appliances",
    dailyPrice: 499,
    weeklyPrice: 2499,
    monthlyPrice: 7999
  },
  {
    id: 127,
    name: "Food Processor",
    image: "https://images.unsplash.com/photo-1625706628761-34780ac3d589?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Multi-function food processor with various attachments",
    category: "appliances",
    dailyPrice: 399,
    weeklyPrice: 1999,
    monthlyPrice: 6499
  },
  {
    id: 128,
    name: "Toaster Oven",
    image: "https://images.unsplash.com/photo-1588189408846-30ad4f1d5879?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Convection toaster oven with multiple cooking functions",
    category: "appliances",
    dailyPrice: 299,
    weeklyPrice: 1499,
    monthlyPrice: 4999
  },
  {
    id: 129,
    name: "Vacuum Cleaner",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Powerful bagless vacuum cleaner with HEPA filter",
    category: "appliances",
    dailyPrice: 499,
    weeklyPrice: 2499,
    monthlyPrice: 7999
  },
  
  // OUTDOOR CATEGORY (10+ items)
  {
    id: 11,
    name: "Camping Tent (4-Person)",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Waterproof tent with easy setup for outdoor adventures",
    category: "outdoor",
    dailyPrice: 799,
    weeklyPrice: 3999,
    monthlyPrice: 12999
  },
  {
    id: 12,
    name: "Mountain Bike",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "All-terrain mountain bike for trail riding and adventure",
    category: "outdoor",
    dailyPrice: 999,
    weeklyPrice: 4999,
    monthlyPrice: 16999
  },
  {
    id: 24,
    name: "Kayak",
    image: "https://images.unsplash.com/photo-1606908486799-0fd2a7281942?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Single-person kayak with paddle for water adventures",
    category: "outdoor",
    dailyPrice: 899,
    weeklyPrice: 4499,
    monthlyPrice: 14999
  },
  {
    id: 25,
    name: "Barbecue Grill",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80",
    description: "Portable barbecue grill for outdoor cooking and gatherings",
    category: "outdoor",
    dailyPrice: 699,
    weeklyPrice: 3499,
    monthlyPrice: 10999
  },
  {
    id: 130,
    name: "Fishing Gear Set",
    image: "https://images.unsplash.com/photo-1500829243541-74b677fecc30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1576&q=80",
    description: "Complete fishing gear set with rods, reels and tackle",
    category: "outdoor",
    dailyPrice: 599,
    weeklyPrice: 2999,
    monthlyPrice: 8999
  },
  {
    id: 131,
    name: "Paddleboard",
    image: "https://images.unsplash.com/photo-1626417040258-0c9a75f59a16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Inflatable stand-up paddleboard with paddle and accessories",
    category: "outdoor",
    dailyPrice: 749,
    weeklyPrice: 3999,
    monthlyPrice: 12999
  },
  {
    id: 132,
    name: "Hiking Backpack Set",
    image: "https://images.unsplash.com/photo-1561893836-adad5a482dc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Professional hiking backpack with camping accessories",
    category: "outdoor",
    dailyPrice: 499,
    weeklyPrice: 2499,
    monthlyPrice: 7999
  },
  {
    id: 133,
    name: "Golf Club Set",
    image: "https://images.unsplash.com/photo-1535131749006-b7d58e7ffdf8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Complete set of golf clubs with bag",
    category: "outdoor",
    dailyPrice: 1299,
    weeklyPrice: 6499,
    monthlyPrice: 19999
  },
  {
    id: 134,
    name: "Snowboard with Boots",
    image: "https://images.unsplash.com/photo-1612968753010-03643909f632?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Snowboard with bindings and boots for winter sports",
    category: "outdoor",
    dailyPrice: 1099,
    weeklyPrice: 5499,
    monthlyPrice: 16999
  },
  {
    id: 135,
    name: "Camping Cookware Set",
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Complete cookware set for camping and outdoor cooking",
    category: "outdoor",
    dailyPrice: 399,
    weeklyPrice: 1999,
    monthlyPrice: 5999
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize with sample data (in a real app, would fetch from API)
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      setProducts(sampleProducts);
      
      // Initialize selected category from URL if present
      const categoryParam = searchParams.get("category");
      if (categoryParam) {
        setSelectedCategories([categoryParam]);
      }
      
      setIsLoading(false);
    }, 500);
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
        <h1 className="text-3xl font-bold mb-8 animate-fade-in">Browse Products</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 space-y-6 animate-fade-in" style={{animationDelay: "0.2s"}}>
            <div className="bg-background p-4 rounded-md border hover:shadow-md transition-all duration-300">
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

            <div className="bg-background p-4 rounded-md border hover:shadow-md transition-all duration-300">
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
          <div className="flex-1 animate-fade-in" style={{animationDelay: "0.4s"}}>
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
            {isLoading ? (
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
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="animate-fade-in" 
                    style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted/30 rounded-lg animate-fade-in">
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
