import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { CATEGORY } from "../../constants/product.constants";
import Button from "../ui/atoms/button/Button";

const menuList = ["ALL", ...CATEGORY];

interface NavbarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleMenuClick = (menu: string) => {
    if (menu === "ALL") {
      navigate("/");
    } else {
      navigate(`/?category=${menu}`);
    }
    onClose();
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full w-full max-w-xs bg-white shadow-xl z-50 flex flex-col transition-all duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Button
          type="button"
          variant="ghost"
          className="self-end font-heading mb-3"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faClose} size="lg" />
        </Button>
        <nav className="flex flex-col px-4 gap-2">
          {menuList.map((menu, idx) => (
            <Button key={idx}
              variant="ghost"
              className="py-2 font-orbit"
              onClick={() => handleMenuClick(menu)}>
              {menu}
            </Button>
          ))}
        </nav>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default Navbar;
