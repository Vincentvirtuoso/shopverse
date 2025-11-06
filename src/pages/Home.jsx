import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LuShoppingBag,
  LuTruck,
  LuShield,
  LuHeadphones,
  LuCreditCard,
  LuStar,
  LuArrowRight,
  LuFacebook,
  LuTwitter,
  LuInstagram,
  LuMail,
  LuPhone,
  LuMapPin,
  LuChevronRight,
  LuSparkles,
  LuTrendingUp,
  LuPackage,
} from "react-icons/lu";
import RecommendedProducts from "../section/home/RecommendedProducts";

// Hero Section Component
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "New Season Arrivals",
      subtitle: "Discover the latest trends",
      description: "Shop exclusive collections with up to 50% off",
      cta: "Shop Now",
      bg: "from-rose-500 via-pink-500 to-purple-600",
      image: "🛍️",
    },
    {
      title: "Premium Quality",
      subtitle: "Crafted with excellence",
      description: "Handpicked products for discerning customers",
      cta: "Explore Collection",
      bg: "from-blue-500 via-indigo-500 to-purple-600",
      image: "✨",
    },
    {
      title: "Flash Sale Today",
      subtitle: "Limited time offer",
      description: "Save big on selected items - Ends midnight!",
      cta: "Grab Deals",
      bg: "from-orange-500 via-red-500 to-pink-600",
      image: "🔥",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[600px] overflow-hidden rounded-3xl mb-16 shadow-2xl">
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          className={`absolute inset-0 bg-gradient-to-br ${slide.bg}`}
          initial={{ opacity: 0 }}
          animate={{
            opacity: currentSlide === index ? 1 : 0,
            scale: currentSlide === index ? 1 : 1.1,
          }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-8 sm:px-12 w-full">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{
                    opacity: currentSlide === index ? 1 : 0,
                    x: currentSlide === index ? 0 : -50,
                  }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-white"
                >
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                    <LuSparkles className="w-4 h-4" />
                    <span className="text-sm font-semibold">
                      {slide.subtitle}
                    </span>
                  </div>
                  <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-white/90 font-light">
                    {slide.description}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 group"
                  >
                    {slide.cta}
                    <LuArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: currentSlide === index ? 1 : 0,
                    scale: currentSlide === index ? 1 : 0.8,
                  }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="text-9xl filter drop-shadow-2xl">
                    {slide.image}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </motion.div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Features Section
const FeaturesSection = () => {
  const features = [
    {
      icon: <LuTruck className="w-8 h-8" />,
      title: "Free Shipping",
      description: "On orders over ₦50,000",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <LuShield className="w-8 h-8" />,
      title: "Secure Payment",
      description: "100% protected transactions",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <LuHeadphones className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Dedicated customer service",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <LuCreditCard className="w-8 h-8" />,
      title: "Easy Returns",
      description: "30-day money-back guarantee",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group"
        >
          <div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}
          >
            {feature.icon}
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {feature.title}
          </h3>
          <p className="text-gray-600 text-sm">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

// Categories Section
const CategoriesSection = () => {
  const categories = [
    {
      name: "Electronics",
      icon: "📱",
      count: "2.5k+ items",
      color: "bg-blue-100 text-blue-600",
    },
    {
      name: "Fashion",
      icon: "👗",
      count: "5k+ items",
      color: "bg-pink-100 text-pink-600",
    },
    {
      name: "Beauty",
      icon: "💄",
      count: "1.8k+ items",
      color: "bg-purple-100 text-purple-600",
    },
    {
      name: "Sports",
      icon: "⚽",
      count: "2k+ items",
      color: "bg-orange-100 text-orange-600",
    },
    {
      name: "Books",
      icon: "📚",
      count: "4k+ items",
      color: "bg-indigo-100 text-indigo-600",
    },
  ];

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Shop by Category
          </h2>
          <p className="text-gray-600">Explore our curated collections</p>
        </div>
        <button className="hidden sm:flex items-center gap-2 text-red-600 font-semibold hover:gap-3 transition-all">
          View All <LuChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all text-center group"
          >
            <div
              className={`w-16 h-16 mx-auto rounded-2xl ${category.color} flex items-center justify-center text-4xl mb-3 group-hover:scale-110 transition-transform`}
            >
              {category.icon}
            </div>
            <h3 className="font-bold text-gray-900 mb-1 text-sm">
              {category.name}
            </h3>
            <p className="text-xs text-gray-500">{category.count}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// Stats Section
const StatsSection = () => {
  const stats = [
    { icon: <LuShoppingBag />, value: "50K+", label: "Products" },
    { icon: <LuStar />, value: "4.9/5", label: "Rating" },
    { icon: <LuTrendingUp />, value: "100K+", label: "Happy Customers" },
    { icon: <LuPackage />, value: "24h", label: "Fast Delivery" },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl p-12 mb-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <div className="text-white text-4xl mb-3 flex justify-center">
              {stat.icon}
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              {stat.value}
            </div>
            <div className="text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Newsletter Section
const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl p-12 mb-16 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

      <div className="relative max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <LuMail className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 text-white/90">
            Subscribe to our newsletter for exclusive deals and new arrivals
          </p>
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/50"
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-white text-red-600 px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all"
            >
              Subscribe
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

// Main Home Component
const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroSection />
        <FeaturesSection />
        <CategoriesSection />

        {/* Recommended Products Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Recommended For You
              </h2>
              <p className="text-gray-600">
                Hand-picked products based on your preferences
              </p>
            </div>
            <button className="hidden sm:flex items-center gap-2 text-red-600 font-semibold hover:gap-3 transition-all">
              View All <LuChevronRight className="w-5 h-5" />
            </button>
          </div>

          <RecommendedProducts />
        </section>

        <StatsSection />
        <NewsletterSection />
      </main>
    </div>
  );
};

export default Home;
