import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";

interface SearchBoxProps {
  searchQuery: Record<string, unknown>;
  setSearchQuery: (q: Record<string, unknown>) => void;
  placeholder: string;
  field: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  searchQuery,
  setSearchQuery,
  placeholder,
  field,
}) => {
  const [query] = useSearchParams();
  const [keyword, setKeyword] = useState<string>(query.get(field) ?? "");

  const onCheckEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSearchQuery({ ...searchQuery, page: 1, [field]: event.currentTarget.value });
    }
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 gap-2 bg-white w-full max-w-sm">
      <FontAwesomeIcon icon={faSearch} className="text-gray-400 text-sm" />
      <input
        type="text"
        placeholder={placeholder}
        onKeyPress={onCheckEnter}
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        className="flex-1 outline-none text-sm"
      />
    </div>
  );
};

export default SearchBox;
