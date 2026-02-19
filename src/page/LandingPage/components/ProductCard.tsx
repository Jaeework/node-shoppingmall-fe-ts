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
      className="cursor-pointer rounded-lg overflow-hidden hover:shadow-md transition-shadow mb-4"
      onClick={() => navigate(`/product/${item._id}`)}
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-full aspect-[3/4] object-cover"
      />
      <div className="px-1 mt-2 text-sm">{item.name}</div>
      <div className="px-1 pb-2 text-sm font-medium">₩ {currencyFormat(item.price)}</div>
    </div>
  );
};

export default ProductCard;
