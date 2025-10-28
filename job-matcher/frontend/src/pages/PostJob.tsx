import React, { useState } from "react";
import API from "../services/api";

export default function PostJob() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await API.post("/jobs/", { title, description: desc });
      alert("Job posted");
    } catch {
      alert("Failed");
    }
  }

  return (
    <form onSubmit={submit}>
      <h2>Post Job</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" />
      <button type="submit">Post</button>
    </form>
  );
}
