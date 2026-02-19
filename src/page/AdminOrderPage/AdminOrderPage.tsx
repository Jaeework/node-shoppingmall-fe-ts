import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import {
  getOrderList,
  setSelectedOrder,
} from "../../features/order/orderSlice";
import type { Order } from "../../types";
import OrderDetailDialog from "./component/OrderDetailDialog";
import OrderTable from "./component/OrderTable";

interface AdminOrderSearchQuery {
  page: number;
  ordernum: string;
}

const AdminOrderPage = () => {
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const dispatch = useAppDispatch();
  const { orderList, totalPageNum } = useAppSelector((state) => state.order);

  const [searchQuery, setSearchQuery] = useState<AdminOrderSearchQuery>({
    page: Number(query.get("page")) || 1,
    ordernum: query.get("ordernum") || "",
  });
  const [open, setOpen] = useState(false);

  const tableHeader = [
    "#",
    "Order#",
    "Order Date",
    "User",
    "Order Item",
    "Address",
    "Total Price",
    "Status",
  ];

  useEffect(() => {
    dispatch(getOrderList({ ...searchQuery }));
  }, [query]);

  useEffect(() => {
    const params: Record<string, string> = {
      page: String(searchQuery.page),
    };
    if (searchQuery.ordernum) {
      params.ordernum = searchQuery.ordernum;
    }
    const queryString = new URLSearchParams(params).toString();
    navigate("?" + queryString);
  }, [searchQuery]);

  const openEditForm = (order: Order) => {
    setOpen(true);
    dispatch(setSelectedOrder(order));
  };

  const handlePageClick = ({ selected }: { selected: number }) => {
    setSearchQuery({ ...searchQuery, page: selected + 1 });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="오더번호"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          value={searchQuery.ordernum}
          onChange={(e) =>
            setSearchQuery({
              ...searchQuery,
              ordernum: e.target.value,
              page: 1,
            })
          }
        />
      </div>

      <OrderTable
        header={tableHeader}
        data={orderList}
        openEditForm={openEditForm}
      />

      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPageNum}
        forcePage={Number(searchQuery.page) - 1}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="flex gap-1 justify-center mt-6 flex-wrap"
        pageClassName="page-item"
        pageLinkClassName="px-3 py-1 border rounded text-sm hover:bg-gray-100"
        activeClassName="active [&>a]:bg-gray-900 [&>a]:text-white [&>a]:border-gray-900"
        previousLinkClassName="px-3 py-1 border rounded text-sm hover:bg-gray-100"
        nextLinkClassName="px-3 py-1 border rounded text-sm hover:bg-gray-100"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="px-3 py-1 border rounded text-sm hover:bg-gray-100"
      />

      {open && <OrderDetailDialog open={open} handleClose={handleClose} />}
    </div>
  );
};

export default AdminOrderPage;
