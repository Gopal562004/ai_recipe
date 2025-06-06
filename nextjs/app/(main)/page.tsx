"use client";
import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import RecipeList from "../../components/RecipeList";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const trendingTags = [
    "Burger",
    "Pizza",
    "Salad",
    "Sushi",
    "Pasta",
    "Sandwich",
    "Soup",
    "Rice Bowl",
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto mb-15">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search recipes..."
          className="w-full pl-10 pr-10 py-2 rounded-4xl border bg-[#393d44] text-white focus:outline-none focus:ring-2 focus:ring-purple-400 border-none"
        />
        <FiSearch
          className="absolute left-3 top-2.5 text-purple-600"
          size={20} // Increase this value to make the icon bigger
        />

        {searchTerm && (
          <FiX
            className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
            size={20}
            onClick={() => setSearchTerm("")}
          />
        )}
      </div>

      {/* Trending Search */}
      <div>
        <div className="">
          <h2 className="text-white text-xl font-semibold mb-5">
            Trending Search
          </h2>
        </div>

        <div className="overflow-x-auto">
          <ul className="grid grid-rows-2 auto-cols-auto grid-flow-col w-max lg:grid-rows-1 gap-6 mb-7">
            {trendingTags.map((tag, index) => (
              <li
                key={index}
                className="px-[20px] py-2 bg-[#2d2f45] text-[#9372f1] rounded-full cursor-pointer hover:bg-purple-200 whitespace-nowrap text-center justify-center items-center uppercase text-sm gap-5 font-semibold"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommendation */}
      <div>
        <h2 className="text-white text-xl font-semibold mb-5 ">
          Recommendation
        </h2>
        <RecipeList searchTerm={searchTerm} />
      </div>
    </div>
  );
}
