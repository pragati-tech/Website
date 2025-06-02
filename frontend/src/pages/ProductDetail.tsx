import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductBySlug } from "../data/products";
import { ProductVariant } from "../types";
import { useCart } from "../context/CartContext";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const [availableColors, setAvailableColors] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      const foundProduct = getProductBySlug(slug);
      if (foundProduct) {
        setProduct(foundProduct);

        const colors = [...new Set(foundProduct.variants.map((v: ProductVariant) => v.color))];
        setAvailableColors(colors);
        setSelectedColor(colors[0]);

        const sizes = [...new Set(foundProduct.variants.map((v: ProductVariant) => v.size))];
        setAvailableSizes(sizes);
        setSelectedSize(sizes[0]);

        setSelectedImage(foundProduct.imageUrl);
      }
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (product && selectedColor && selectedSize) {
      const variant = product.variants.find(
        (v: ProductVariant) => v.color === selectedColor && v.size === selectedSize
      );
      if (variant) {
        setSelectedVariant(variant);
        setSelectedImage(variant.imageUrl || product.imageUrl);
        setQuantity(1); // reset quantity on variant change
      } else {
        setSelectedVariant(null);
      }
    }
  }, [product, selectedColor, selectedSize]);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleQuantityChange = (value: number) => {
    if (!selectedVariant) return;
    if (value < 1) return;
    if (value > selectedVariant.stock) {
      toast.error(`Sorry, only ${selectedVariant.stock} items in stock`);
      setQuantity(selectedVariant.stock);
    } else {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (!product || !selectedVariant) {
      toast.error("Please select a valid product variant");
      return;
    }
    addToCart(product, selectedVariant, quantity);
    toast.success("Added to cart");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded mb-6 w-1/3 mx-auto"></div>
          <div className="h-96 bg-gray-700 rounded mb-6 w-full"></div>
          <div className="h-6 bg-gray-700 rounded mb-2 w-1/2 mx-auto"></div>
          <div className="h-6 bg-gray-700 rounded mb-6 w-1/4 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-300 mb-6">Product not found</h2>
        <Button onClick={() => navigate("/products")} className="bg-gaming-purple">
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gaming-card mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6 text-gray-400 hover:text-white flex items-center"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start  ">
        {/* Images */}
        <div className="space-y-6">
          <div className="gaming-card overflow-hidden h-96 flex items-center justify-center p-8 bg-gray-800 rounded-lg">
            <img
              src={selectedImage || product.imageUrl}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
            
            />
          </div>
          <div className="flex space-x-4 overflow-x-auto py-2">
  {product.variants.map((variant: ProductVariant) =>
    variant.imageUrl ? (
      <div
        key={variant.id}
        className={`h-20 w-20 rounded-md overflow-hidden cursor-pointer border-2 ${
          selectedImage === variant.imageUrl
            ? "border-gaming-purple"
            : "border-gray-700"
        }`}
        onClick={() => setSelectedImage(variant.imageUrl)}
      >
        <img
          src={variant.imageUrl}
          alt={`${product.name} - ${variant.color}`}
          className="h-full w-full object-cover"
        />
      </div>
    ) : null
  )}
</div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
            <p className="text-xl text-gaming-purple font-semibold mb-4">
              $
              {selectedVariant
                ? (selectedVariant.price ?? product.price).toFixed(2)
                : product.price.toFixed(2)}
            </p>
            <p className="text-gray-300 mb-6">{product.description}</p>
          </div>

          {/* Color */}
          <div>
            <h3 className="text-gray-300 font-medium mb-2">Color</h3>
            <div className="flex flex-wrap gap-2">
              {availableColors.map((color) => (
                <button
                  key={color}
                  className={`px-4 py-2 rounded-md border-2 transition-all ${
                    selectedColor === color
                      ? "border-gaming-purple text-gaming-purple"
                      : "border-gray-700 text-gray-300"
                  }`}
                  onClick={() => handleColorChange(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <h3 className="text-gray-300 font-medium mb-2">Size/Version</h3>
            <Select
              value={selectedSize || ""}
              onValueChange={(value) => setSelectedSize(value)}
            >
              <SelectTrigger className="bg-gaming-card border-gaming-purple/30 text-gray-300 w-full md:w-64">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent className="bg-gaming-dark border-gaming-purple/30">
                <SelectGroup>
                  {availableSizes.map((size) => (
                    <SelectItem key={size} value={size} className="text-gray-300">
                      {size}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="text-gray-300 font-medium mb-2">Quantity</h3>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-gaming-purple/30"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="mx-4 text-gray-300 w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-gaming-purple/30"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={!selectedVariant || quantity >= selectedVariant.stock}
              >
                +
              </Button>
              {selectedVariant && (
                <span className="ml-4 text-sm text-gray-400">{selectedVariant.stock} available</span>
              )}
            </div>
          </div>

          {/* Add to Cart */}
          <Button
              className="w-full md:w-auto bg-gaming-purple hover:bg-gaming-purple/90 mt-4"
              size="lg"
              onClick={handleAddToCart}
              disabled={!selectedVariant || selectedVariant.stock < 1}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>

          {/* Stock Warnings */}
          {selectedVariant && selectedVariant.stock < 5 && selectedVariant.stock > 0 && (
            <p className="text-amber-400 text-sm">Low stock! Only {selectedVariant.stock} left.</p>
          )}
          {selectedVariant && selectedVariant.stock === 0 && (
            <p className="text-red-500 text-sm">Out of stock</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;