"use client";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  email: string;
  exp: number;
}

export default function HomePage() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode(token);
        setEmail(decoded.email);
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {email ? (
        <>
          <h1 className="text-2xl mb-4">You are logged in as {email}</h1>
          <a
            href="/dashboard"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Go to Dashboard
          </a>
        </>
      ) : (
        <a
          href="/login"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Login
        </a>
      )}
    </div>
  );
}
