import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../../features/hooks";
import { updateQty, deleteCartItem } from "../../../features/cart/cartSlice";
import { currencyFormat } from "../../../utils/number";
import type { CartItem } from "../../../types/index";

interface CartProductCardProps {
  item: CartItem;
}

const CartProductCard: React.FC<CartProductCardProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const handleQtyChange = (id: string, value: number) => {
    dispatch(updateQty({ id, value }));
  };

  const deleteCart = (id: string) => {
    dispatch(deleteCartItem(id));
  };

  return (
    <div className="flex gap-4 border-b py-4">
      <img
        src={item.productId.image}
        alt={item.productId.name}
        className="w-24 h-32 object-cover rounded"
      />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-base">{item.productId.name}</h3>
          <button
            onClick={() => deleteCart(item._id)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
        <p className="font-medium text-sm mt-1">₩ {currencyFormat(item.productId.price)}</p>
        <p className="text-sm text-gray-500">Size: {item.size}</p>
        <p className="text-sm font-medium">
          Total: ₩ {currencyFormat(item.productId.price * item.qty)}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm text-gray-600">Quantity:</span>
          <select
            defaultValue={item.qty}
            onChange={(e) => handleQtyChange(item._id, Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
