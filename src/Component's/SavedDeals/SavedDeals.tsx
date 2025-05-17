import React, { useState } from "react";
import { ArrowLeft, Heart, Plane } from "lucide-react";
import { FaLongArrowAltRight, FaDollarSign } from "react-icons/fa";
import { MdOutlineCalendarToday } from "react-icons/md";
import { CiCircleAlert } from "react-icons/ci";
import { useSavedDeals } from "../../SavedDealsContext";
import { Link } from "react-router-dom";

interface Ticket {
  origin: string;
  destination: string;
  airline: string;
  price: number;
  dateRange: string;
  score: "Hot" | "Good" | "Fair" | string;
  travelTips: string[];
}

interface SearchResultsProps {
  tickets: Ticket[];
  searchParams: {
    origin: string;
    destination: string;
    date: Date | null;
  };
  onBackToSearch: () => void;
}

const SavedDeals: React.FC<SearchResultsProps> = ({
  tickets,
  searchParams,
  onBackToSearch,
}) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const { saveDeal, deleteDeal, savedDeals } = useSavedDeals();

  const handleSaveDeal = (ticket: Ticket) => {
    saveDeal(ticket);
  };

  const handleDeleteDeal = (ticket: Ticket) => {
    deleteDeal(ticket);
  };

  const isDealSaved = (ticket: Ticket) => {
    return savedDeals.some(
      (saved) =>
        saved.origin === ticket.origin &&
        saved.destination === ticket.destination &&
        saved.price === ticket.price &&
        saved.airline === ticket.airline &&
        saved.dateRange === ticket.dateRange &&
        saved.score === ticket.score &&
        JSON.stringify(saved.travelTips) === JSON.stringify(ticket.travelTips)
    );
  };

  const getDealTypeClass = (score: string) => {
    switch (score) {
      case "Amazing":
        return "bg-emerald-100 text-emerald-700";
      case "Great":
        return "bg-cyan-100 text-cyan-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link to="/" className="flex items-center text-gray-600 hover:text-gray-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Search
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Flight Deals</h1>
        </div>
      </div>

      {savedDeals.length === 0 ? (
        <p>No saved deals yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:gird-cols-2 lg:grid-cols-4 gap-4">
          {savedDeals.map((deal, index) => (
            <div key={index} className="rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div>
                <div className="bg-[#e9f8fc] flex justify-between items-start p-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">{deal.airline}</span>
                    <div className="mt-1">
                      <span className="text-2xl font-bold text-gray-900">${deal.price}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDealTypeClass(deal.score)}`}>
                      {deal.score} Deal
                    </span>
                    <button
                      onClick={() => (isDealSaved(deal) ? handleDeleteDeal(deal) : handleSaveDeal(deal))}
                      className={`p-1 rounded-full transition-colors ${
                        isDealSaved(deal) ? "text-rose-600" : "text-black hover:text-gray-400"
                      }`}
                    >
                      <CiCircleAlert className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-3">
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-lg font-semibold text-gray-900">{deal.origin}</div>
                    <Plane className="w-5 h-5 text-gray-400 mx-4" />
                    <div className="text-lg font-semibold text-gray-900">{deal.destination}</div>
                  </div>
                  <div className="text-sm mt-2 text-gray-500">{deal.dateRange}</div>
                </div>

                <div className="p-3 bg-gray-50">
                  <button
                    onClick={() => setSelectedTicket(deal)}
                    className="flex justify-between items-center text-[#4ab1a9] w-full px-3 py-2 hover:bg-gray-100 hover:text-[#2d514e] text-sm font-medium"
                  >
                    View Details
                    <FaLongArrowAltRight />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
            <div className="flex justify-between">
              <div>
                <h1 className="text-[20px] font-semibold text-gray-900">Flight Details</h1>
                <p className="text-sm font-medium text-gray-500">
                  {selectedTicket.airline} <span className="text-xl font-bold"> • </span> {selectedTicket.dateRange}
                </p>
              </div>
              <span className={`px-3 py-1 h-[29px] rounded-full text-sm font-medium ${getDealTypeClass(selectedTicket.score)}`}>
                {selectedTicket.score} Deal
              </span>
            </div>

            <div className="flex items-center justify-between mt-4 bg-[#f1f5f9] p-4 rounded-xl">
              <div className="text-[26px] flex flex-col items-center font-bold text-gray-900">
                <span className="text-sm font-semibold text-gray-500">From</span>
                {selectedTicket.origin}
              </div>
              <Plane className="w-5 h-5 text-gray-400 mx-4" />
              <div className="text-[26px] flex flex-col items-center font-bold text-gray-900">
                <span className="text-sm font-semibold text-gray-500">To</span>
                {selectedTicket.destination}
              </div>
            </div>

            <div className="flex justify-between gap-4 my-4">
              <div className="flex w-1/2 items-center gap-3 border border-gray-200 border-solid px-3 py-1 rounded-lg">
                <MdOutlineCalendarToday className="text-[#14b8a6] text-xl hover:text-[#3e756f]" />
                <div className="space-y-1">
                  <span className="text-sm text-gray-500">Date</span>
                  <p className="text-lg font-semibold text-gray-900">{selectedTicket.dateRange}</p>
                </div>
              </div>
              <div className="flex w-1/2 items-center gap-3 border border-gray-200 border-solid px-3 py-1 rounded-lg">
                <FaDollarSign className="text-[#14b8a6] text-xl hover:text-[#3e756f]" />
                <div className="space-y-1">
                  <span className="text-sm text-gray-500">Price</span>
                  <p className="text-lg font-semibold text-gray-900">${selectedTicket.price}</p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 border-solid rounded-md p-3 mb-5">
              <div className="flex items-center gap-2 mb-2">
                <CiCircleAlert className="text-[#14b8a6] text-xl hover:text-[#3e756f]" />
                <span className="text-xl font-semibold">Travel Tips</span>
              </div>
              <ul className="list-disc list-inside text-gray-500 space-y-1">
                {selectedTicket.travelTips.length > 0 ? (
                  selectedTicket.travelTips.map((tip, idx) => (
                    <li key={idx} className="text-sm">
                      {tip}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-gray-400">No tips available for this flight.</li>
                )}
              </ul>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setSelectedTicket(null)}
                className="mt-2 px-6 py-2 border font-semibold border-gray-200 border-solid text-md hover:bg-gray-100"
              >
                Back to results
              </button>
              <button
                onClick={() => handleSaveDeal(selectedTicket)}
                className={`mt-2 flex items-center gap-2 px-6 py-2 border font-semibold border-gray-200 border-solid transition-colors${
                  isDealSaved(selectedTicket) ? "text-rose-600" : "text-black hover:text-gray-400"
                }`}
              >
                <Heart className="w-4 h-4" /> Save Deal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedDeals;
