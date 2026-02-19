import type { Order } from "../../../types";
import { badgeBg } from "../../../constants/order.constants";

interface OrderTableProps {
  header: string[];
  data: Order[];
  openEditForm: (order: Order) => void;
}

const currencyFormat = (value: number) => {
  const number = value !== undefined ? value : 0;
  return number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

const OrderTable = ({ header, data, openEditForm }: OrderTableProps) => {
  const orderList: Order[] = Array.isArray(data) ? data : [];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            {header.map((title, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orderList.length > 0 ? (
            orderList.map((item, index) => (
              <tr
                key={item._id}
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => openEditForm(item)}
              >
                <td className="px-4 py-3">{index}</td>
                <td className="px-4 py-3">{item.orderNum}</td>
                <td className="px-4 py-3">{item.createdAt.slice(0, 10)}</td>
                <td className="px-4 py-3">{item.userId.email}</td>
                <td className="px-4 py-3">
                  {item.items.length > 0 ? (
                    <>
                      {item.items[0].productId.name}
                      {item.items.length > 1 &&
                        ` 외 ${item.items.length - 1}개`}
                    </>
                  ) : null}
                </td>
                <td className="px-4 py-3">
                  {item.shipTo.address + " " + item.shipTo.city}
                </td>
                <td className="px-4 py-3">₩ {currencyFormat(item.totalPrice)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      badgeBg[item.status] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={header.length}
                className="px-4 py-8 text-center text-gray-500"
              >
                No Data to show
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
