import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { fetchMovieById, fetchCinemaById } from "../../shared/util/api";
import { formatDate, convertMinutesToHours } from "../../shared/util/timeUtils";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import Button from "../../shared/components/UIElements/Button";

function NowShowingCard({ sessionData }) {
  const { movieId, cinemaId, date, time, price, _id } = sessionData;
  const [movie, setMovie] = useState();
  const [cinema, setCinema] = useState();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  const navigate = useNavigate();

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
    <div className=" my-3 p-1 overflow-hidden flex">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Fragment>
          <img
            src={movie.poster}
            alt={movie.title}
            className="m-3 transition duration-500 hover:animate-quick-blur"
          />
          <div className="flex flex-col justify-between m-3 p-1 w-full">
            <div>
              <h1 className="font-urbanist text-4xl">{movie.title}</h1>
              <p className="py-2">
                {convertMinutesToHours(movie.runtime)} | {movie.genres[0]}
              </p>
            </div>

            <div className="pb-1">
              <p>
                <strong>Directors:</strong> {movie.directors.join(", ")}
              </p>
              <p>
                <strong>Casts:</strong> {movie.cast.join(", ")}
              </p>
            </div>
            <p className="line-clamp-3">{movie.plot}</p>

            <hr className="my-3 border-t border-gray-200" />

            <div className="flex flex-col md:flex-row md:space-x-4">
              <p>
                {formatDate(date)} | {time}
              </p>
              <p>{cinema.name}</p>
            </div>

            <Button
              onClick={() => {
                navigate(`/session/${_id}`);
              }}
            >
              View Details
            </Button>
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default NowShowingCard;
