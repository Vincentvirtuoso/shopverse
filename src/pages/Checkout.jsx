import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import { LuTruck, LuCreditCard, LuWallet } from "react-icons/lu";
import toast from "react-hot-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const {
    items = [],
    subtotal = 0,
    totalItems = 0,
    clearCart,
  } = useCart() || {};

  const shippingFee = subtotal > 100000 ? 0 : 2500;
  const discount = 0; // You can calculate this based on your logic
  const discountAmount = (subtotal * discount) / 100;
  const grandTotal = subtotal - discountAmount + shippingFee;

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("paystack");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Calculate estimated delivery date (2-3 business days)
  const getEstimatedDelivery = () => {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 3); // 3 days from now

    // Format date as "Friday, Dec 15"
    return deliveryDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  const handlePlaceOrder = async () => {
    // Enhanced validation
    const requiredFields = [
      "name",
      "email",
      "address",
      "city",
      "postalCode",
      "phone",
    ];
    const missingFields = requiredFields.filter((field) => !form[field].trim());

    if (missingFields.length > 0) {
      toast(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast("Please enter a valid email address");
      return;
    }

    setIsProcessing(true);

    try {
      if (paymentMethod === "paystack") {
        // Integrate with Paystack payment here
        // await processPaystackPayment();
        console.log("Processing Paystack payment...");

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      // For cash on delivery or after successful payment
      clearCart?.();
      navigate("/order-success", {
        replace: true,
        state: {
          orderDetails: {
            ...form,
            items,
            total: grandTotal,
            paymentMethod,
            estimatedDelivery: getEstimatedDelivery(),
          },
        },
      });
    } catch (error) {
      console.error("Payment failed:", error);
      toast("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        <p className="text-gray-600 mt-2">Complete your purchase securely</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Forms */}
        <div className="space-y-6">
          {/* Shipping Information */}
          <section className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <LuTruck className="w-5 h-5" />
              Shipping Information
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">
                    Full name *
                  </span>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-gray-700">
                    Email *
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    required
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-medium text-gray-700">
                  Phone number *
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+234 800 000 0000"
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-gray-700">
                  Address *
                </span>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="123 Main Street, Apartment 4B"
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  required
                />
              </label>

              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">
                    City *
                  </span>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Lagos"
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">
                    Postal code *
                  </span>
                  <input
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                    placeholder="100001"
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    required
                  />
                </label>
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <LuCreditCard className="w-5 h-5" />
              Payment Method
            </h2>

            <div className="space-y-3">
              <label className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-red-500 transition-all">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paystack"
                  checked={paymentMethod === "paystack"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-red-600 focus:ring-red-500"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <LuCreditCard className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">Pay with Paystack</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Secure payment with card, bank transfer, or USSD
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-red-500 transition-all">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-red-600 focus:ring-red-500"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <LuWallet className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">Cash on Delivery</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Pay when your order arrives
                  </p>
                </div>
              </label>
            </div>
          </section>
        </div>

        {/* Right Column - Order Summary */}
        <aside className="space-y-6">
          {/* Order Items */}
          <section className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Order Items ({totalItems})
            </h2>

            <div className="max-h-80 overflow-y-auto mb-6 space-y-4">
              {items.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No items in your cart.
                </p>
              ) : (
                items.map((it) => (
                  <div
                    key={it.id}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                  >
                    <img
                      src={it.image}
                      alt={it.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {it.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Quantity: {it.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        ₦{(it.price * it.quantity).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        ₦{it.price.toLocaleString()} each
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Delivery Estimate */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 text-blue-800">
                <LuTruck className="w-4 h-4" />
                <span className="font-medium">Estimated Delivery</span>
              </div>
              <p className="text-blue-700 text-sm mt-1">
                Your order will arrive by {getEstimatedDelivery()}
              </p>
            </div>

            {/* Order Summary */}
            <div className="space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-medium">
                  ₦{subtotal.toLocaleString()}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({discount}%)</span>
                  <span className="font-medium">
                    -₦{discountAmount.toLocaleString()}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-gray-700">
                <span className="flex items-center gap-1">
                  <LuTruck className="w-4 h-4" />
                  Shipping
                </span>
                <span className="font-medium">
                  {shippingFee === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    `₦${shippingFee.toLocaleString()}`
                  )}
                </span>
              </div>

              {subtotal < 100000 && shippingFee > 0 && (
                <p className="text-xs text-gray-500 bg-blue-50 p-2 rounded-lg">
                  Add ₦{(100000 - subtotal).toLocaleString()} more for FREE
                  shipping
                </p>
              )}
            </div>

            <div className="border-t border-gray-300 pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-xl font-bold text-red-600">
                  ₦{grandTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </section>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            disabled={isProcessing || items.length === 0}
            className="w-full bg-red-600 text-white font-semibold py-4 rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : paymentMethod === "cash" ? (
              `Place Order - ₦${grandTotal.toLocaleString()}`
            ) : (
              `Pay Now - ₦${grandTotal.toLocaleString()}`
            )}
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="w-full border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-all"
          >
            Back to Cart
          </button>

          {/* Security Notice */}
          <div className="text-center text-sm text-gray-500">
            <p>🔒 Your payment information is secure and encrypted</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
