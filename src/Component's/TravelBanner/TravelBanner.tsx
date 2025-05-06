import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MapPin, Calendar, PlaneTakeoff, Search } from "lucide-react";
import { format } from "date-fns";
// import { Link } from "react-router-dom";

type Airport = {
  code: string;
  name: string;
};

type AirportsData = {
  origins: Airport[];
  destinations: Airport[];
};

interface TravelBannerProps {
  onSearch: (params: { origin: string; destination: string; date: Date | null }) => void;
}

const TravelBanner: React.FC<TravelBannerProps> = ({ onSearch }) => {
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [travelDate, setTravelDate] = useState<Date | null>(null);
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const [airports, setAirports] = useState<AirportsData>({
    origins: [],
    destinations: [],
  });

  useEffect(() => {
    fetch("/airports.json")
      .then((res) => res.json())
      .then((data: AirportsData) => setAirports(data))
      .catch((err) => console.error("Error loading airports:", err));
  }, []);

  const handleDateChange = (date: Date | null) => {
    setTravelDate(date);
    setCalendarOpen(false);
  };

  const toggleCalendar = () => {
    setCalendarOpen(!calendarOpen);
  };

  const handleSearch = () => {
    onSearch({
      origin,
      destination,
      date: travelDate,
    });
  };

  return (
    <div className="min-h-screen px-8 py-10 bg-gradient-to-b from-white to-[#f0f9ff] flex items-center justify-center">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Find your next adventure for less
          </h1>
          <p className="text-lg text-gray-600 mx-auto max-w-xl">
            Discover amazing flight deals to destinations worldwide. Search by
            flexible dates and budget.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center justify-center gap-2 mb-6">
            <PlaneTakeoff className="text-sky-500" />
            <h2 className="text-xl font-semibold">Search Flights</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-center">
                Origin
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <select
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 border-solid rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                >
                  <option value="">Select airport</option>
                  {airports.origins.map((airport) => (
                    <option key={airport.code} value={airport.code}>
                      {airport.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-center">
                Destination
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <select
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 border-solid rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                >
                  <option value="">Select airport</option>
                  {airports.destinations.map((airport) => (
                    <option key={airport.code} value={airport.code}>
                      {airport.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-span-1 sm:col-span-2 text-left">
              <label className="block text-sm font-medium text-center mb-2">
                Travel Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <DatePicker
                  selected={travelDate}
                  onChange={handleDateChange}
                  onClickOutside={() => setCalendarOpen(false)}
                  open={calendarOpen}
                  onInputClick={toggleCalendar}
                  dateFormat="MMMM d, yyyy"
                  minDate={new Date()}
                  calendarClassName="border-none shadow-md font-sans"
                  customInput={
                    <input
                      className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 border-solid rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400 cursor-pointer"
                      value={
                        travelDate ? format(travelDate, "MMMM d, yyyy") : ""
                      }
                      readOnly
                      placeholder="Select a date"
                    />
                  }
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="w-full flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-md font-medium transition"
          >
            <Search className="w-5 h-5" />
            <span>Find Deals</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelBanner;
