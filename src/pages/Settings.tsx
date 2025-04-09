
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    darkMode: false,
  });

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting],
    });
  };

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <Layout>
      <DashboardLayout>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notifications</h3>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications about your rentals and account
                  </p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={() => handleSettingChange("emailNotifications")}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="smsNotifications">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive text messages about your rentals and account
                  </p>
                </div>
                <Switch
                  id="smsNotifications"
                  checked={settings.smsNotifications}
                  onCheckedChange={() => handleSettingChange("smsNotifications")}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketingEmails">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about special offers and promotions
                  </p>
                </div>
                <Switch
                  id="marketingEmails"
                  checked={settings.marketingEmails}
                  onCheckedChange={() => handleSettingChange("marketingEmails")}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Appearance</h3>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark theme
                  </p>
                </div>
                <Switch
                  id="darkMode"
                  checked={settings.darkMode}
                  onCheckedChange={() => handleSettingChange("darkMode")}
                />
              </div>
            </div>
            
            <Button onClick={handleSaveSettings} className="mt-4">
              Save Settings
            </Button>
          </CardContent>
        </Card>
      </DashboardLayout>
    </Layout>
  );
};

export default Settings;
