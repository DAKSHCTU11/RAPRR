import React, { useState } from "react";
import API from "../services/api";

export default function Matches() {
  const [resumeId, setResumeId] = useState<number>(1);
  const [results, setResults] = useState<any>(null);

  async function getMatches() {
    try {
      const res = await API.get(`/match/resume/${resumeId}`);
      setResults(res.data);
    } catch {
      alert("Failed to fetch matches");
    }
  }

  return (
    <div>
      <h2>Matches</h2>
      <input type="number" value={resumeId} onChange={e => setResumeId(Number(e.target.value))} />
      <button onClick={getMatches}>Find</button>
      <pre style={{ whiteSpace: "pre-wrap", marginTop: 12 }}>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
}
