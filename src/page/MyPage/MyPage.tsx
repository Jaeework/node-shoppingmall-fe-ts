import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import OrderStatusCard from "./component/OrderStatusCard";
import { getOrder } from "../../features/order/orderSlice";

const MyPage = () => {
  const dispatch = useAppDispatch();
  const { orderList } = useAppSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  if (orderList.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center py-20 text-gray-500">
          진행중인 주문이 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {orderList.map((item) => (
        <OrderStatusCard orderItem={item} key={item._id} />
      ))}
    </div>
  );
};

export default MyPage;
