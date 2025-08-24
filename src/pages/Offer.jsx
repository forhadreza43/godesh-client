import React from "react";
import { Link } from "react-router";
import { Ticket, Gift, Zap } from "lucide-react";

const Offer = () => {
  const offers = [
    {
      icon: <Ticket size={40} className="mb-4 text-accent" />,
      title: "Summer Sale",
      description: "Get 20% off on all packages. Book your dream vacation now!",
      link: "/all-packages",
      coupon: "SUMMER20",
    },
    {
      icon: <Gift size={40} className="mb-4 text-accent" />,
      title: "Winter Special",
      description:
        "Book a tour and get a free guide. Explore the beauty of winter with us.",
      link: "/all-packages",
      coupon: "WINTER30",
    },
    {
      icon: <Zap size={40} className="mb-4 text-accent" />,
      title: "Flash Deal",
      description:
        "50% off on selected tours. Limited time offer! Don't miss out.",
      link: "/all-packages",
      coupon: "FLASH50",
    },
  ];

  return (
    <div className="mx-auto w-11/12 max-w-[1440px] py-10 md:py-15">
      <div className="pb-10 text-center">
        <h1 className="text-4xl font-bold">Special Offers</h1>
        <p className="mt-2 text-lg">
          Check out our latest offers and discounts!
        </p>
      </div>
      <div className="">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="transform overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <div className="p-6 text-center">
                <div className="mb-4 flex items-center justify-center">
                  {offer.icon}
                </div>
                <h2 className="mb-2 text-2xl font-bold">{offer.title}</h2>
                <p className="mb-4 text-gray-700">{offer.description}</p>
                <p className="mb-4 text-sm text-gray-500">
                  Use Code:{" "}
                  <span className="rounded bg-amber-400 px-2 py-1 font-semibold text-white">
                    {offer.coupon}
                  </span>
                </p>
                <Link to={offer.link}>
                  <button className="hover:bg-opacity-90 rounded-lg bg-accent px-6 py-2 font-semibold text-white transition-colors duration-300">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offer;
