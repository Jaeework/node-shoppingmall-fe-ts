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
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">쇼핑백</h1>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-7">
          {cartList.length > 0 ? (
            cartList.map((item) => (
              <CartProductCard key={item._id} item={item} />
            ))
          ) : (
            <div className="text-center py-20 text-gray-500">
              <h2 className="text-xl mb-2">카트가 비어있습니다.</h2>
              <p>상품을 담아주세요!</p>
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
