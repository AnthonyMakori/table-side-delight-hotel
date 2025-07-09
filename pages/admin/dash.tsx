import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Users, 
  Bed, 
  Menu as MenuIcon, 
  QrCode, 
  ShoppingCart,
  BarChart3,

} from "lucide-react";

const Admin = () => {

  function setIsLoggedIn(arg0: boolean): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-luxury-dark border-b border-border p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-luxury text-2xl font-bold text-foreground">
              Grand Haven Admin
            </h1>
            <p className="text-muted-foreground">Hotel Management Dashboard</p>
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => setIsLoggedIn(false)}
          >
            Sign Out
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-7 bg-luxury-medium mb-6">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="rooms" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Bed className="h-4 w-4 mr-2" />
              Rooms
            </TabsTrigger>
            <TabsTrigger value="menu" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <MenuIcon className="h-4 w-4 mr-2" />
              Menu
            </TabsTrigger>
            <TabsTrigger value="qr" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <QrCode className="h-4 w-4 mr-2" />
              QR Codes
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="staff" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Users className="h-4 w-4 mr-2" />
              Staff
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Occupancy Rate</p>
                      <p className="text-2xl font-bold text-primary">87%</p>
                    </div>
                    <Bed className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Active Orders</p>
                      <p className="text-2xl font-bold text-primary">12</p>
                    </div>
                    <ShoppingCart className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Revenue Today</p>
                      <p className="text-2xl font-bold text-primary">$15,420</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Staff Online</p>
                      <p className="text-2xl font-bold text-primary">8</p>
                    </div>
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-foreground">New order from Table 5</span>
                    <span className="text-muted-foreground text-sm">2 min ago</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-foreground">Room 204 checked out</span>
                    <span className="text-muted-foreground text-sm">15 min ago</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-foreground">New reservation for Executive Suite</span>
                    <span className="text-muted-foreground text-sm">1 hour ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* QR Codes Tab */}
          <TabsContent value="qr" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">QR Code Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(tableNum => (
                    <Card key={tableNum} className="bg-luxury-medium border-border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-foreground">Table {tableNum}</h4>
                          <p className="text-sm text-muted-foreground">
                            Menu QR Code
                          </p>
                        </div>
                        <div className="w-16 h-16 bg-foreground rounded flex items-center justify-center">
                          <QrCode className="h-10 w-10 text-background" />
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => {
                            const url = `${window.location.origin}/menu?table=${tableNum}`;
                            window.open(url, '_blank');
                          }}
                        >
                          Test QR Code
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full">
                          Download QR
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other tabs would be implemented similarly */}
          <TabsContent value="rooms">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Room Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Room management features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="menu">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Menu Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Menu management features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Order Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Order management features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="staff">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Staff Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Staff management features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Settings features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;