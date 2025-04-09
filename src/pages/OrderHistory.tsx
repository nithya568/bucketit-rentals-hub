
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download, ShoppingCart, ArrowLeft, Printer } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";

interface Order {
  id: string;
  date: string;
  items: {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
    duration: string;
  }[];
  total: number;
  status: "active" | "completed" | "cancelled";
  currency?: string;
}

interface OrderViewProps {
  order: Order;
}

const OrderView = ({ order }: OrderViewProps) => {
  const currency = order.currency || "₹";
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium">Order Details</h3>
          <p className="text-sm text-muted-foreground">Order ID: {order.id}</p>
          <p className="text-sm text-muted-foreground">Date: {formatDate(order.date)}</p>
        </div>
        <Badge className={`${getStatusColor(order.status)} capitalize`}>
          {order.status}
        </Badge>
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{currency}{item.price.toFixed(2)}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.duration}</TableCell>
                <TableCell className="text-right">{currency}{(item.price * item.quantity).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="bg-muted/30 rounded-md p-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{currency}{(order.total * 0.82).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>GST (18%)</span>
            <span>{currency}{(order.total * 0.18).toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-2 font-medium">
            <span>Total</span>
            <span>{currency}{order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Receipt component for printing
const OrderReceipt = ({ order }: OrderViewProps) => {
  const currency = order.currency || "₹";
  
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">BucketIt Receipt</h2>
        <p className="text-sm text-muted-foreground">love it..rent it</p>
      </div>
      
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm">Order ID: <strong>{order.id}</strong></p>
          <p className="text-sm">Date: <strong>{formatDate(order.date)}</strong></p>
        </div>
        <Badge className={`${getStatusColor(order.status)} capitalize`}>
          {order.status}
        </Badge>
      </div>
      
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Item</th>
            <th className="text-right py-2">Price</th>
            <th className="text-right py-2">Qty</th>
            <th className="text-right py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="py-2">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.duration}</p>
                </div>
              </td>
              <td className="text-right py-2">{currency}{item.price.toFixed(2)}</td>
              <td className="text-right py-2">{item.quantity}</td>
              <td className="text-right py-2">{currency}{(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="mt-4 border-t pt-2">
        <div className="flex justify-between py-1">
          <span>Subtotal</span>
          <span>{currency}{(order.total * 0.82).toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-1">
          <span>GST (18%)</span>
          <span>{currency}{(order.total * 0.18).toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-1 font-bold border-t mt-2 pt-2">
          <span>Total</span>
          <span>{currency}{order.total.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm">Thank you for renting with BucketIt!</p>
        <p className="text-xs text-muted-foreground">© 2025 BucketIt. All rights reserved.</p>
      </div>
      
      <div className="print:hidden mt-6 flex justify-end">
        <Button onClick={handlePrint} className="flex items-center">
          <Printer className="mr-2 h-4 w-4" /> Print Receipt
        </Button>
      </div>
    </div>
  );
};

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [viewType, setViewType] = useState<"list" | "detail" | "receipt">("list");
  
  useEffect(() => {
    // Load orders from localStorage if they exist
    const savedOrders = localStorage.getItem("bucketit_orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
    
    // Listen for storage events to update orders when they change
    const handleStorageChange = () => {
      const updatedOrders = JSON.parse(localStorage.getItem("bucketit_orders") || "[]");
      setOrders(updatedOrders);
    };
    
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("bucketit_storage_update", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("bucketit_storage_update", handleStorageChange);
    };
  }, []);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "completed":
        return "bg-primary/10 text-primary border-primary/20";
      case "cancelled":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "";
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setViewType("detail");
  };
  
  const handleViewReceipt = (order: Order) => {
    setSelectedOrder(order);
    setViewType("receipt");
  };
  
  const handleBack = () => {
    setViewType("list");
    setSelectedOrder(null);
  };

  const renderContent = () => {
    if (viewType === "detail" && selectedOrder) {
      return (
        <Card>
          <CardHeader className="flex flex-row items-center">
            <Button variant="ghost" size="icon" onClick={handleBack} className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-2xl">Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <OrderView order={selectedOrder} />
          </CardContent>
        </Card>
      );
    }
    
    if (viewType === "receipt" && selectedOrder) {
      return (
        <Card>
          <CardHeader className="flex flex-row items-center">
            <Button variant="ghost" size="icon" onClick={handleBack} className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-2xl">Order Receipt</CardTitle>
          </CardHeader>
          <CardContent>
            <OrderReceipt order={selectedOrder} />
          </CardContent>
        </Card>
      );
    }
    
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Order History</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="text-center py-8">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
                <ShoppingCart className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No orders yet</h3>
              <p className="text-muted-foreground mt-2 mb-4">
                You haven't placed any orders yet. Browse our products and start renting!
              </p>
              <Link to="/products">
                <Button>
                  Browse Products
                </Button>
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{formatDate(order.date)}</TableCell>
                    <TableCell>
                      <div className="flex -space-x-2">
                        {order.items.slice(0, 3).map((item) => (
                          <img
                            key={item.id}
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 rounded-full border-2 border-background object-cover"
                            title={item.name}
                          />
                        ))}
                        {order.items.length > 3 && (
                          <span className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-background bg-muted text-xs font-medium">
                            +{order.items.length - 3}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{order.currency || "₹"}{order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(order.status)} capitalize`}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewOrder(order)}>
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleViewReceipt(order)}>
                          <Download className="h-4 w-4 mr-1" /> Receipt
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <Layout>
      <DashboardLayout>
        {renderContent()}
      </DashboardLayout>
    </Layout>
  );
};

export default OrderHistory;
