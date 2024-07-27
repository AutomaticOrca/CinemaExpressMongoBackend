import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../../shared/util/apiConfig";

import NowShowingCard from "../components/NowShowingCard";

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
    console.log(sessions);
  }, []);

  return (
    <Fragment>
      <h1 className="font-italiana text-4xl px-4 font-bold text-center ">
        NOW SHOWING
      </h1>
      <div className="grid grid-cols-1">
        {sessions.map((session, index) => (
          <Fragment key={index}>
            <NowShowingCard sessionData={session} />
            {index !== sessions.length - 1 && (
              <hr className="my-4 border-t border-ritzBgBlue" />
            )}
          </Fragment>
        ))}
      </div>
    </Fragment>
  );
}

export default NowShowingPage;
