import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Job Matcher</h1>
        <nav className="mt-2">
          <Link to="/" className="mr-4">Dashboard</Link>
          <Link to="/post-job" className="mr-4">Post Job</Link>
          <Link to="/upload-resume" className="mr-4">Upload Resume</Link>
          <Link to="/matches">Matches</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
