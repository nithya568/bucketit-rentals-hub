
import Layout from "@/components/layout/Layout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus } from "lucide-react";

const PaymentMethods = () => {
  // No saved payment methods initially
  const savedPaymentMethods = [];

  return (
    <Layout>
      <DashboardLayout>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Payment Methods</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {savedPaymentMethods.length === 0 ? (
              <div className="text-center py-8">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
                  <CreditCard className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No payment methods saved</h3>
                <p className="text-muted-foreground mt-2 mb-4">
                  You haven't saved any payment methods yet.
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Payment Method
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* This would display saved payment methods if there were any */}
              </div>
            )}
          </CardContent>
        </Card>
      </DashboardLayout>
    </Layout>
  );
};

export default PaymentMethods;
