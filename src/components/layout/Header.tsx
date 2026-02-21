import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBox, faClose, faSearch, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useAppSelector } from "../../features/hooks";
import type { User } from "../../types/index";
import Button from "../ui/atoms/button/Button";
import { useState } from "react";
import SearchBox from "./SearchBox";

interface HeaderProps {
  user: User | null;
}

function Header({ user }: HeaderProps) {
  const navigate = useNavigate();
  const { cartItemCount } = useAppSelector((state) => state.cart);
  const [showSearchBox, setShowSearchBox] = useState(false);
  
  const handleSearch = (keyword: string) => {
    if (keyword === "") {
      navigate("/");
    } else {
      navigate(`/?name=${keyword}`);
    }
  };
    
  return (
    <header className="w-full p-4 pb-5 border-b bg-transparent shrink-0 text-[var(--foreground)] flex flex-col gap-2 relative">
      <div 
        className="w-full flex justify-center items-center overflow-hidden transition-all duration-300"
        style={{
          height: showSearchBox ? "50px" : "0"
        }}
      >
        <SearchBox
          onSearch={handleSearch}
          placeholder="상품 검색"
          searchField="name"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSearchBox(false)}
        >
          <FontAwesomeIcon icon={faClose} />
        </Button>
      </div>
      <div>
        {user?.level === "admin" && (
          <Link to="/admin/product?page=1" className="hover:underline">
            <div className="bg-gray-900 text-white text-center py-1 text-sm font-monoplex">
              Admin Page
            </div>
          </Link>
        )}
      </div>
      <nav className="flex items-center justify-between">
        <FontAwesomeIcon
          icon={faBars}
          className="cursor-pointer text-lg"
          fill="var(--foreground)"
        />
        <div className="flex justify-center gap-2 items-center font-monoplex text-sm">
          {user ? (
            <Link
              to="/me"
              className="flex gap-1 justify-center items-center"
            >
              <FontAwesomeIcon icon={faUser} />
              <span className="hidden sm:inline text-sm">마이페이지</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex gap-1 justify-center items-center"
            >
              <FontAwesomeIcon icon={faUser} />
              <span className="hidden sm:inline text-sm">로그인</span>
            </Link>
          )}
          <Link to="/cart" className="relative flex items-center gap-1">
            <FontAwesomeIcon icon={faShoppingBag} />
            <span className="hidden sm:inline text-sm">장바구니</span>
            {cartItemCount > 0 && (
              <span className="text-xs">({cartItemCount})</span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSearchBox(!showSearchBox)}
          >
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </div>
      </nav>
      <div className="flex justify-center items-center">
        <Link to="/">
          <h1 className="font-heading italic text-2xl text-[var(--y2k-purple-vivid)]">
            HOUSE_GLOW
          </h1>
        </Link>
      </div>
    </header>
  );
}

export default Header;
