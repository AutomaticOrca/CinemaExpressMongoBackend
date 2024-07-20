import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../../shared/util/apiConfig";

import SessionCard from "../components/SessionCard";
function NowShowingPage() {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(`${API_URL}/sessions/nowshowing`);
        setSessions(response.data.sessions);
      } catch (err) {
        setError("Error fetching nowSessions");
      }
    };

    fetchSessions();
  }, []);

  return (
    <Fragment>
      <h1 className="font-italiana text-4xl px-4 font-bold text-center ">
        NOW SHOWING
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sessions.map((session, index) => (
          <SessionCard key={index} session={session} />
        ))}
      </div>
    </Fragment>
  );
}

export default NowShowingPage;
