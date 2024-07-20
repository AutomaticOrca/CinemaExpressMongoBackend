import React, { useEffect, useState } from "react";
import axios from "axios";

import API_URL from "../../shared/util/apiConfig";

import CinemaCard from "../components/CinemaCard";
function CinemaPage() {
  const [cinemas, setCinemas] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await axios.get(`${API_URL}/cinemas`);
        setCinemas(response.data.cinemas);
      } catch (err) {
        setError("Error fetching cinemas");
      }
    };

    fetchCinemas();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>List of Cinemas</h1>

      <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {cinemas.map((cinema) => (
          <CinemaCard
            name={cinema.name}
            address={cinema.address}
            imgUrl={cinema.imgUrl}
            key={cinema.name}
          />
        ))}
      </ul>
    </div>
  );
}

export default CinemaPage;
