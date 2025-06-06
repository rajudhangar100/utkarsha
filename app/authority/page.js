"use client";

import { useEffect, useState } from "react";

export default function AuthorityPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch("/api/report");
        const data = await res.json();
        console.log("Fetched Data:", data); // <-- Debug line
        if (data.success && Array.isArray(data.reports)) {
          setReports(data.reports);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Error loading reports:", err);
        setError("Failed to load reports.");
        setReports([]); // Safe fallback
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-100 to-green-100 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-700">Utkarsha</h1>
        <span className="text-sm text-gray-600">Authority Dashboard</span>
      </nav>

      {/* Main Content */}
      <main className="flex-grow p-6">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">Live Garbage Reports</h2>
        <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
          View reports submitted by citizens in real time. Each report includes photo proof, geolocation, and submission time to assist in timely action.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.isArray(reports) && reports.map((r) => (
            <div key={r._id} className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-200">
              <img
                src={r.image}
                alt="Reported Garbage"
                className="w-full h-48 object-cover rounded-md"
              />
              <div className="mt-3">
                <p className="text-sm text-gray-800 font-medium">
                  📍 Lat: {r.latitude.toFixed(4)}, Lng: {r.longitude.toFixed(4)}
                </p>
                <p className="text-xs text-gray-500">
                  🕒 Reported at: {new Date(r.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* About Us Section */}
      <section className="bg-white py-16 px-6 text-center">
        <h3 className="text-3xl font-bold text-blue-700 mb-4">About Utkarsha</h3>
        <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
          Utkarsha is an initiative that leverages the power of community reporting to improve waste management efficiency.
          Citizens play an active role in reporting garbage and sanitation issues using a mobile-friendly interface, helping authorities respond swiftly.
          Our platform ensures data transparency, geolocation tagging, and real-time tracking for municipal services.
        </p>
      </section>

      {/* Our Goal Section */}
      <section className="bg-green-50 py-16 px-6 text-center">
        <h3 className="text-3xl font-bold text-green-700 mb-4">Our Mission</h3>
        <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
          Our mission is to build cleaner cities by bridging the gap between the public and local authorities.
          Through smart technology, we aim to reduce the turnaround time for garbage disposal, increase civic participation, and create a sustainable urban environment.
          Utkarsha is a step toward smart cities where cleanliness is not just a goal, but a community effort.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-white p-4 text-center shadow-inner">
        <p className="text-sm text-gray-500">© 2025 Utkarsha Initiative. Empowering Clean Communities.</p>
      </footer>
    </div>
  );
}
