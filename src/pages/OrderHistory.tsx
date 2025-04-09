
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

interface Order {
  id: string;
  date: string;
  items: {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  status: "active" | "completed" | "cancelled";
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  
  useEffect(() => {
    // Load orders from localStorage if they exist
    const savedOrders = localStorage.getItem("bucketit_orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
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

  return (
    <Layout>
      <DashboardLayout>
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
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <div className="flex -space-x-2">
                          {order.items.map((item) => (
                            <img
                              key={item.id}
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-10 rounded-full border-2 border-background object-cover"
                              title={item.name}
                            />
                          ))}
                          {order.items.length > 0 && (
                            <span className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-background bg-muted text-xs font-medium">
                              {order.items.length} {order.items.length === 1 ? "item" : "items"}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(order.status)} capitalize`}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                          <Button variant="outline" size="sm">
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
      </DashboardLayout>
    </Layout>
  );
};

export default OrderHistory;
