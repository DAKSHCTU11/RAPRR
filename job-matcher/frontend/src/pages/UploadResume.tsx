import React, { useState } from "react";
import API from "../services/api";

export default function UploadResume() {
  const [file, setFile] = useState<File | null>(null);
  const [userId, setUserId] = useState<number>(1);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return alert("Select file");
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await API.post(`/resumes/upload?user_id=${userId}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Uploaded: " + res.data.filename);
    } catch {
      alert("Upload failed");
    }
  }

  return (
    <form onSubmit={submit}>
      <h2>Upload Resume</h2>
      <label>User ID (for demo): <input type="number" value={userId} onChange={e => setUserId(Number(e.target.value))} /></label>
      <input type="file" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} />
      <button type="submit">Upload</button>
    </form>
  );
}
