"use client";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-200 to-blue-300 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to CleanCity</h1>
      <div className="space-x-4">
        <Link href="/consumer">
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
            Login as Consumer
          </button>
        </Link>
        <Link href="/authority">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Login as Authority
          </button>
        </Link>
      </div>
    </div>
  );
}
