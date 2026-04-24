import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

export default function SearchBar({ onSearch, initialValue = "" }: SearchBarProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value !== initialValue) {
        onSearch(value);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [value, onSearch, initialValue]);

  return (
    <div className="relative w-full">
      <div className="flex flex-col gap-2">
        <label className="type-label">Search</label>
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Title, Author, ISBN..."
            className="search-input pr-12"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="absolute right-0">
            {value ? (
              <button
                onClick={() => setValue("")}
                className="hover:text-swiss-red transition-colors"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            ) : (
              <Search className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
