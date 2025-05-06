import React, { useState } from "react";
import { ArrowLeft, Heart, Plane } from "lucide-react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdOutlineCalendarToday } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
import { CiCircleAlert } from "react-icons/ci";
import { useSavedDeals } from "../../SavedDealsContext";

interface Ticket {
  origin: string;
  destination: string;
  price: number;
  dateRange: string;
  airline: string;
  score: string;
  travelTips?: string[];
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

const SearchResults: React.FC<SearchResultsProps> = ({
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

  const filteredTickets = tickets
    .filter((ticket) => {
      return (
        (!searchParams.origin || ticket.origin === searchParams.origin) &&
        (!searchParams.destination ||
          ticket.destination === searchParams.destination)
      );
    })
    .sort((a, b) => {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });

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
    <div className="min-h-screen p-6">
      <div className="max-w-8xl sm:mx-auto lg:md:mx-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <button
              onClick={onBackToSearch}
              className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Flight Deals</h1>
            <p className="text-gray-600 mt-1">
              {searchParams.origin && searchParams.destination
                ? `${searchParams.origin} to ${searchParams.destination}`
                : "All destinations"}
              {searchParams.date &&
                ` • ${searchParams.date.toLocaleDateString()}`}
            </p>
          </div>

          <div className="flex items-center">
            <select
              className="px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              value={sortOrder}
            >
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {filteredTickets.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No deals found
            </h2>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria to find more results.
            </p>
            <button
              onClick={onBackToSearch}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Modify Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:md:grid-cols-4 gap-4">
            {filteredTickets.map((ticket, index) => (
              <div
                key={index}
                className="rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="bg-[#e9f8fc] flex justify-between items-start p-3">
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        {ticket.airline}
                      </span>
                      <div className="mt-1">
                        <span className="text-2xl font-bold text-gray-900">
                          ${ticket.price}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getDealTypeClass(
                          ticket.score
                        )}`}
                      >
                        {ticket.score} Deal
                      </span>
                      <button
                        onClick={() => handleSaveDeal(ticket)}
                        className={`p-1 rounded-full transition-colors ${
                          savedDeals.some(
                            (deal) =>
                              deal.origin === ticket.origin &&
                              deal.destination === ticket.destination &&
                              deal.price === ticket.price &&
                              deal.airline == ticket.airline &&
                              deal.dateRange == ticket.dateRange &&
                              deal.score == ticket.score &&
                              deal.travelTips == ticket.travelTips
                          )
                            ? "text-rose-600"
                            : "text-black hover:text-gray-400"
                        }`}
                      >
                        <Heart className="w-5 h-5" />
                      </button>
                      {savedDeals.some(
                        (deal) =>
                          deal.origin === ticket.origin &&
                          deal.destination === ticket.destination &&
                          deal.price === ticket.price &&
                          deal.airline == ticket.airline &&
                          deal.dateRange == ticket.dateRange &&
                          deal.score == ticket.score &&
                          deal.travelTips == ticket.travelTips
                      ) && (
                        <button
                          onClick={() => handleDeleteDeal(ticket)}
                          className="p-1 rounded-full text-red-600 hover:text-red-800"
                        >
                          <CiCircleAlert className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-3">
                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <div className="text-lg font-semibold text-gray-900">
                          {ticket.origin}
                        </div>
                      </div>
                      <Plane className="w-5 h-5 text-gray-400 mx-4" />
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">
                          {ticket.destination}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm mt-2 text-gray-500">
                      {ticket.dateRange}
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50">
                    <div className="">
                      <button
                        onClick={() => setSelectedTicket(ticket)}
                        className="flex justify-between items-center text-[#4ab1a9] w-full px-3 py-2 hover:bg-gray-100 hover:text-[#2d514e] text-sm font-medium"
                      >
                        View Details
                        <FaLongArrowAltRight />
                      </button>
                    </div>
                  </div>
                  {selectedTicket && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
                        <div className="flex justify-between">
                          <div>
                            <h1 className="text-[20px] font-semibold text-gray-900">
                              Flight Details
                            </h1>
                            <p className="text-sm font-medium text-gray-500">
                              {selectedTicket.airline}
                              <span className="text-xl font-bold"> • </span>
                              {selectedTicket.dateRange}
                            </p>
                          </div>

                          <span
                            className={`px-3 py-1 h-[29px] rounded-full text-sm font-medium ${getDealTypeClass(
                              selectedTicket.score
                            )}`}
                          >
                            {selectedTicket.score} Deal
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-4 bg-[#f1f5f9] p-4 rounded-xl">
                          <div className="text-[26px] flex flex-col items-center font-bold text-gray-900">
                            <span className="text-sm font-semibold text-gray-500">
                              From
                            </span>
                            {selectedTicket.origin}
                          </div>
                          <Plane className="w-5 h-5 text-gray-400 mx-4" />
                          <div className="text-[26px] flex flex-col items-center font-bold text-gray-900">
                            <span className="text-sm font-semibold text-gray-500">
                              To
                            </span>
                            {selectedTicket.destination}
                          </div>
                        </div>
                        <div className="flex justify-between gap-4 my-4">
                          <div className="flex w-1/2 items-center gap-3 border border-gray-200 px-3 py-1 rounded-lg border-solid">
                            <div>
                              <MdOutlineCalendarToday className="text-[#14b8a6] text-xl hover:text-[#3e756f]" />
                            </div>
                            <div className="space-y-1">
                              <span className="text-sm text-gray-500">
                                Date
                              </span>
                              <p className="text-lg font-semibold text-gray-900">
                                {selectedTicket.dateRange}
                              </p>
                            </div>
                          </div>
                          <div className="flex w-1/2 items-center gap-3 border border-gray-200 px-3 py-1 rounded-lg border-solid">
                            <div>
                              <FaDollarSign className="text-[#14b8a6] text-xl hover:text-[#3e756f]" />
                            </div>
                            <div className="space-y-1">
                              <span className="text-sm text-gray-500">
                                Price
                              </span>
                              <p className="text-lg font-semibold text-gray-900">
                                ${selectedTicket.price}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="border border-gray-200 rounded-md p-3 mb-5">
                          <h1 className="flex items-center gap-3 font-semibold mb-2">
                            <CiCircleAlert className="text-[#14b8a6] text-xl hover:text-[#3e756f]" />
                            <span className="text-xl">Travel Tips</span>
                          </h1>
                          <ul className="list-disc p-2 list-inside text-gray-500 space-y-1 ml-2">
                            {selectedTicket.travelTips &&
                            selectedTicket.travelTips.length > 0 ? (
                              selectedTicket.travelTips.map((tip, idx) => (
                                <li key={idx} className="text-sm">
                                  {tip}
                                </li>
                              ))
                            ) : (
                              <li className="text-sm text-gray-400">
                                No tips available for this flight.
                              </li>
                            )}
                          </ul>
                        </div>
                        <div className="flex justify-between">
                          <button
                            onClick={() => setSelectedTicket(null)}
                            className="mt-2 px-6 py-2 border font-semibold border-gray-200 text-md hover:bg-gray-100"
                            aria-label="Close"
                          >
                            Back to results
                          </button>

                          <button
                        onClick={() => handleSaveDeal(ticket)}
                        className={`mt-2 flex items-center gap-2 px-6 py-2 border font-semibold border-gray-200 text-m transition-colors ${
                          savedDeals.some(
                            (deal) =>
                              deal.origin === ticket.origin &&
                              deal.destination === ticket.destination &&
                              deal.price === ticket.price &&
                              deal.airline == ticket.airline &&
                              deal.dateRange == ticket.dateRange &&
                              deal.score == ticket.score &&
                              deal.travelTips == ticket.travelTips
                          )
                            ? "text-rose-600"
                            : "text-black hover:text-gray-400"
                        }`}
                      >
                        <Heart className="w-4 h-4" /> Save Deal
                      </button>
                      {savedDeals.some(
                        (deal) =>
                          deal.origin === ticket.origin &&
                          deal.destination === ticket.destination &&
                          deal.price === ticket.price &&
                          deal.airline == ticket.airline &&
                          deal.dateRange == ticket.dateRange &&
                          deal.score == ticket.score &&
                          deal.travelTips == ticket.travelTips
                      ) && (
                        <button
                          onClick={() => handleDeleteDeal(ticket)}
                          className="p-1 rounded-full text-red-600 hover:text-red-800"
                        >
                          <CiCircleAlert className="w-5 h-5" />
                        </button>
                      )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
