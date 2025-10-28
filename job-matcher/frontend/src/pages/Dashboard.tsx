import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    API.get("/jobs").then(res => setJobs(res.data));
  }, []);

  return (
    <div>
      <h2>Jobs</h2>
      <ul>
        {jobs.map(j => (
          <li key={j.id} style={{ marginBottom: 12 }}>
            <strong>{j.title}</strong>
            <div>{j.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
