import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import OrderStatusCard from "./component/OrderStatusCard";
import { getOrder } from "../../features/order/orderSlice";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
import LoaderSpinner from "../../components/ui/atoms/loader-spinner/LoaderSpinner";

const MyPage = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useSearchParams();
  const { loading, orderList, totalPageNum } = useAppSelector((state) => state.order);
  const page = Number(query.get("page")) || 1;

  useEffect(() => {
    dispatch(getOrder({ page }));
  }, [dispatch, query]);

  const handlePageClick = ({ selected }: { selected: number }) => {
    const params: Record<string, string> = { page: String(selected + 1) };
    setQuery(params);
  };

  if (loading && orderList.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 min-h-[500px] flex justify-center items-center">
        <LoaderSpinner />
      </div>
    );
  }

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

      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPageNum}
        forcePage={page - 1}
        previousLabel="< prev"
        renderOnZeroPageCount={null}
        containerClassName="flex gap-1 justify-center mt-6 flex-wrap font-heading"
        pageClassName="page-item"
        pageLinkClassName="px-3 py-1 border rounded text-sm hover:bg-gray-100"
        activeClassName="active [&>a]:bg-gray-900 [&>a]:text-white [&>a]:border-gray-900"
        previousLinkClassName="px-3 py-1 border rounded text-sm hover:bg-gray-100"
        nextLinkClassName="px-3 py-1 border rounded text-sm hover:bg-gray-100"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="px-3 py-1 border rounded text-sm hover:bg-gray-100"
      />
    </div>
  );
};

export default MyPage;
