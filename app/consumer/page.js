"use client";

import { useState, useEffect } from "react";

export default function ConsumerPage() {
  const [image, setImage] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLon(pos.coords.longitude);
      },
      () => alert("Location access denied!")
    );
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!image || lat === null || lon === null) {
      alert("Please select an image and allow location access.");
      return;
    }

    const res = await fetch("/api/report", {
      method: "POST",
      body: JSON.stringify({ image, latitude: lat, longitude: lon }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setStatus("✅ Submitted successfully!");
      setImage(null);
    } else {
      setStatus("❌ Submission failed.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-100 to-blue-200 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-700">Utkarsha</h1>
        <span className="text-sm text-gray-600">Consumer Portal</span>
      </nav>

      {/* Main Section */}
      <main className="flex-grow p-6 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-4">Report Garbage</h2>
        <p className="text-gray-600 mb-6">Help us keep your city clean by reporting garbage with location and photo evidence.</p>

        <div className="bg-white text-black  p-6 rounded-lg shadow-lg w-full max-w-md">
          <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4 border p-1 rounded cursor-pointer" />
          {image && (
            <div className="mb-4">
              <img src={image} alt="Selected" className="rounded-lg w-full h-60 object-cover" />
            </div>
          )}

          {/* <p className="text-sm text-gray-700 mb-2">
            📍 Latitude: <span className="font-medium">{lat}</span><br />
            📍 Longitude: <span className="font-medium">{lon}</span>
          </p> */}

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Submit Report
          </button>
          <p className="mt-4 text-green-800 font-medium">{status}</p>
        </div>
      </main>

      {/* About Section */}
      <section className="bg-white py-10 px-4 text-center">
        <h3 className="text-2xl font-bold text-blue-700 mb-2">About Us</h3>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Utkarsha is a citizen-driven platform that empowers communities to report and reduce public waste. We believe that cleaner environments begin with individual action and collective accountability.
        </p>
      </section>

      {/* Goal Section */}
      <section className="bg-green-50 py-10 px-4 text-center">
        <h3 className="text-2xl font-bold text-green-700 mb-2">Our Goal</h3>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Our goal is to create a clean, safe, and healthy environment for all. By making garbage reporting easy and transparent, we aim to assist municipal authorities in faster and smarter waste management.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-white text-center p-4 shadow-inner">
        <p className="text-sm text-gray-500">© 2025 Utkarsha Initiative. All rights reserved.</p>
      </footer>
    </div>
  );
}
