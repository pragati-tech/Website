import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { Button } from "../components/ui/button";
import { Trash2, ShoppingBag, ArrowRight, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const handleCheckout = () => {
    if (!user) {
      toast.error("Please sign in to checkout");
      navigate("/login", { state: { from: "/cart" } });
      return;
    }
    
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      toast.success("Order placed successfully!");
      clearCart();
      navigate("/orders");
      setIsCheckingOut(false);
    }, 1500);
  };

  // Ensure that items are not empty before rendering
  if (items.length === 0) {
    return (
      <div className="bg-gaming-dark mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingCart className="mx-auto h-16 w-16 text-gray-600 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
          <p className="text-gray-400 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/products">
            <Button className="bg-gaming-purple hover:bg-gaming-purple/90">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gaming-dark mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.variant.id} className="gaming-card p-4 md:p-6">
              <div className="flex flex-col md:flex-row">
                {/* Product Image */}
                <div className="w-full md:w-32 h-32 flex-shrink-0 mb-4 md:mb-0">
                  <img
                    src={item.variant?.imageUrl || item.product?.imageUrl || "/placeholder.svg"}
                    alt={item.product?.name || "Product"}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* Product Details */}
                <div className="md:ml-6 flex-grow">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {item.product?.name || "Unknown Product"}
                      </h3>
                      <div className="text-sm text-gray-400 mt-1">
                        <span>Color: {item.variant?.color || "N/A"}</span>
                        <span className="mx-2">|</span>
                        <span>Size: {item.variant?.size || "N/A"}</span>
                      </div>
                      <div className="mt-1 text-gaming-purple font-medium">
                        ${(item.variant?.price || item.product?.price || 0).toFixed(2)}
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 flex items-center">
                      {/* Quantity */}
                      <div className="flex items-center mr-6">
                        <button
                          className="text-gray-400 hover:text-white w-8 h-8 flex items-center justify-center border border-gray-700 rounded-l-md"
                          onClick={() => updateQuantity(item.variant.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="w-10 text-center text-gray-300 border-t border-b border-gray-700 h-8 flex items-center justify-center">
                          {item.quantity}
                        </span>
                        <button
                          className="text-gray-400 hover:text-white w-8 h-8 flex items-center justify-center border border-gray-700 rounded-r-md"
                          onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                          disabled={item.quantity >= item.variant.stock}
                        >
                          +
                        </button>
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        onClick={() => removeFromCart(item.variant.id)}
                        title="Remove item"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Subtotal for mobile */}
                  <div className="mt-4 md:hidden text-right">
                    <div className="text-sm text-gray-400">
                      Subtotal:
                    </div>
                    <div className="text-white font-medium">
                      ${((item.variant?.price || item.product?.price || 0) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                  
                  {/* Stock warning */}
                  {item.variant?.stock < 5 && (
                    <div className="mt-2 text-amber-400 text-sm">
                      Only {item.variant?.stock} left in stock
                    </div>
                  )}
                </div>
                
                {/* Subtotal for desktop */}
                <div className="hidden md:flex flex-col items-end ml-6 text-right min-w-[100px]">
                  <div className="text-sm text-gray-400">
                    Subtotal:
                  </div>
                  <div className="text-white font-medium">
                    ${((item.variant?.price || item.product?.price || 0) * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Continue Shopping */}
          <div className="mt-6">
            <Link to="/products">
              <Button variant="outline" className="border-gaming-purple text-gaming-purple">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="gaming-card p-6 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal ({totalItems} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t border-gray-700 pt-3 flex justify-between font-bold text-white">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <Button
              className="w-full bg-gaming-purple hover:bg-gaming-purple/90"
              size="lg"
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/50 border-t-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                <>
                  Checkout <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
            
            {!user && (
              <div className="mt-4 text-sm text-gray-400 text-center">
                You'll need to <Link to="/login" className="text-gaming-purple hover:underline">sign in</Link> to complete checkout
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
