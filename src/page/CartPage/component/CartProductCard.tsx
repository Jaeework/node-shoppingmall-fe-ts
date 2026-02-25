import React, { useState, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../../features/hooks";
import { updateQty, deleteCartItem } from "../../../features/cart/cartSlice";
import { currencyFormat } from "../../../utils/number";
import type { CartItem } from "../../../types/index";
import Button from "../../../components/ui/atoms/button/Button";

interface CartProductCardProps {
  item: CartItem;
}

const CartProductCard: React.FC<CartProductCardProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const [stockError, setStockError] = useState<string | null>(null);
  const [localQty, setLocalQty] = useState<number | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const displayQty = localQty ?? item.qty;

  const debouncedUpdateQty = useCallback((id: string, value: number) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      dispatch(updateQty({ id, value })).then(() => {
        setLocalQty(null);
      });
    }, 300);
  }, [dispatch]);

  const handleQtyChange = (id: string, value: number) => {
    if (value <= 0) return;

    const maxStock = item.productId.stock[item.size];

    if (value > maxStock) {
      setStockError(`최대 가능 수량 ${maxStock}개`);
      return;
    }

    setStockError(null);
    setLocalQty(value);  // 즉시 UI 반영
    debouncedUpdateQty(id, value);  // 300ms 후 API 호출
  };

  const deleteCart = (id: string) => {
    dispatch(deleteCartItem(id));
  };

  return (
    <div className="flex gap-4 p-4 relative bg-white
        border border-[var(--y2k-black)] after:content-[''] after:absolute after:inset-0 after:bg-[var(--y2k-black)] after:translate-x-1 after:translate-y-1 after:-z-10">
      <img
        src={item.productId.image}
        alt={item.productId.name}
        className="w-32 h-32 object-cover border border-[--y2k-black] p-1"
      />
      <div className="flex flex-col flex-1 justify-between">
        <div className="flex justify-between items-start">
          <h3 className="w-0 flex-1 font-heading text-lg sm:text-xl text-base truncate text-ellipsis">{item.productId.name}</h3>
          <button
            onClick={() => deleteCart(item._id)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
          >
            <FontAwesomeIcon icon={faTrash} className="text-[var(--y2k-purple-deep)]" />
          </button>
        </div>
        <p className="text-sm text-gray-500 font-orbit">SIZE: {item.size.toUpperCase()}</p>
        <p className="font-orbit text-xs mt-1">₩ {currencyFormat(item.productId.price)}</p>
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <div className="flex flex-col max-w-1/3">
            <div className="flex items-center">
              <Button
                type="button"
                size="sm"
                variant="outline"
                radius="none"
                className="text-[var(--y2k-black)]"
                onClick={() => handleQtyChange(item._id, displayQty - 1)}
              >
                <p className="font-orbit text-lg">-</p>
              </Button>
              <p className="font-heading px-3 min-w-12 text-center">
                {displayQty}
              </p>
              <Button
                type="button"
                size="sm"
                variant="outline"
                radius="none"
                className="text-[var(--y2k-black)]"
                onClick={() => handleQtyChange(item._id, displayQty + 1)}
              >
                <p className="font-orbit text-lg">+</p>
              </Button>
            </div>
            <p className={`text-xs ml-2 ${stockError ? "text-red-500" : "invisible"}`}>
              {stockError || "\u00A0"}
            </p>
          </div>
          <p className="text-md font-heading text-[var(--y2k-purple-deep)]">
            ₩ {currencyFormat(item.productId.price * displayQty)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
