import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuFilter,
  LuX,
  LuStar,
  LuStarHalf,
  LuShoppingCart,
  LuHeart,
  LuSearch,
  LuChevronDown,
  LuCheck,
  LuSparkles,
  LuAward,
  LuClock,
} from "react-icons/lu";
import products from "../data/products";
import ProductCard from "../components/common/ProductCard";

const StarRating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <LuStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
    );
  }

  if (hasHalfStar) {
    stars.push(
      <LuStarHalf key="half" className="w-4 h-4 text-yellow-400 fill-current" />
    );
  }

  const remainingStars = 5 - stars.length;
  for (let i = 0; i < remainingStars; i++) {
    stars.push(<LuStar key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
  }

  return <div className="flex items-center gap-0.5">{stars}</div>;
};

const FilterDropdown = ({
  label,
  options,
  selected,
  onSelect,
  multiple = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-sm border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
      >
        <span>{label}</span>
        <LuChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto"
          >
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onSelect(option);
                  if (!multiple) setIsOpen(false);
                }}
                className="flex items-center justify-between w-full px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
              >
                <span>{option}</span>
                {selected.includes(option) && (
                  <LuCheck className="w-4 h-4 text-red-600" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function ProductList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 300000]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("featured");

  const categories = [...new Set(products.map((product) => product.category))];
  const brands = [...new Set(products.map((product) => product.brand))];

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating = product.rating >= minRating;
      const matchesStock = !inStockOnly || product.inStock;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesRating &&
        matchesStock
      );
    });

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "discount":
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      default:
        // Featured sorting - best sellers and new items first
        filtered.sort((a, b) => {
          if (a.isBestSeller && !b.isBestSeller) return -1;
          if (!a.isBestSeller && b.isBestSeller) return 1;
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
    }

    return filtered;
  }, [
    searchTerm,
    selectedCategories,
    priceRange,
    minRating,
    inStockOnly,
    sortBy,
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className=""
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <motion.h1
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              Product Collection
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Discover our carefully curated selection of premium products
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Filters and Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products, brands, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="discount">Best Discount</option>
          </select>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 ${
              !showFilters
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "border border-red-600 text-red-600 hover:bg-red-50"
            } rounded-lg transition-colors place-self-end text-sm`}
          >
            {showFilters ? (
              <LuX className="w-5 h-5" />
            ) : (
              <LuFilter className="w-5 h-5" />
            )}{" "}
            {showFilters ? "Close" : "Filters"}
          </button>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8 "
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <FilterDropdown
                    label="Select Categories"
                    options={categories}
                    selected={selectedCategories}
                    onSelect={(category) => {
                      setSelectedCategories((prev) =>
                        prev.includes(category)
                          ? prev.filter((c) => c !== category)
                          : [...prev, category]
                      );
                    }}
                    multiple={true}
                  />
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: ₦{priceRange[0].toLocaleString()} - ₦
                    {priceRange[1].toLocaleString()}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="300000"
                      step="1000"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([parseInt(e.target.value), priceRange[1]])
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      type="range"
                      min="0"
                      max="300000"
                      step="1000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Rating
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {[0, 1, 2, 3, 4, 4.5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setMinRating(rating)}
                        className={`flex items-center gap-1 px-3 py-2 rounded-lg border transition-colors ${
                          minRating === rating
                            ? "bg-red-100 border-red-500 text-red-700"
                            : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <StarRating rating={rating} />
                        {rating > 0 && <span className="text-xs">+</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stock Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span>In Stock Only</span>
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
          {(searchTerm ||
            selectedCategories.length > 0 ||
            minRating > 0 ||
            inStockOnly) && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategories([]);
                setPriceRange([0, 300000]);
                setMinRating(0);
                setInStockOnly(false);
              }}
              className="text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="wait">
            {filteredProducts.map((product) => (
              <ProductCard
                product={product}
                key={product.id}
                query={searchTerm}
                compact
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <LuSearch className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategories([]);
                setPriceRange([0, 300000]);
                setMinRating(0);
                setInStockOnly(false);
              }}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
