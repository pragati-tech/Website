import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFeaturedProducts } from "../data/products";
import { Product } from "../types";
import { Button } from "../components/ui/button";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import playstationImage from "../public/images/playstation5.jpg";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getFeaturedProducts();
        setFeaturedProducts(products);
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gaming-dark py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            {/* Text Section */}
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-4 text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Level Up Your <span className="text-gaming-purple">Gaming</span> Experience
              </motion.h1>
              <motion.p
                className="text-xl text-gray-300 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                The ultimate destination for gaming consoles and accessories. 
                Find the latest releases and best deals on PS5, Xbox Series X/S, and Nintendo Switch.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex space-x-4"
              >
                <Link to="/products">
                  <Button className="bg-gaming-purple hover:bg-gaming-purple/90 text-white py-3 px-8 rounded-md text-lg">
                    Shop Now
                  </Button>
                </Link>
                <Link to="/cart">
                  <Button
                    variant="outline"
                    className="border-gaming-purple text-gaming-purple hover:bg-gaming-purple/10 py-3 px-6 rounded-md text-lg"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    View Cart
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Image Section */}
            <div className="md:w-1/2 flex justify-center items-center relative">
              <motion.div
                className="relative w-full h-auto bg-gray-800 rounded-lg flex items-center justify-center ml-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {/* Gradient Background */}
                <div className="bg-gradient-to-r from-gaming-purple to-gaming-blue rounded-lg absolute inset-0 blur-3xl opacity-30"></div>
                
                {/* Image */}
                <img
                  src={playstationImage}
                  className="w-full h-full object-contain z-10"
                  alt="PlayStation 5"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-white">Featured Products</h2>
            <Link to="/products" className="text-gaming-purple hover:underline">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-white col-span-full text-center">No featured products available.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
