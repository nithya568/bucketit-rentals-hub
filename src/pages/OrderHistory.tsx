
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { IndianRupee, Download, FileText } from "lucide-react";

// Helper functions - moved to the top level and properly exported
export const formatDate = (dateString: string) => {
  return format(new Date(dateString), "MMM dd, yyyy");
};

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "bg-green-500 hover:bg-green-600";
    case "in transit":
      return "bg-blue-500 hover:bg-blue-600";
    case "processing":
      return "bg-yellow-500 hover:bg-yellow-600";
    case "cancelled":
      return "bg-red-500 hover:bg-red-600";
    case "returned":
      return "bg-purple-500 hover:bg-purple-600";
    default:
      return "bg-gray-500 hover:bg-gray-600";
  }
};

// Sample order data
const sampleOrders = [
  {
    id: "ORD123456",
    date: "2023-04-01T10:30:00Z",
    status: "Delivered",
    total: 8999,
    items: [
      {
        id: 1,
        name: "MacBook Pro 16\" M1 Pro",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80",
        price: 4999,
        duration: "weekly",
        quantity: 1
      },
      {
        id: 4,
        name: "Power Drill Set",
        image: "https://images.unsplash.com/photo-1563754357749-4a981a6ef2cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        price: 2999,
        duration: "monthly",
        quantity: 1
      },
      {
        id: 7,
        name: "Professional DSLR Camera",
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        price: 1999,
        duration: "weekly",
        quantity: 1
      }
    ],
    shippingAddress: {
      name: "Rahul Sharma",
      street: "123 MG Road",
      city: "Bangalore",
      state: "Karnataka",
      zip: "560001",
      country: "India"
    },
    paymentMethod: "UPI - rahul@okicici"
  },
  {
    id: "ORD789012",
    date: "2023-03-15T14:20:00Z",
    status: "Delivered",
    total: 7599,
    items: [
      {
        id: 12,
        name: "Mountain Bike",
        image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        price: 4999,
        duration: "monthly",
        quantity: 1
      },
      {
        id: 11,
        name: "Camping Tent (4-Person)",
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        price: 2599,
        duration: "weekly",
        quantity: 1
      }
    ],
    shippingAddress: {
      name: "Rahul Sharma",
      street: "123 MG Road",
      city: "Bangalore",
      state: "Karnataka",
      zip: "560001",
      country: "India"
    },
    paymentMethod: "Credit Card (ending in 4242)"
  },
  {
    id: "ORD345678",
    date: "2023-02-28T09:15:00Z",
    status: "Returned",
    total: 3499,
    items: [
      {
        id: 9,
        name: "Professional Blender",
        image: "https://images.unsplash.com/photo-1619070543343-58d3e1c85a4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
        price: 3499,
        duration: "monthly",
        quantity: 1
      }
    ],
    shippingAddress: {
      name: "Rahul Sharma",
      street: "123 MG Road",
      city: "Bangalore",
      state: "Karnataka",
      zip: "560001",
      country: "India"
    },
    paymentMethod: "UPI - rahul@okicici"
  }
];

