
import Layout from "@/components/layout/Layout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";

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
  // Sample order data
  const orders: Order[] = [
    {
      id: "ORD-2023-0001",
      date: "Apr 15, 2023",
      items: [
        {
          id: 1,
          name: "MacBook Pro 16\" M1 Pro",
          image: "https://placehold.co/600x400/2DD4BF/FFFFFF?text=MacBook+Pro",
          price: 149,
          quantity: 1
        }
      ],
      total: 149,
      status: "active"
    },
    {
      id: "ORD-2023-0002",
      date: "Mar 22, 2023",
      items: [
        {
          id: 2,
          name: "Sony A7 III Camera",
          image: "https://placehold.co/600x400/2DD4BF/FFFFFF?text=Sony+A7+III",
          price: 120,
          quantity: 1
        },
        {
          id: 4,
          name: "Power Drill Set",
          image: "https://placehold.co/600x400/2DD4BF/FFFFFF?text=Power+Drill+Set",
          price: 39,
          quantity: 1
        }
      ],
      total: 159,
      status: "completed"
    },
    {
      id: "ORD-2023-0003",
      date: "Feb 10, 2023",
      items: [
        {
          id: 3,
          name: "Modern Lounge Chair",
          image: "https://placehold.co/600x400/2DD4BF/FFFFFF?text=Lounge+Chair",
          price: 45,
          quantity: 2
        }
      ],
      total: 90,
      status: "cancelled"
    }
  ];

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
          </CardContent>
        </Card>
      </DashboardLayout>
    </Layout>
  );
};

export default OrderHistory;
