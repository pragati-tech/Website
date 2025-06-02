import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { Order } from "../types";

const mockOrders: Order[] = [
  {
    id: "order-1",
    userId: "user-1",
    items: [],
    status: "shipped",
    total: 599.99,
    createdAt: new Date(),
    updatedAt: new Date(),
    address: "123 Gaming St, Console City, CC 12345",
    riderId: "rider-1",
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
];

const Rider = () => {
  const { user, isRider } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setOrders(mockOrders);
  }, []);

  useEffect(() => {
    if (!user || !isRider) {
      toast.error("You don't have permission to access the rider panel");
    }
  }, [user, isRider]);

  const updateOrderStatus = (orderId: string, status: "delivered" | "undelivered") => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status, updatedAt: new Date() } : order
      )
    );
    setIsModalOpen(false);
    setSelectedOrder(null);
    toast.success(`Order ${orderId} marked as ${status}`);
  };

  if (!user || !isRider) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Rider Dashboard</h1>

      <div className="gaming-card p-6">
        <h2 className="text-xl font-bold text-white mb-6">Your Assigned Deliveries</h2>

        {orders.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No orders assigned to you yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border border-gray-700 rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-white font-medium">Order #{order.id}</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                      }).format(new Date(order.createdAt))}
                    </p>
                  </div>

                  <div className="mt-4 md:mt-0">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                      order.status === 'paid' ? 'bg-blue-600' :
                      order.status === 'shipped' ? 'bg-amber-600' :
                      order.status === 'delivered' ? 'bg-green-600' :
                      order.status === 'undelivered' ? 'bg-red-600' :
                      'bg-gray-600'
                    } text-white`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 border-t border-gray-700 pt-4">
                  <p className="text-gray-300">
                    <span className="text-gray-400">Delivery Address:</span><br />
                    {order.address}
                  </p>
                  <p className="text-gray-300 mt-2">
                    <span className="text-gray-400">Order Total:</span> ${order.total.toFixed(2)}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button
                    type="button"
                    className="bg-gaming-purple hover:bg-gaming-purple/90"
                    onClick={() => {
                      setSelectedOrder(order);
                      setIsModalOpen(true);
                    }}
                  >
                    Update Status
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="border-gaming-purple text-gaming-purple hover:bg-gaming-purple/10"
                    onClick={() => toast.info(`View details for order ${order.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status Update Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="gaming-card p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Update Order Status</h3>
            <p className="text-gray-300 mb-6">
              Please confirm the delivery status for order #{selectedOrder.id}
            </p>

            <div className="flex flex-col gap-3">
              <Button
                type="button"
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => updateOrderStatus(selectedOrder.id, "delivered")}
              >
                Mark as Delivered
              </Button>

              <Button
                type="button"
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => updateOrderStatus(selectedOrder.id, "undelivered")}
              >
                Mark as Undelivered
              </Button>

              <Button
                type="button"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedOrder(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rider;
