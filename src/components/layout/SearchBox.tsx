import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";
import Input from "../ui/atoms/input/Input";

interface SearchBoxProps {
  onSearch: (keyword: string) => void;
  placeholder: string;
  searchField: string;
  className?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  onSearch,
  placeholder,
  searchField,
  className,
  ...props
}) => {
  const [query] = useSearchParams();
  const urlKeyword = query.get(searchField) ?? "";
  const [keyword, setKeyword] = useState(urlKeyword);

  // URL 변경 시 input 동기화 (다른 페이지에서 돌아올 때)
  if (keyword !== urlKeyword && document.activeElement?.tagName !== "INPUT") {
    setKeyword(urlKeyword);
  }

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(keyword);
    }
  };

  const combinedClassName = [
    "flex items-center px-3 py-2 gap-2 w-full max-w-lg ",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={combinedClassName}>
      <FontAwesomeIcon icon={faSearch} className="text-gray-400 text-sm" />
      <Input
        type="text"
        placeholder={placeholder}
        onKeyUp={handleKeyUp}
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        {...props}
      />
    </div>
  );
};

export default SearchBox;
