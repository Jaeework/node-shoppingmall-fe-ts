import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../features/hooks";
import { ORDER_STATUS } from "../../../constants/order.constants";
import { updateOrder } from "../../../features/order/orderSlice";

interface OrderDetailDialogProps {
  open: boolean;
  handleClose: () => void;
}

const currencyFormat = (value: number) => {
  const number = value !== undefined ? value : 0;
  return number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

const OrderDetailDialog = ({ open, handleClose }: OrderDetailDialogProps) => {
  const dispatch = useAppDispatch();
  const selectedOrder = useAppSelector((state) => state.order.selectedOrder);
  const [orderStatus, setOrderStatus] = useState(
    "status" in selectedOrder ? selectedOrder.status : ""
  );

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderStatus(event.target.value);
  };

  const submitStatus = () => {
    if ("_id" in selectedOrder) {
      dispatch(updateOrder({ id: selectedOrder._id, status: orderStatus }));
    }
    handleClose();
  };

  if (!open) return null;
  if (!("_id" in selectedOrder)) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Order Detail</h2>
          <button
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
            onClick={handleClose}
          >
            &times;
          </button>
        </div>

        <div className="px-6 py-4">
          <p className="mb-1">
            <span className="font-medium">예약번호:</span> {selectedOrder.orderNum}
          </p>
          <p className="mb-1">
            <span className="font-medium">주문날짜:</span>{" "}
            {selectedOrder.createdAt.slice(0, 10)}
          </p>
          <p className="mb-1">
            <span className="font-medium">이메일:</span> {selectedOrder.userId.email}
          </p>
          <p className="mb-1">
            <span className="font-medium">주소:</span>{" "}
            {selectedOrder.shipTo.address + " " + selectedOrder.shipTo.city}
          </p>
          <p className="mb-4">
            <span className="font-medium">연락처:</span>{" "}
            {`${
              selectedOrder.contact.firstName + selectedOrder.contact.lastName
            } ${selectedOrder.contact.contact}`}
          </p>

          <p className="font-medium mb-2">주문내역</p>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    ID
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Unit Price
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Qty
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedOrder.items.length > 0 &&
                  selectedOrder.items.map((item) => (
                    <tr key={item._id}>
                      <td className="px-3 py-2 text-xs">{item._id}</td>
                      <td className="px-3 py-2">{item.productId.name}</td>
                      <td className="px-3 py-2">₩ {currencyFormat(item.price)}</td>
                      <td className="px-3 py-2">{item.qty}</td>
                      <td className="px-3 py-2">
                        ₩ {currencyFormat(item.price * item.qty)}
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td colSpan={4} className="px-3 py-2 font-medium">
                    총계:
                  </td>
                  <td className="px-3 py-2 font-medium">
                    ₩ {currencyFormat(selectedOrder.totalPrice)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={orderStatus}
              onChange={handleStatusChange}
            >
              {ORDER_STATUS.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors"
              onClick={handleClose}
            >
              닫기
            </button>
            <button
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm transition-colors"
              onClick={submitStatus}
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailDialog;
