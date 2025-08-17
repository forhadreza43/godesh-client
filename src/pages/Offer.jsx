import React from "react";

const Offer = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Special Offers</h1>
      <p className="mb-4">Check out our latest offers and discounts!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Summer Sale</h2>
          <p className="text-gray-700">Get 20% off on all packages.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Winter Special</h2>
          <p className="text-gray-700">Book a tour and get a free guide.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Flash Deal</h2>
          <p className="text-gray-700">50% off on selected tours. Limited time offer!</p>
        </div>
      </div>
    </div>
  );
};

export default Offer;
