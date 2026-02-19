import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const SidebarContent: React.FC<{ onSelect: (url: string) => void }> = ({ onSelect }) => (
  <div className="flex flex-col h-full p-4">
    <Link to="/" className="mb-6">
      <h1 className="font-heading italic text-xl text-[var(--y2k-purple-vivid)]">
        HOUSE_GLOW
      </h1>
    </Link>
    <div className="text-xs font-heading text-gray-400 uppercase tracking-wider mb-3">
      Admin Account
    </div>
    <nav className="flex flex-col gap-1">
      <button
        className="text-left py-2 px-3 rounded hover:bg-gray-200 text-sm font-semibold font-monoplex transition-colors"
        onClick={() => onSelect("/admin/product?page=1")}
      >
        Product
      </button>
      <button
        className="text-left py-2 px-3 rounded hover:bg-gray-200 font-semibold text-sm font-monoplex transition-colors"
        onClick={() => onSelect("/admin/order?page=1")}
      >
        Order
      </button>
    </nav>
  </div>
);

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleSelect = (url: string) => {
    setShow(false);
    navigate(url);
  };

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-col min-h-screen w-64 border-r bg-gray-50">
        <SidebarContent onSelect={handleSelect} />
      </div>

      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-2 bg-gray-50 border-b">
        <h1 className="font-heading italic text-xl text-[var(--y2k-purple-vivid)]">
          HOUSE_GLOW
        </h1>
        <button
          onClick={() => setShow(true)}
          className="p-2 text-gray-600 hover:text-gray-900"
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
      </div>

      {/* Mobile overlay */}
      {show && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setShow(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white z-50 shadow-xl transform transition-transform duration-300 ${
          show ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-3">
          <button onClick={() => setShow(false)} className="text-gray-500 hover:text-gray-800">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>
        <SidebarContent onSelect={handleSelect} />
      </div>
    </>
  );
};

export default Sidebar;
