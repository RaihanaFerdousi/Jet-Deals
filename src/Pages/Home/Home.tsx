import React, { useEffect, useState } from "react";
import TravelBanner from "../../Component's/TravelBanner/TravelBanner";
import SearchResults from "../../Component's/Search/SearchResults";

interface Ticket {
  origin: string;
  destination: string;
  price: number;
  dateRange: string;
  airline: string;
  score: string;
}

const Home = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [searchParams, setSearchParams] = useState<{
    origin: string;
    destination: string;
    date: Date | null;
  }>({ origin: "", destination: "", date: null });

  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    fetch("/tickets.json")
      .then((res) => res.json())
      .then((data) => setTickets(data.tickets)) // instead of setTickets(data)
      .catch((err) => console.error("Failed to fetch tickets:", err));
  }, []);
  

  const handleSearch = (params: { origin: string; destination: string; date: Date | null }) => {
    setSearchParams(params);
    setShowResults(true);
  };

  const handleBackToSearch = () => {
    setShowResults(false);
  };

  return (
    <div>
      {showResults ? (
        <SearchResults
          tickets={tickets}
          searchParams={searchParams}
          onBackToSearch={handleBackToSearch}
        />
      ) : (
        <TravelBanner onSearch={handleSearch} />
      )}
    </div>
  );
};

export default Home;
