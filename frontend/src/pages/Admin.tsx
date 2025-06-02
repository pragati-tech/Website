import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "../components/ui/tabs";
import { Order, Rider } from "@/types";

// Mock data
const mockOrders: Order[] = [
  {
    id: "order-1",
    userId: "user-1",
    items: [],
    status: "paid",
    total: 599.99,
    createdAt: new Date(),
    updatedAt: new Date(),
    address: "123 Gaming St, Console City, CC 12345",
  },
  {
    id: "order-2",
    userId: "user-2",
    items: [],
    status: "shipped",
    total: 349.98,
    createdAt: new Date(),
    updatedAt: new Date(),
    address: "456 Player Ave, Gamepad Town, GT 67890",
    riderId: "rider-1",
  },
  {
    id: "order-3",
    userId: "user-3",
    items: [],
    status: "delivered",
    total: 179.99,
    createdAt: new Date(),
    updatedAt: new Date(),
    address: "789 Console Rd, Controller Village, CV 13579",
    riderId: "rider-2",
  },
];

const mockRiders: Rider[] = [
  {
    id: "rider-1",
    name: "John Rider",
    email: "john@example.com",
    phone: "555-123-4567",
    orders: [],
  },
  {
    id: "rider-2",
    name: "Sarah Delivery",
    email: "sarah@example.com",
    phone: "555-987-6543",
    orders: [],
  },
];

const Admin = () => {
  const { user, isAdmin } = useUser();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [riders, setRiders] = useState<Rider[]>(mockRiders);
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    // Fetch orders and riders - in real app, this would be from Supabase
    setOrders(mockOrders);
    setRiders(mockRiders);
  }, []);

  const updateOrderStatus = (orderId: string, status: "paid" | "shipped" | "delivered" | "undelivered") => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status, updatedAt: new Date() } : order
      )
    );

    toast.success(`Order ${orderId} status updated to ${status}`);
  };

  const assignRider = (orderId: string, riderId: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, riderId, updatedAt: new Date() } : order
      )
    );

    const rider = riders.find(r => r.id === riderId);
    toast.success(`Assigned ${rider?.name || "rider"} to order ${orderId}`);
  };

  // Redirect non-admin users
  if (!user || !isAdmin) {
    toast.error("You don't have permission to access the admin panel");
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full max-w-md mb-8">
          <TabsTrigger value="orders" className="data-[state=active]:bg-gaming-purple">Orders</TabsTrigger>
          <TabsTrigger value="riders" className="data-[state=active]:bg-gaming-purple">Riders</TabsTrigger>
        </TabsList>

        {/* Orders Tab Content */}
        <TabsContent value="orders" className="space-y-6">
          <div className="gaming-card p-6">
            <h2 className="text-xl font-bold text-white mb-4">All Orders</h2>

            {orders.length === 0 ? (
              <p className="text-gray-400">No orders found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="text-left border-b border-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-gray-300">Order ID</th>
                      <th className="px-4 py-3 text-gray-300">Date</th>
                      <th className="px-4 py-3 text-gray-300">Status</th>
                      <th className="px-4 py-3 text-gray-300">Total</th>
                      <th className="px-4 py-3 text-gray-300">Rider</th>
                      <th className="px-4 py-3 text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {orders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-800">
                        <td className="px-4 py-4 text-white">{order.id}</td>
                        <td className="px-4 py-4 text-gray-300">
                          {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          }).format(new Date(order.createdAt))}
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                            order.status === 'paid' ? 'bg-blue-600 text-white' :
                            order.status === 'shipped' ? 'bg-amber-600 text-white' :
                            order.status === 'delivered' ? 'bg-green-600 text-white' :
                            order.status === 'undelivered' ? 'bg-red-600 text-white' :
                            'bg-gray-600 text-white'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-gray-300">${order.total.toFixed(2)}</td>
                        <td className="px-4 py-4 text-gray-300">
                          {order.riderId ? riders.find(r => r.id === order.riderId)?.name || 'Unknown' : 'Not assigned'}
                        </td>
                        <td className="px-4 py-4 space-y-2">
                          {order.status === 'paid' && (
                            <>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="mr-2 border-gaming-purple text-gaming-purple hover:bg-gaming-purple/10"
                                onClick={() => updateOrderStatus(order.id, 'shipped')}
                              >
                                Mark as Shipped
                              </Button>
                              <div className="mt-2">
                                <Select onValueChange={(value) => assignRider(order.id, value)}>
                                  <SelectTrigger className="bg-gaming-card border-gaming-purple/30 text-gray-300 w-full">
                                    <SelectValue placeholder="Assign Rider" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-gaming-dark border-gaming-purple/30">
                                    <SelectGroup>
                                      {riders.map(rider => (
                                        <SelectItem key={rider.id} value={rider.id} className="text-gray-300">
                                          {rider.name}
                                        </SelectItem>
                                      ))}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </div>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Riders Tab Content */}
        <TabsContent value="riders" className="space-y-6">
          <div className="gaming-card p-6">
            <h2 className="text-xl font-bold text-white mb-4">Riders</h2>

            {riders.length === 0 ? (
              <p className="text-gray-400">No riders found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="text-left border-b border-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-gray-300">ID</th>
                      <th className="px-4 py-3 text-gray-300">Name</th>
                      <th className="px-4 py-3 text-gray-300">Email</th>
                      <th className="px-4 py-3 text-gray-300">Phone</th>
                      <th className="px-4 py-3 text-gray-300">Active Orders</th>
                      <th className="px-4 py-3 text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {riders.map(rider => {
                      const activeOrders = orders.filter(o => o.riderId === rider.id && o.status === 'shipped');
                      
                      return (
                        <tr key={rider.id} className="hover:bg-gray-800">
                          <td className="px-4 py-4 text-white">{rider.id}</td>
                          <td className="px-4 py-4 text-gray-300">{rider.name}</td>
                          <td className="px-4 py-4 text-gray-300">{rider.email}</td>
                          <td className="px-4 py-4 text-gray-300">{rider.phone}</td>
                          <td className="px-4 py-4 text-gray-300">{activeOrders.length}</td>
                          <td className="px-4 py-4">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-gaming-purple text-gaming-purple hover:bg-gaming-purple/10"
                              onClick={() => {
                                toast.info(`Viewing details for ${rider.name}`);
                              }}
                            >
                              View Details
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
