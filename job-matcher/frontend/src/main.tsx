import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PostJob from "./pages/PostJob";
import UploadResume from "./pages/UploadResume";
import Matches from "./pages/Matches";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="post-job" element={<PostJob />} />
          <Route path="upload-resume" element={<UploadResume />} />
          <Route path="matches" element={<Matches />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
