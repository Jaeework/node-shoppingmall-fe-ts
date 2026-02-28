import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { getCartList, setCheckedItems } from "../../features/cart/cartSlice";
import CartProductCard from "./component/CartProductCard";
import OrderReceipt from "../PaymentPage/component/OrderReceipt";
import LoaderSpinner from "../../components/ui/atoms/loader-spinner/LoaderSpinner";

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cartList, loading, updatingItemId, checkedItems } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartList());
  }, []);

  useEffect(() => {
    if (cartList.length > 0) {
      const availableItems = cartList.filter((item) => item.productId.stock[item.size] > 0);
      dispatch(setCheckedItems(availableItems));
    }
  }, [cartList, dispatch]);

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
