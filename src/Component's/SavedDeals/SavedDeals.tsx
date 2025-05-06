import React from "react";
import { useSavedDeals } from "../../SavedDealsContext";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const SavedDeals = () => {
  const { savedDeals } = useSavedDeals();

  return (
    <div className="p-6">
              <div className="flex justify-between items-center mb-8">
          <div>
            <Link to='/'
              className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Flight Deals</h1>
          </div>
        </div>
      {savedDeals.length === 0 ? (
        <p>No saved deals yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedDeals.map((deal, index) => (
            <div key={index} className="p-4 border rounded shadow bg-white">
              <h2 className="text-xl font-semibold">
                {deal.origin} → {deal.destination}
              </h2>
              <p className="text-gray-500">{deal.dateRange}</p>
              <p className="text-lg font-bold">${deal.price}</p>
              <p className="text-sm">{deal.score} Deal</p>
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
};

export default SavedDeals;
