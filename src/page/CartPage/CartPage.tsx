import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { getCartList } from "../../features/cart/cartSlice";
import CartProductCard from "./component/CartProductCard";
import OrderReceipt from "../PaymentPage/component/OrderReceipt";

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cartList } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartList());
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold font-monoplex italic mb-6">BAG</h1>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-7">
          {cartList.length > 0 ? (
            <div className="flex flex-col gap-4">
              {
                cartList.map((item) => (
                  <CartProductCard key={item._id} item={item} />
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
