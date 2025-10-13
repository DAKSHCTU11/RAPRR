import React, { useState, useRef } from "react";
import { detectLabels } from "../services/visionClient";

export default function ImageUploader({ onIngredientsDetected }) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef();

  const visionKey = process.env.NEXT_PUBLIC_VISION_KEY || ""; // stays empty by default

  async function handleFile(file) {
    setLoading(true);
    setPreview(URL.createObjectURL(file));
    try {
      const detected = await detectLabels(file, visionKey);
      onIngredientsDetected(detected);
    } catch (e) {
      console.error("Detection error:", e);
      onIngredientsDetected([{ name: "tomato", confidence: 0.6 }]);
    } finally {
      setLoading(false);
    }
  }

  function onDrop(e) {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }

  return (
    <div
      onDrop={onDrop}
      onDragOver={e => e.preventDefault()}
      style={{
        border: "2px dashed #ccc",
        borderRadius: 8,
        padding: 12,
        textAlign: "center"
      }}
    >
      <p>
        Drag & drop an image here, or{" "}
        <button onClick={() => fileRef.current.click()}>choose file</button>
      </p>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileRef}
        onChange={e => e.target.files[0] && handleFile(e.target.files[0])}
      />
      {loading && <p>Detecting ingredients...</p>}
      {preview && (
        <img
          src={preview}
          alt="preview"
          style={{ maxWidth: "100%", marginTop: 8 }}
        />
      )}
    </div>
  );
}
