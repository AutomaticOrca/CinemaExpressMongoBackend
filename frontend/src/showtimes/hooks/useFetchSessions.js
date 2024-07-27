import { useState, useEffect } from "react";
import { fetchSessions } from "../../shared/util/api";

// endpoint: 'nowshowing', 'comingsoon'
const useFetchSessions = (endpoint) => {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSessions(endpoint);
        setSessions(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [endpoint]);

  return { sessions, error };
};

export default useFetchSessions;
