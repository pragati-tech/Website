import { JSX } from "react";
import { Link } from "react-router-dom";

const Footer = (): JSX.Element => {
  return (
    <footer className="bg-gaming-dark border-t border-gaming-purple/20 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Description */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              Gaming<span className="text-gaming-purple">Cart</span>
            </h3>
            <p className="text-gray-400">
              Your one-stop shop for gaming consoles and accessories. Level up your gaming experience with premium products.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Shop</h3>
            <nav aria-label="Shop">
              <ul className="space-y-2">
                <li>
                  <Link to="/products?category=consoles" className="text-gray-400 hover:text-gaming-purple">
                    Consoles
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=accessories" className="text-gray-400 hover:text-gaming-purple">
                    Accessories
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-gray-400 hover:text-gaming-purple">
                    All Products
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Account Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Account</h3>
            <nav aria-label="Account">
              <ul className="space-y-2">
                <li>
                  <Link to="/login" className="text-gray-400 hover:text-gaming-purple">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/orders" className="text-gray-400 hover:text-gaming-purple">
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="text-gray-400 hover:text-gaming-purple">
                    My Cart
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
              <p className="mt-2 text-gray-400">Email: support@gamingcart.com</p>
              <p className="text-gray-400">Phone: (555) 123-4567</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gaming-purple/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} GamingCart. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link to="/privacy" className="text-gray-400 hover:text-gaming-purple text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-gaming-purple text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
