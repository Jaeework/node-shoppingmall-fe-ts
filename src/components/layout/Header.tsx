import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { logout } from "../../features/user/userSlice";
import type { User } from "../../types/index";

interface HeaderProps {
  user: User | null;
}

function Header({ user }: HeaderProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { cartItemCount } = useAppSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="w-full p-4 bg-transparent shrink-0 text-[var(--foreground)] flex flex-col gap-2">
      <div>
        {user?.level === "admin" && (
          <Link to="/admin/product?page=1" className="hover:underline">
            <div className="bg-gray-900 text-white text-center py-1 text-xs">
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
        <div className="flex justify-center gap-4 items-center">
          {user ? (
            <button
              onClick={handleLogout}
              className="flex gap-1 justify-center items-center cursor-pointer"
            >
              <FontAwesomeIcon icon={faUser} />
              <span className="text-sm">로그아웃</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="flex gap-1 justify-center items-center"
            >
              <FontAwesomeIcon icon={faUser} />
              <span className="text-sm">로그인</span>
            </Link>
          )}
          <Link to="/cart" className="relative flex items-center gap-1">
            <FontAwesomeIcon icon={faShoppingBag} />
            <span className="hidden sm:inline text-sm">장바구니</span>
            {cartItemCount > 0 && (
              <span className="text-xs">({cartItemCount})</span>
            )}
          </Link>
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
