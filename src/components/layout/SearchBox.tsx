import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";
import Input from "../ui/atoms/input/Input";

interface SearchBoxProps {
  onCheckEnter: React.KeyboardEventHandler<HTMLInputElement>;
  placeholder: string;
  field: string;
  className?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  onCheckEnter,
  placeholder,
  field,
  className,
  ...props
}) => {
  const [query] = useSearchParams();
  const [keyword, setKeyword] = useState<string>(query.get(field) ?? "");

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
        onKeyUp={onCheckEnter}
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        {...props}
      />
    </div>
  );
};

export default SearchBox;
