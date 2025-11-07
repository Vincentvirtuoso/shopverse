import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="max-w-3xl mx-auto py-20 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">
        Thank you — your order is placed!
      </h1>
      <p className="text-gray-600 mb-8">
        We've received your order and will email you the receipt shortly.
      </p>
      <Link to="/" className="btn btn-primary">
        Return to shop
      </Link>
    </div>
  );
};

export default OrderSuccess;
