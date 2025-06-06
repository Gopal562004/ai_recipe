"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getProfile } from "@/lib/api/auth";

type User = {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const params = useParams();
  const token = params?.id as string;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

const fetchProfile = async () => {
  try {
    const data = await getProfile(token);
    console.log(data); // Optional: To inspect structure
    const user = data.user;

    setUser({
      id: user._id,
      name: user.name || "User", // fallback if name is missing
      email: user.email,
      bio: user.bio || "", // fallback
      avatar: user.avatar,
    });
  } catch (err) {
    console.error("Failed to load user", err);
    router.push("/login");
  } finally {
    setLoading(false);
  }
};


    fetchProfile();
  }, [token, router]);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) {
    return <div className="text-center py-20">Loading profile...</div>;
  }

  if (!user) {
    return (
      <div className="text-center py-20 text-red-500">User not found.</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <div className="flex items-center space-x-6">
        <img
          src={user.avatar || "https://via.placeholder.com/96"}
          alt={user.name}
          className="w-24 h-24 rounded-full border-2 border-blue-500 object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {user.name}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user.email}
          </p>
          <div className="mt-3 flex gap-3">
            <button
              onClick={() => router.push("/settings")}
              className="text-sm px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
            <button
              onClick={logout}
              className="text-sm px-4 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          About
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          {user.bio || "No bio available."}
        </p>
      </div>
    </div>
  );
}
