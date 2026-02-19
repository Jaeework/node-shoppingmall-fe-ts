import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faBox,
  faSearch,
  faShoppingBag,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { logout } from "../../features/user/userSlice";
import type { User } from "../../types/index";

interface NavbarProps {
  user: User | null;
}

const menuList = ["여성", "Divided", "남성", "신생아/유아", "아동", "H&M HOME", "Sale", "지속가능성"];

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { cartItemCount } = useAppSelector((state) => state.cart);
  const isMobile = window.navigator.userAgent.indexOf("Mobile") !== -1;
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [sideMenuWidth, setSideMenuWidth] = useState(0);

  const onCheckEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const val = event.currentTarget.value;
      if (val === "") {
        navigate("/");
      } else {
        navigate(`/?name=${val}`);
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="border-b">
      {/* Mobile search overlay */}
      {showSearchBox && (
        <div className="fixed top-0 left-0 w-full bg-white z-50 p-4 shadow-md flex items-center gap-2">
          <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
          <input
            type="text"
            placeholder="제품검색"
            onKeyPress={onCheckEnter}
            className="flex-1 outline-none text-sm"
            autoFocus
          />
          <button onClick={() => setShowSearchBox(false)} className="text-gray-500 hover:text-gray-800 p-1">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      )}

      {/* Side menu drawer */}
      <div
        className="fixed top-0 left-0 h-full bg-white shadow-xl z-50 overflow-hidden transition-all duration-300 flex flex-col"
        style={{ width: sideMenuWidth }}
      >
        <button
          className="self-end p-4 text-gray-500 hover:text-gray-800"
          onClick={() => setSideMenuWidth(0)}
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        <nav className="flex flex-col px-4 gap-2">
          {menuList.map((menu, idx) => (
            <button key={idx} className="text-left py-2 border-b border-gray-100 hover:text-gray-600">
              {menu}
            </button>
          ))}
        </nav>
      </div>
      {sideMenuWidth > 0 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setSideMenuWidth(0)}
        />
      )}

      {/* Admin link */}
      {user?.level === "admin" && (
        <div className="bg-gray-900 text-white text-center py-1 text-xs">
          <Link to="/admin/product?page=1" className="hover:underline">
            Admin Page
          </Link>
        </div>
      )}

      {/* Top bar: icons */}
      <div className="flex justify-between items-center px-4 py-2">
        {/* Burger (mobile) */}
        <div className="md:hidden">
          <FontAwesomeIcon
            icon={faBars}
            className="cursor-pointer text-xl"
            onClick={() => setSideMenuWidth(250)}
          />
        </div>

        <div className="flex-1 hidden md:block" />

        {/* Nav icons */}
        <div className="flex items-center gap-4">
          {user ? (
            <button onClick={handleLogout} className="flex items-center gap-1 text-sm hover:text-gray-600 cursor-pointer">
              <FontAwesomeIcon icon={faUser} />
              {!isMobile && <span>로그아웃</span>}
            </button>
          ) : (
            <button onClick={() => navigate("/login")} className="flex items-center gap-1 text-sm hover:text-gray-600 cursor-pointer">
              <FontAwesomeIcon icon={faUser} />
              {!isMobile && <span>로그인</span>}
            </button>
          )}

          <button onClick={() => navigate("/cart")} className="flex items-center gap-1 text-sm hover:text-gray-600 cursor-pointer">
            <FontAwesomeIcon icon={faShoppingBag} />
            {!isMobile && <span>{`쇼핑백(${cartItemCount ?? 0})`}</span>}
          </button>

          <button onClick={() => navigate("/account/purchase")} className="flex items-center gap-1 text-sm hover:text-gray-600 cursor-pointer">
            <FontAwesomeIcon icon={faBox} />
            {!isMobile && <span>내 주문</span>}
          </button>

          {isMobile && (
            <button onClick={() => setShowSearchBox(true)} className="text-sm">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          )}
        </div>
      </div>

      {/* Logo */}
      <div className="flex justify-center py-2">
        <Link to="/">
          <img width={100} src="/image/hm-logo.png" alt="H&M logo" />
        </Link>
      </div>

      {/* Menu bar */}
      <nav className="flex justify-center gap-6 py-2 text-sm border-t flex-wrap px-4">
        {menuList.map((menu, idx) => (
          <a key={idx} href="#" className="hover:underline whitespace-nowrap">
            {menu}
          </a>
        ))}
        {!isMobile && (
          <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1 ml-4">
            <FontAwesomeIcon icon={faSearch} className="text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="제품검색"
              onKeyPress={onCheckEnter}
              className="outline-none text-sm w-32"
            />
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
