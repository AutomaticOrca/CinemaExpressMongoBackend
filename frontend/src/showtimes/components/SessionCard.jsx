import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../../shared/util/apiConfig";

const LoadingMessage = () => {
  return <p>Loading</p>;
};
function SessionCard({ session }) {
  const { movieId, cinemaId, date, time, price, id } = session;
  const [movie, setMovie] = useState();
  const [cinema, setCinema] = useState();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieById = async () => {
      try {
        const response = await axios.get(`${API_URL}/movies/${movieId}`);
        setMovie(response.data.movie);
      } catch (err) {
        setError("fetchMovieById failed");
      }
    };

    const fetchCinemaById = async () => {
      try {
        const response = await axios.get(`${API_URL}/cinemas/${cinemaId}`);
        setCinema(response.data.cinema);
      } catch (err) {
        setError("fetchCinemaById failed");
      }
    };
    const fetchData = async () => {
      await fetchMovieById();
      await fetchCinemaById();
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
      {isLoading ? <LoadingMessage /> : <p>{movie.title}</p>}
    </div>
  );
}

export default SessionCard;
