import type { Order } from "../../../types";
import { badgeBg } from "../../../constants/order.constants";

interface OrderStatusCardProps {
  orderItem: Order;
}

const currencyFormat = (value: number) => {
  const number = value !== undefined ? value : 0;
  return number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

const OrderStatusCard = ({ orderItem }: OrderStatusCardProps) => {
  return (
    <div className="flex gap-4 border border-gray-200 rounded-lg p-4 mb-4 items-center">
      <div>
        <img
          src={orderItem.items[0]?.productId?.image}
          alt={orderItem.items[0]?.productId?.name}
          className="w-20 h-28 object-cover rounded"
        />
      </div>
      <div className="flex-1">
        <div className="font-bold text-sm">주문번호: {orderItem.orderNum}</div>
        <div className="text-xs text-gray-500">{orderItem.createdAt.slice(0, 10)}</div>
        <div className="text-sm mt-1">
          {orderItem.items[0]?.productId?.name}
          {orderItem.items.length > 1 && ` 외 ${orderItem.items.length - 1}개`}
        </div>
        <div className="text-sm font-medium">₩ {currencyFormat(orderItem.totalPrice)}</div>
      </div>
      <div className="ml-auto text-center">
        <div className="text-xs text-gray-500 mb-1">주문상태</div>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
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
