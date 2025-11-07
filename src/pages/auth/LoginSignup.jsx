import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import {
  LuEye,
  LuEyeOff,
  LuShoppingBag,
  LuShield,
  LuTruck,
  LuCreditCard,
  LuHeadphones,
  LuStar,
} from "react-icons/lu";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const SocialButton = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    type="button"
    className={`flex items-center gap-3 border border-gray-300 w-full justify-center py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-colors ${className}`}
  >
    {children}
  </button>
);

const slides = [
  {
    icon: LuShoppingBag,
    title: "Shop With Confidence",
    description: "Browse thousands of products from trusted sellers worldwide",
    gradient: "from-orange-600 to-red-600",
  },
  {
    icon: LuShield,
    title: "Secure & Protected",
    description: "Bank-level encryption keeps your data safe and private",
    gradient: "from-pink-600 to-red-600",
  },
  {
    icon: LuTruck,
    title: "Fast Delivery",
    description: "Track your orders in real-time with express shipping options",
    gradient: "from-orange-600 to-yellow-600",
  },
  {
    icon: LuCreditCard,
    title: "Easy Payments",
    description: "Multiple payment options with secure checkout process",
    gradient: "from-green-600 to-teal-600",
  },
];

const LoginSignup = ({ authState }) => {
  const mode =
    typeof authState === "string"
      ? authState
      : authState?.authState || authState?.from || "login";
  const isLogin = ["login", "sign-in", "signin"].includes(mode);

  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.email || !form.password)
      return "Email and password are required.";
    if (!/^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(form.email))
      return "Please enter a valid email address.";
    if (form.password.length < 6)
      return "Password must be at least 6 characters.";
    if (!isLogin && !form.name) return "Please provide your full name.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const validation = validate();
    if (validation) return setError(validation);

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);

    toast.success(
      isLogin ? "Welcome back 👋" : "Account created successfully!"
    );
    navigate("/");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 py-12 px-1">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 h-screen overflow-hidden">
        {/* Left Side - Swiper Slideshow */}
        <div className="hidden lg:block h-screen">
          <div className="h-full bg-white rounded-3xl shadow-2xl overflow-hidden">
            <Swiper
              modules={[Autoplay, EffectFade, Pagination]}
              effect="fade"
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                bulletActiveClass: "swiper-pagination-bullet-active",
              }}
              loop={true}
              className="h-full"
            >
              {slides.map((slide, index) => {
                const Icon = slide.icon;
                return (
                  <SwiperSlide key={index}>
                    <div
                      className={`h-full bg-linear-to-br ${slide.gradient} flex flex-col items-center justify-center text-white p-12 relative`}
                    >
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="relative z-10 text-center space-y-6">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                          <Icon className="w-12 h-12" />
                        </div>
                        <h2 className="text-4xl font-bold">{slide.title}</h2>
                        <p className="text-lg opacity-90 max-w-md mx-auto leading-relaxed">
                          {slide.description}
                        </p>
                      </div>

                      {/* Decorative elements */}
                      <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {/* Trust indicators */}
            <div className="absolute bottom-8 left-0 right-0 z-20 px-12">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="font-bold text-gray-900 text-xl">500K+</div>
                    <div className="text-xs text-gray-600">Active Users</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-xl">4.8★</div>
                    <div className="text-xs text-gray-600">Customer Rating</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-xl">24/7</div>
                    <div className="text-xs text-gray-600">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex h-screen overflow-y-auto w-full">
          <div className="w-full max-w-md mx-auto">
            {/* Logo & Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl mb-4">
                <LuShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {isLogin ? "Welcome Back" : "Get Started"}
              </h1>
              <p className="text-gray-600">
                {isLogin
                  ? "Sign in to continue your shopping journey"
                  : "Create an account to unlock exclusive deals"}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
              {/* Social login */}
              <div className="space-y-3">
                <SocialButton onClick={() => toast("Social login coming soon")}>
                  <FcGoogle className="text-xl" />
                  <span className="text-sm font-medium">
                    Continue with Google
                  </span>
                </SocialButton>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-4 text-gray-500 font-medium">
                    or continue with email
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                      onChange={handleChange}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <LuEyeOff className="w-5 h-5" />
                      ) : (
                        <LuEye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="text-gray-700">Remember me</span>
                  </label>
                  {isLogin && (
                    <Link
                      to="/auth/forgot"
                      className="text-orange-600 hover:text-orange-700 font-medium transition-colors"
                    >
                      Forgot password?
                    </Link>
                  )}
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className={`w-full bg-red-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all transform active:scale-[0.98] ${
                    loading ? "opacity-70 cursor-wait" : ""
                  }`}
                  disabled={loading}
                >
                  {loading
                    ? isLogin
                      ? "Signing in…"
                      : "Creating account…"
                    : isLogin
                    ? "Sign In"
                    : "Create Account"}
                </button>
              </form>

              <p className="text-center text-sm text-gray-600">
                {isLogin ? (
                  <>
                    Don't have an account?{" "}
                    <Link
                      to="/auth/register"
                      className="text-orange-600 hover:text-orange-700 font-semibold transition-colors"
                    >
                      Sign up for free
                    </Link>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <Link
                      to="/auth/login"
                      className="text-orange-600 hover:text-orange-700 font-semibold transition-colors"
                    >
                      Sign in
                    </Link>
                  </>
                )}
              </p>

              {/* Trust badges */}
              {!isLogin && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <LuShield className="w-4 h-4" />
                      <span>Secure</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <LuHeadphones className="w-4 h-4" />
                      <span>24/7 Support</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <LuStar className="w-4 h-4" />
                      <span>Rated 4.8/5</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Terms */}
            <p className="text-center text-xs text-gray-500 mt-6 px-4">
              By continuing, you agree to our{" "}
              <a href="#" className="text-orange-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-orange-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
