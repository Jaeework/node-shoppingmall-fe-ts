import type { Order } from "../../../types";
import { badgeBg } from "../../../constants/order.constants";
import { currencyFormat } from "../../../utils/number";

interface OrderStatusCardProps {
  orderItem: Order;
}

const OrderStatusCard = ({ orderItem }: OrderStatusCardProps) => {
  return (
    <div className="flex gap-4 border border-[var(--y2k-purple)] p-4 mb-4 items-center bg-[var(--background)] relative
      after:content-[''] after:absolute after:inset-0 after:bg-[--y2k-purple] after:translate-x-1 after:translate-y-1 after:-z-10
    ">
      <div>
        <img
          src={orderItem.items[0]?.productId?.image}
          alt={orderItem.items[0]?.productId?.name}
          className="w-28 h-28 object-cover border border-gray-300 p-1"
        />
      </div>
      <div className="flex-1">
        <div className="font-heading text-sm">주문번호: {orderItem.orderNum}</div>
        <div className="text-xs text-gray-500 font-monoplex">{orderItem.createdAt.slice(0, 10)}</div>
        <div className="text-xs mt-1 font-monoplex">
          {orderItem.items[0]?.productId?.name}
          {orderItem.items.length > 1 && ` 외 ${orderItem.items.length - 1}개`}
        </div>
        <div className="text-xs font-heading">₩ {currencyFormat(orderItem.totalPrice)}</div>
      </div>
      <div className="ml-auto text-center">
        <div className="text-xs text-gray-500 mb-1 font-orbit">주문상태</div>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-monoplex ${
            badgeBg[orderItem.status] || "bg-gray-100 text-gray-800"
          }`}
        >
          {orderItem.status}
        </span>
      </div>
    </div>
  );
};

export default OrderStatusCard;
