import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../features/hooks";
import { ORDER_STATUS } from "../../../constants/order.constants";
import { updateOrder } from "../../../features/order/orderSlice";
import { currencyFormat } from "../../../utils/number";
import Button from "../../../components/ui/atoms/button/Button";
import ErrorMessage from "../../../components/ui/atoms/error-message/ErrorMessage";
import { useSearchParams } from "react-router-dom";

interface OrderDetailDialogProps {
  open: boolean;
  handleClose: () => void;
}

const OrderDetailDialog = ({ open, handleClose }: OrderDetailDialogProps) => {
  const dispatch = useAppDispatch();
  const [query] = useSearchParams();
  const { selectedOrder, error } = useAppSelector((state) => state.order);
  const [orderStatus, setOrderStatus] = useState(
    "status" in selectedOrder ? selectedOrder.status : ""
  );

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderStatus(event.target.value);
  };

  const submitStatus = () => {
    if ("_id" in selectedOrder) {
      const page = Number(query.get("page")) || 1;
      const ordernum= query.get("ordernum") || "";
      dispatch(updateOrder({ id: selectedOrder._id, status: orderStatus, page, ordernum }))
        .unwrap()
        .then(() => {
          handleClose();
        });
    }
  };

  if (!open) return null;
  if (!("_id" in selectedOrder)) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-heading">Order Detail</h2>
          <Button
            type="button"
            onClick={handleClose}
            variant="ghost"
          >
            <span
              className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
            >
              &times;
            </span>
          </Button>
        </div>

        <div className="px-6 py-4">
          {error && (
            <ErrorMessage message={error} variant="y2k" className="mb-2" />
          )}
          <p className="mb-1">
            <span className="font-heading">예약번호:</span>{" "}
            <span className="font-monoplex">
              {selectedOrder.orderNum}
            </span>
          </p>
          <p className="mb-1">
            <span className="font-heading">주문날짜:</span>{" "}
            <span className="font-monoplex">
              {selectedOrder.createdAt.slice(0, 10)}
            </span>
          </p>
          <p className="mb-1">
            <span className="font-heading">이메일:</span>{" "}
            <span className="font-monoplex">
              {selectedOrder.userId.email}
            </span>
          </p>
          <p className="mb-1">
            <span className="font-heading">주소:</span>{" "}
            <span className="font-monoplex">
              {selectedOrder.shipTo.address + " " + selectedOrder.shipTo.city}
            </span>
          </p>
          <p className="mb-4">
            <span className="font-heading">연락처:</span>{" "}
            <span className="font-monoplex">
              {`${
                selectedOrder.contact.firstName + selectedOrder.contact.lastName
              } ${selectedOrder.contact.contact}`}
            </span>
          </p>

          <p className="font-orbit mb-2">주문내역</p>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50 font-heading">
                <tr>
                  <th className="px-3 py-2 text-left text-xs text-gray-500 uppercase">
                    ID
                  </th>
                  <th className="px-3 py-2 text-left text-xs text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-3 py-2 text-left text-xs text-gray-500 uppercase">
                    Unit Price
                  </th>
                  <th className="px-3 py-2 text-left text-xs text-gray-500 uppercase">
                    Qty
                  </th>
                  <th className="px-3 py-2 text-left text-xs text-gray-500 uppercase">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedOrder.items.length > 0 &&
                  selectedOrder.items.map((item) => (
                    <tr key={item._id} className="font-monoplex">
                      <td className="px-3 py-2 text-xs">{item._id}</td>
                      <td className="px-3 py-2">{item.productId.name}</td>
                      <td className="px-3 py-2">₩ {currencyFormat(item.price)}</td>
                      <td className="px-3 py-2">{item.qty}</td>
                      <td className="px-3 py-2">
                        ₩ {currencyFormat(item.price * item.qty)}
                      </td>
                    </tr>
                  ))}
                <tr className="font-heading">
                  <td colSpan={3} className="px-3 py-2 font-medium">
                    총계:
                  </td>
                  <td colSpan={2} className="px-3 py-2 font-medium">
                    ₩ {currencyFormat(selectedOrder.totalPrice)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-heading text-gray-700 mb-1">
              Status
            </label>
            <select
              className="w-full font-monoplex border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            <Button
              type="button"
              variant="outline"
              radius="lg"
              onClick={handleClose}
            >
              <span className="text-[var(--y2k-black)] font-heading">
                닫기
              </span>
            </Button>
            <Button
              radius="lg"
              onClick={submitStatus}
            >
              <span className="text-[var(--background)] font-heading">
                저장
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailDialog;
