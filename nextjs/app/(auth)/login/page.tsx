"use client";
import { MdEmail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "../../../lib/api/auth";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token); // store token
      router.push("/"); // redirect on login
    } catch (err: any) {
      const message = err?.message || "Login failed";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 bg-opacity-90 rounded-2xl shadow-lg text-white overflow-hidden">
        {/* Top image section with gradient overlay and welcome text */}
        <div className="relative h-[220px] w-full">
          <img
            src="/login.png"
            alt="Login background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#111827_100%)] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/20 to-gray-800" />
          <div className="absolute bottom-4 left-0 w-full px-6">
            <h1 className="text-2xl font-bold">Welcome! 👋</h1>
            <p className="text-sm text-gray-300">Sign in to continue</p>
          </div>
        </div>

        {/* Form section */}
        <div className="p-8 pt-6">
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm text-gray-300 mb-1"
              >
                Email
              </label>
              <div className="flex items-center bg-gray-700 rounded px-3 py-2">
                <MdEmail size={25} className="text-gray-400 mr-2" />
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  className="bg-transparent text-white w-full focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm text-gray-300 mb-1"
              >
                Password
              </label>
              <div className="flex items-center bg-gray-700 rounded px-3 py-2">
                <MdPassword size={25} className="text-gray-400 mr-2" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="bg-transparent text-white w-full focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 text-gray-400 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="remember"
                className="mr-2 accent-purple-600"
              />
              <label htmlFor="remember" className="text-sm text-gray-300">
                Remember me
              </label>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition"
            >
              {isLoading ? "Loading..." : "Sign in"}
            </button>
          </form>

          <div className="text-center my-6 text-gray-400">Or login with</div>
          <div className="flex justify-center gap-4 mb-6">
            <button className="bg-white rounded-full p-2 cursor-pointer">
              <img src="/icons/google.png" alt="Google" className="w-6 h-6" />
            </button>
            <button className="bg-white rounded-full p-2 cursor-pointer">
              <img
                src="/icons/facebook.png"
                alt="Facebook"
                className="w-6 h-6"
              />
            </button>
          </div>

          <p className="text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link href="/register" className="text-purple-400 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
