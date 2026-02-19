import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import {
  getProductList,
  deleteProduct,
  setSelectedProduct,
} from "../../features/product/productSlice";
import type { Product, SearchQuery } from "../../types";
import NewItemDialog from "./component/NewItemDialog";
import ProductTable from "./component/ProductTable";
import Button from "../../components/ui/atoms/button/Button";

const AdminProductPage = () => {
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const dispatch = useAppDispatch();
  const { productList, totalPageNum } = useAppSelector((state) => state.product);

  const [showDialog, setShowDialog] = useState(false);
  const [mode, setMode] = useState<"new" | "edit">("new");
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    page: Number(query.get("page")) || 1,
    name: query.get("name") || "",
  });

  const tableHeader = [
    "#",
    "Sku",
    "Name",
    "Price",
    "Stock",
    "Image",
    "Status",
    "",
  ];
  //상품리스트 가져오기 (url쿼리 맞춰서)
  useEffect(() => {
    dispatch(getProductList({}));
  }, []);

  useEffect(() => {
    //검색어나 페이지가 바뀌면 url바꿔주기 (검색어또는 페이지가 바뀜 => url 바꿔줌=> url쿼리 읽어옴=> 이 쿼리값 맞춰서  상품리스트 가져오기)
  }, [searchQuery]);

  const deleteItem = (id: string) => {
    //아이템 삭제하가ㅣ
  };

  const openEditForm = (product: Product) => {
    //edit모드로 설정하고
    // 아이템 수정다이얼로그 열어주기
  };

  const handleClickNewItem = () => {
    setMode("new");
    setShowDialog(true);
  };

  const handlePageClick = ({ selected }: { selected: number }) => {
    //  쿼리에 페이지값 바꿔주기
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mt-2 mb-4">
        <input
          type="text"
          placeholder="제품 이름으로 검색"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 w-64 font-monoplex"
          value={searchQuery.name || ""}
          onChange={(e) =>
            setSearchQuery({ ...searchQuery, name: e.target.value, page: 1 })
          }
        />
      </div>

      <Button
        type="button"
        variant="purple-gradient"
        size="lg"
        radius="md"
        onClick={handleClickNewItem}
        className="mb-3"
      >
        <h1 className="font-heading text-[var(--background)]">Add New Item +</h1>
      </Button>

      <ProductTable
        header={tableHeader}
        data={productList}
        deleteItem={deleteItem}
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

      <NewItemDialog
        mode={mode}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </div>
  );
};

export default AdminProductPage;
