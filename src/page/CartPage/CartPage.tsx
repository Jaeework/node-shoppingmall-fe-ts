import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { getCartList, setCheckedItems, deleteCartItems } from "../../features/cart/cartSlice";
import CartProductCard from "./component/CartProductCard";
import OrderReceipt from "../PaymentPage/component/OrderReceipt";
import LoaderSpinner from "../../components/ui/atoms/loader-spinner/LoaderSpinner";
import Button from "../../components/ui/atoms/button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cartList, loading, updatingItemId, checkedItems } = useAppSelector((state) => state.cart);

  const availableItems = cartList.filter((item) => item.productId.stock[item.size] > 0);
  const isAllChecked = availableItems.length > 0 && checkedItems.length === availableItems.length;

  useEffect(() => {
    dispatch(getCartList());
  }, []);

  useEffect(() => {
    const newAvailableItems = cartList.filter((item) => item.productId.stock[item.size] > 0);
    dispatch(setCheckedItems(newAvailableItems));
  }, [cartList, dispatch]);

  const handleSelectAll = () => {
    if (isAllChecked) {
      dispatch(setCheckedItems([]));
    } else {
      dispatch(setCheckedItems(availableItems));
    }
  };

  const handleDeleteSelected = () => {
    if (checkedItems.length === 0) return;
    const ids = checkedItems.map((item) => item._id);
    dispatch(deleteCartItems(ids));
  };

  if (loading && cartList.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px] lg:col-span-12">
        <LoaderSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-4">
      <h1 className="text-2xl font-semibold font-monoplex italic mb-6">BAG</h1>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-7">
          {cartList.length > 0 ? (
            <div className="flex flex-col gap-4 animate-fade-in-up">
              <div className="flex justify-between font-monoplex text-sm">
                <div className="flex gap-1 px-2 items-center">
                  <input
                    type="checkbox"
                    checked={isAllChecked}
                    onChange={handleSelectAll}
                    disabled={availableItems.length === 0}
                    className="w-4 h-4 accent-[var(--y2k-magenta-vivid)] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <span>전체 선택</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={handleDeleteSelected}
                  disabled={checkedItems.length === 0}
                  className="relative z-10 p-1 gap-1"
                >
                  <FontAwesomeIcon icon={faTrashCan} className="text-[var(--y2k-magenta-vivid)]" />
                  <span>선택 삭제</span>
                </Button>
              </div>
              {
                cartList.map((item) => (
                  <CartProductCard 
                    key={item._id} 
                    item={item} updatingItemId={updatingItemId}
                    isChecked={checkedItems.some((i) => i._id === item._id)}
                  />
                ))
              }
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              <h2 className="text-xl mb-2 font-monoplex">카트가 비어있습니다.</h2>
              <p className="font-monoplex">상품을 담아주세요!</p>
            </div>
          )}
        </div>

        {/* Order receipt */}
        <div className="lg:col-span-5">
          <OrderReceipt />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
