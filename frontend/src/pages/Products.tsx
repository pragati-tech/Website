import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { products, getProductsByCategory } from "../data/products";
import { Product } from "../types";
import ProductCard from "../components/ProductCard";
import { Button } from "../components/ui/button";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("featured");

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    setSelectedCategory(categoryParam);

    // Clone the array to avoid mutating the original data
    let filtered: Product[] = categoryParam
      ? [...getProductsByCategory(categoryParam)]
      : [...products];

    switch (sortOption) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "featured":
      default:
        // Featured products first
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    setFilteredProducts(filtered);
  }, [searchParams, sortOption]);

  const handleCategoryFilter = (category: string | null) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (category) {
      newSearchParams.set("category", category);
    } else {
      newSearchParams.delete("category");
    }
    setSearchParams(newSearchParams);
  };

  return (
    <div className="bg-gaming-card mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Browse Products</h1>

      {/* Filters and Sort */}
      <div className="flex flex-col md:flex-row justify-between mb-8">
        <div className="mb-4 md:mb-0 space-x-2">
          {["All", "consoles", "accessories"].map((category, idx) => {
            const isSelected = selectedCategory === (category === "All" ? null : category);
            return (
              <Button
                key={idx}
                variant={isSelected ? "default" : "outline"}
                className={isSelected ? "bg-gaming-purple" : ""}
                onClick={() => handleCategoryFilter(category === "All" ? null : category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            );
          })}
        </div>

        <div className="flex items-center">
          <span className="mr-2 text-gray-300">Sort by:</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-gaming-card border border-gaming-purple/30 text-gray-300 rounded px-3 py-1"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A-Z</option>
            <option value="name-desc">Name: Z-A</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-400 text-xl">No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
