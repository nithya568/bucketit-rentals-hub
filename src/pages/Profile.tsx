
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Camera, Save } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    createdAt: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: ""
  });
  
  // Load user data on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("bucketit_user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData({
        fullName: parsedUser.fullName || "",
        email: parsedUser.email || "",
        createdAt: parsedUser.createdAt || new Date().toISOString(),
        phone: parsedUser.phone || "",
        address: parsedUser.address || "",
        city: parsedUser.city || "",
        state: parsedUser.state || "",
        zip: parsedUser.zip || ""
      });
    } else {
      // Redirect to login if no user is found
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSaveChanges = () => {
    // Save updated user data to localStorage
    localStorage.setItem("bucketit_user", JSON.stringify(userData));
    
    // Also update the user in the users array
    const existingUsers = JSON.parse(localStorage.getItem("bucketit_users") || "[]");
    const updatedUsers = existingUsers.map((user: any) => 
      user.email === userData.email ? { ...user, ...userData } : user
    );
    localStorage.setItem("bucketit_users", JSON.stringify(updatedUsers));
    
    setIsEditing(false);
    toast.success("Profile updated successfully");
    
    // Dispatch storage update event to notify other components
    window.dispatchEvent(new Event("bucketit_storage_update"));
  };

  // Format the join date
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString(undefined, options);
  };

  const joinDate = formatDate(userData.createdAt);

  return (
    <Layout>
      <DashboardLayout>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">My Profile</CardTitle>
            <CardDescription>
              Manage your personal information and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="personal">Personal Information</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>
              
              {/* Personal Information Tab */}
              <TabsContent value="personal" className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <div className="bg-primary text-primary-foreground h-full w-full flex items-center justify-center text-xl font-medium">
                          {userData.fullName?.charAt(0) || "U"}
                        </div>
                      </Avatar>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">
                        {userData.fullName || "User"}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Member since {joinDate}
                      </p>
                      <Badge className="mt-2">Premium Member</Badge>
                    </div>
                  </div>
                  
                  <Button 
                    variant={isEditing ? "default" : "outline"} 
                    onClick={() => isEditing ? handleSaveChanges() : setIsEditing(true)}
                  >
                    {isEditing ? (
                      <>
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                      </>
                    ) : (
                      "Edit Profile"
                    )}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input 
                        id="fullName" 
                        name="fullName"
                        value={userData.fullName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email" 
                        value={userData.email}
                        onChange={handleInputChange}
                        disabled={true} // Email cannot be changed
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone" 
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input 
                        id="address" 
                        name="address"
                        value={userData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city" 
                        name="city"
                        value={userData.city}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input 
                          id="state" 
                          name="state"
                          value={userData.state}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input 
                          id="zip" 
                          name="zip"
                          value={userData.zip}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Preferences Tab */}
              <TabsContent value="preferences" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Preferences</h3>
                  <div className="space-y-4">
                    {/* Notification settings would go here */}
                    <p className="text-muted-foreground">
                      Choose how you'd like to receive notifications about your rentals, 
                      special offers, and account updates.
                    </p>
                    
                    {/* Placeholder for notification settings */}
                    <Card className="bg-muted/30">
                      <CardContent className="p-4">
                        <p>Notification settings would go here</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Privacy Settings</h3>
                  <div className="space-y-4">
                    {/* Privacy settings would go here */}
                    <p className="text-muted-foreground">
                      Control your privacy settings and manage how your information is used.
                    </p>
                    
                    {/* Placeholder for privacy settings */}
                    <Card className="bg-muted/30">
                      <CardContent className="p-4">
                        <p>Privacy settings would go here</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </DashboardLayout>
    </Layout>
  );
};

export default Profile;
