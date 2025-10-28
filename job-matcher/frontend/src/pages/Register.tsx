import React, { useState } from "react";
import API from "../services/api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [isRecruiter, setIsRecruiter] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await API.post("/auth/register", { email, password: pw, full_name: name, is_recruiter: isRecruiter });
      alert("Registered, please login");
    } catch {
      alert("Failed to register");
    }
  }

  return (
    <form onSubmit={submit}>
      <h2>Register</h2>
      <input placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={pw} onChange={e => setPw(e.target.value)} />
      <label><input type="checkbox" checked={isRecruiter} onChange={e => setIsRecruiter(e.target.checked)} /> Recruiter</label>
      <button type="submit">Register</button>
    </form>
  );
}
