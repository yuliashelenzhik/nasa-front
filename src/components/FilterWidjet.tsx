import React, { useState, useMemo } from "react";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import { ReactComponent as ClearIcon } from "../assets/icons/close.svg";
import { useGlobalContext } from "../context/GlobalContext";

const continents = [
  "Africa",
  "Asia",
  "Australia",
  "Europe",
  "North America",
  "South America",
  "Antarctica",
];

const FilterWidjet: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { setSelectedContinent } = useGlobalContext();

  const handleSearch = (value: string) => {
    setInputValue(value);
    if (value) {
      const filteredSuggestions = continents.filter((continent) =>
        continent.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setSelectedContinent(suggestion);
    setSuggestions([]);
  };

  const handleClear = () => {
    setInputValue("");
    setSuggestions([]);
    setSelectedContinent(null);
  };

  const debouncedHandleSearch = useMemo(() => {
    let timeout: ReturnType<typeof setTimeout>;
    return (value: string) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        handleSearch(value);
      }, 300);
    };
  }, []);

  return (
    <div className="search-container">
      <div className="search-bar">
        <SearchIcon />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => debouncedHandleSearch(e.target.value)}
          placeholder="Start typing a continent"
        />
        {inputValue && <ClearIcon onClick={handleClear} />}
      </div>

      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.slice(0, 5).map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterWidjet;
