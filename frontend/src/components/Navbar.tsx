import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { Button } from '../components/ui/button';
import { ShoppingCart, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { totalItems } = useCart();
  const { user, logout, isAdmin, isRider } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  console.log(user, isAdmin, isRider); // Debug

  return (
    <nav className="bg-gaming-dark shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gaming-purple">
              Gaming<span className="text-gaming-blue">Cart</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/home" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-300 hover:text-white transition-colors">
              Products
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-gray-300 hover:text-white transition-colors">
                Admin
              </Link>
            )}
            {isRider && (
              <Link to="/rider" className="text-gray-300 hover:text-white transition-colors">
                Deliveries
              </Link>
            )}
          </div>

          {/* Right Side Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gaming-purple text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <Button variant="ghost" className="text-gray-300 hover:text-white flex items-center">
                  <User className="h-5 w-5" />
                  <span className="ml-2">{user.name}</span>
                </Button>
                <div className="absolute right-0 w-48 mt-2 py-2 bg-gaming-card rounded-md shadow-xl hidden group-hover:block">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gaming-purple hover:text-white">
                    Profile
                  </Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gaming-purple hover:text-white">
                    My Orders
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gaming-purple hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" className="border-gaming-purple text-gaming-purple hover:bg-gaming-purple hover:text-white transition-colors">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-300">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden mt-4 py-2 space-y-2 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <Link to="/" className="block px-4 py-2 text-base font-medium text-gray-300 hover:bg-gaming-purple hover:text-white rounded-md" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link to="/products" className="block px-4 py-2 text-base font-medium text-gray-300 hover:bg-gaming-purple hover:text-white rounded-md" onClick={() => setMobileMenuOpen(false)}>
            Products
          </Link>
          <Link to="/cart" className="block px-4 py-2 text-base font-medium text-gray-300 hover:bg-gaming-purple hover:text-white rounded-md" onClick={() => setMobileMenuOpen(false)}>
            Cart {totalItems > 0 && `(${totalItems})`}
          </Link>

          {isAdmin && (
            <Link to="/admin" className="block px-4 py-2 text-base font-medium text-gray-300 hover:bg-gaming-purple hover:text-white rounded-md" onClick={() => setMobileMenuOpen(false)}>
              Admin Dashboard
            </Link>
          )}

          {isRider && (
            <Link to="/rider" className="block px-4 py-2 text-base font-medium text-gray-300 hover:bg-gaming-purple hover:text-white rounded-md" onClick={() => setMobileMenuOpen(false)}>
              My Deliveries
            </Link>
          )}

          {user ? (
            <>
              <Link to="/profile" className="block px-4 py-2 text-base font-medium text-gray-300 hover:bg-gaming-purple hover:text-white rounded-md" onClick={() => setMobileMenuOpen(false)}>
                Profile
              </Link>
              <Link to="/orders" className="block px-4 py-2 text-base font-medium text-gray-300 hover:bg-gaming-purple hover:text-white rounded-md" onClick={() => setMobileMenuOpen(false)}>
                My Orders
              </Link>
              <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-2 text-base font-medium text-gray-300 hover:bg-gaming-purple hover:text-white rounded-md">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="block px-4 py-2 text-base font-medium text-gaming-purple hover:bg-gaming-purple hover:text-white rounded-md" onClick={() => setMobileMenuOpen(false)}>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
