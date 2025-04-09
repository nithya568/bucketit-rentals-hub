
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus, Trash } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const PaymentMethods = () => {
  // State for saved payment methods
  const [savedPaymentMethods, setSavedPaymentMethods] = useState(() => {
    const saved = localStorage.getItem("payment_methods");
    return saved ? JSON.parse(saved) : [];
  });
  
  // State for showing add payment form
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Setup form
  const form = useForm({
    defaultValues: {
      cardHolder: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
    }
  });
  
  const handleAddPaymentMethod = (data) => {
    // Create a new payment method object
    const newPaymentMethod = {
      id: Date.now().toString(),
      cardHolder: data.cardHolder,
      cardNumber: data.cardNumber.replace(/\d(?=\d{4})/g, "*"),
      expiryMonth: data.expiryMonth,
      expiryYear: data.expiryYear,
      type: getCardType(data.cardNumber)
    };
    
    // Add to state and localStorage
    const updatedMethods = [...savedPaymentMethods, newPaymentMethod];
    setSavedPaymentMethods(updatedMethods);
    localStorage.setItem("payment_methods", JSON.stringify(updatedMethods));
    
    // Reset form and hide it
    form.reset();
    setShowAddForm(false);
    
    toast.success("Payment method added successfully!");
  };
  
  const handleDeletePaymentMethod = (id) => {
    const updatedMethods = savedPaymentMethods.filter(method => method.id !== id);
    setSavedPaymentMethods(updatedMethods);
    localStorage.setItem("payment_methods", JSON.stringify(updatedMethods));
    toast.success("Payment method removed");
  };
  
  // Simple function to determine card type based on first digit
  const getCardType = (cardNumber) => {
    const firstDigit = cardNumber.charAt(0);
    if (firstDigit === "4") return "Visa";
    if (firstDigit === "5") return "Mastercard";
    if (firstDigit === "3") return "Amex";
    if (firstDigit === "6") return "Discover";
    return "Credit Card";
  };

  return (
    <Layout>
      <DashboardLayout>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Payment Methods</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {savedPaymentMethods.length === 0 && !showAddForm ? (
              <div className="text-center py-8">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
                  <CreditCard className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No payment methods saved</h3>
                <p className="text-muted-foreground mt-2 mb-4">
                  You haven't saved any payment methods yet.
                </p>
                <Button onClick={() => setShowAddForm(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Payment Method
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* List of saved payment methods */}
                {savedPaymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-muted p-2 rounded-md mr-4">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{method.type}</p>
                        <p className="text-sm text-muted-foreground">
                          {method.cardNumber} • Expires {method.expiryMonth}/{method.expiryYear}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeletePaymentMethod(method.id)}
                    >
                      <Trash className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                ))}
                
                {/* Add Payment Method Form */}
                {showAddForm && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="text-xl">Add Payment Method</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleAddPaymentMethod)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="cardHolder"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Cardholder Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" required {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Card Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="1234 5678 9012 3456" required {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-3 gap-4">
                            <FormField
                              control={form.control}
                              name="expiryMonth"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Month</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="MM" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {Array.from({ length: 12 }, (_, i) => {
                                        const month = (i + 1).toString().padStart(2, '0');
                                        return (
                                          <SelectItem key={month} value={month}>
                                            {month}
                                          </SelectItem>
                                        );
                                      })}
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="expiryYear"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Year</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="YY" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {Array.from({ length: 10 }, (_, i) => {
                                        const year = (new Date().getFullYear() + i).toString().slice(-2);
                                        return (
                                          <SelectItem key={year} value={year}>
                                            {year}
                                          </SelectItem>
                                        );
                                      })}
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="cvv"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>CVV</FormLabel>
                                  <FormControl>
                                    <Input placeholder="123" required {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="flex justify-end space-x-2 pt-4">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => setShowAddForm(false)}
                            >
                              Cancel
                            </Button>
                            <Button type="submit">Save Card</Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                )}
                
                {/* Show Add Button if we're displaying saved cards but not the form */}
                {savedPaymentMethods.length > 0 && !showAddForm && (
                  <Button onClick={() => setShowAddForm(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Payment Method
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </DashboardLayout>
    </Layout>
  );
};

export default PaymentMethods;