const OrderHistory = () => {
  const [orders] = useState(sampleOrders);
  const [selectedOrder, setSelectedOrder] = useState<typeof sampleOrders[0] | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const viewOrderDetails = (order: typeof sampleOrders[0]) => {
    setSelectedOrder(order);
  };

  const viewReceipt = (order: typeof sampleOrders[0]) => {
    setSelectedOrder(order);
    setShowReceiptModal(true);
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Order History</h1>

        {orders.length > 0 ? (
          <div className="bg-background rounded-lg border shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
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
                      <div className="flex items-center">
                        <IndianRupee className="h-3 w-3 mr-1" />
                        {order.total.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => viewOrderDetails(order)}
                        >
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => viewReceipt(order)}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Receipt
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <h3 className="text-xl font-medium mb-2">No orders yet</h3>
            <p className="text-muted-foreground mb-6">
              You haven't placed any orders yet
            </p>
            <Button asChild>
              <a href="/products">Browse Products</a>
            </Button>
          </div>
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <Dialog open={!!selectedOrder && !showReceiptModal} onOpenChange={(open) => !open && setSelectedOrder(null)}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Order Details - {selectedOrder.id}</DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Order Date</p>
                    <p>{formatDate(selectedOrder.date)}</p>
                  </div>
                  <Badge className={getStatusColor(selectedOrder.status)}>{selectedOrder.status}</Badge>
                </div>

                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead className="text-right">Subtotal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-12 h-12 object-cover rounded-md"
                              />
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <IndianRupee className="h-3 w-3 mr-1" />
                              {item.price.toLocaleString()}
                            </div>
                          </TableCell>
                          <TableCell className="capitalize">{item.duration}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end">
                              <IndianRupee className="h-3 w-3 mr-1" />
                              {(item.price * item.quantity).toLocaleString()}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-between border-t pt-4">
                  <div className="w-1/2">
                    <h4 className="font-semibold mb-2">Shipping Address</h4>
                    <p>{selectedOrder.shippingAddress.name}</p>
                    <p>{selectedOrder.shippingAddress.street}</p>
                    <p>
                      {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zip}
                    </p>
                    <p>{selectedOrder.shippingAddress.country}</p>
                  </div>
                  <div className="w-1/2">
                    <h4 className="font-semibold mb-2">Payment Information</h4>
                    <p>Method: {selectedOrder.paymentMethod}</p>
                    <div className="mt-4">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <div className="flex items-center">
                          <IndianRupee className="h-3 w-3 mr-1" />
                          {selectedOrder.total.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex justify-between font-semibold text-lg mt-2">
                        <span>Total:</span>
                        <div className="flex items-center">
                          <IndianRupee className="h-4 w-4 mr-1" />
                          {selectedOrder.total.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => viewReceipt(selectedOrder)}>
                  <FileText className="h-4 w-4 mr-2" />
                  View Receipt
                </Button>
                <Button onClick={() => setSelectedOrder(null)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Receipt Modal */}
        {selectedOrder && (
          <Dialog open={showReceiptModal} onOpenChange={(open) => !open && setShowReceiptModal(false)}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Receipt - {selectedOrder.id}</DialogTitle>
              </DialogHeader>

              <div className="space-y-6 bg-white text-black p-6 rounded-md">
                <div className="text-center border-b pb-4">
                  <h3 className="text-xl font-bold">BucketIt Rentals</h3>
                  <p className="text-sm">123 Rental Street, Bangalore, India</p>
                  <p className="text-sm">contact@bucketit.com | +91 9876543210</p>
                </div>

                <div className="flex justify-between text-sm">
                  <div>
                    <p><strong>Order ID:</strong> {selectedOrder.id}</p>
                    <p><strong>Date:</strong> {formatDate(selectedOrder.date)}</p>
                  </div>
                  <div>
                    <p><strong>Status:</strong> {selectedOrder.status}</p>
                  </div>
                </div>

                <div className="border-t border-b py-4">
                  <p className="font-semibold mb-2">Items Rented:</p>
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm mb-2">
                      <span>{item.quantity}x {item.name} ({item.duration})</span>
                      <div className="flex items-center">
                        <IndianRupee className="h-3 w-3 mr-1" />
                        {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between font-semibold">
                  <span>Total Amount:</span>
                  <div className="flex items-center">
                    <IndianRupee className="h-3 w-3 mr-1" />
                    {selectedOrder.total.toLocaleString()}
                  </div>
                </div>

                <div className="text-sm text-center border-t pt-4">
                  <p>Thank you for choosing BucketIt Rentals!</p>
                  <p>For support, contact us at support@bucketit.com</p>
                  <p>GST: 29AABCU9603R1ZX</p>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Receipt
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </Layout>
  );
};

export default OrderHistory;
