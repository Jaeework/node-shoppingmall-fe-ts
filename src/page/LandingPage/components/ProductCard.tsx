import React from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../../../utils/number";
import type { Product } from "../../../types/index";

interface ProductCardProps {
  item: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative cursor-pointer hover:shadow-xl transition-shadow mb-4 bg-white
        border border-[--y2k-silver] after:content-[''] after:absolute after:inset-0 after:bg-[--y2k-black] after:translate-x-1 after:translate-y-1 after:-z-10"
      onClick={() => navigate(`/product/${item._id}`)}
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-full aspect-[10/11] object-cover border-b border-[--y2k-black]"
      />
      <div className="p-2 flex flex-col gap-1">
        <div className="px-1 mt-2 text-xs font-heading truncate text-[--y2k-chrome]">{item.name}</div>
        <div className="px-1 pb-2 text-sm font-heading">₩ {currencyFormat(item.price)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
