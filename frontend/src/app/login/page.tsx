"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NextImage from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 👇 Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Login failed");
      }

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <NextImage
            src="/logo.png"
            alt="App logo"
            width={120}
            height={120}
            className="rounded-full"
            priority
          />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-semibold text-center mb-8">
          Welcome to AIAL
        </h1>

        {/* Login form */}
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-3 text-center">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-md p-2 mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-md p-2 mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}