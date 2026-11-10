
"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

interface DoctorSearchProps {
  onSearch?: (value: string) => void;
  placeholder?: string;
}

export default function PatientSearch({
  onSearch,
  placeholder = "Search doctors by name, email or specialization...",
}: DoctorSearchProps) {
  const [search, setSearch] = useState("");

  const handleChange = (value: string) => {
    setSearch(value);
    onSearch?.(value);
  };

  const handleClear = () => {
    setSearch("");
    onSearch?.("");
  };

  return (
    <div className="w-full">
      <div className="relative flex items-center">
        <Search
          size={20}
          className="absolute left-4 text-gray-400"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-12 text-sm text-gray-700 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        {search && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute right-4 text-gray-400 transition hover:text-red-500"
          >
            <X size={19} />
          </button>
        )}
      </div>
    </div>
  );
}
