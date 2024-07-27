import { Fragment, useState, useEffect } from "react";

import { fetchMovieById, fetchCinemaById } from "../../shared/util/api";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import NowShowingCard from "./NowShowingCard";

function SessionCard({ session, endpoint }) {
  const { movieId, cinemaId, date, time, price, id } = session;
  const [movie, setMovie] = useState();
  const [cinema, setCinema] = useState();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  const containerClass =
    endpoint === "nowshowing" ? "w-full " : "w-full md:w-1/2 lg:w-1/3";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieData = await fetchMovieById(movieId);
        setMovie(movieData);
        const cinemaData = await fetchCinemaById(cinemaId);
        setCinema(cinemaData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [movieId, cinemaId]);

  return (
    <div
      className={`bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden ${containerClass}`}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <NowShowingCard movieData={movie} cinemaData={cinema} />
      )}
    </div>
  );
}

export default SessionCard;
