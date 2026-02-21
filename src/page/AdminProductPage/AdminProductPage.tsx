import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import {
  getProductList,
  deleteProduct,
  setSelectedProduct,
} from "../../features/product/productSlice";
import type { Product } from "../../types";
import NewItemDialog from "./component/NewItemDialog";
import ProductTable from "./component/ProductTable";
import Button from "../../components/ui/atoms/button/Button";
import SearchBox from "../../components/layout/SearchBox";
import LoaderSpinner from "../../components/ui/atoms/loader-spinner/LoaderSpinner";

const AdminProductPage = () => {
  const [query, setQuery] = useSearchParams();
  const dispatch = useAppDispatch();
  const { productList, totalPageNum, success, loading } = useAppSelector((state) => state.product);

  const [showDialog, setShowDialog] = useState(false);
  const [mode, setMode] = useState<"new" | "edit">("new");

  // URL에서 직접 읽기
  const page = Number(query.get("page")) || 1;
  const name = query.get("name") || "";

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

  // 상품리스트 가져오기 (URL 쿼리 기반)
  useEffect(() => {
    dispatch(getProductList({ page, name }));
  }, [dispatch, query]);

  // 상품 생성/수정 성공 시 목록 갱신
  useEffect(() => {
    if (success) {
      dispatch(getProductList({ page, name }));
    }
  }, [success]);


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
    const params: Record<string, string> = { page: String(selected + 1) };
    if (name) params.name = name;
    setQuery(params);
  };

  const onCheckEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const searchName = event.currentTarget.value;
      const params: Record<string, string> = { page: "1" };
      if (searchName) params.name = searchName;
      setQuery(params);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mt-2 mb-4">
        <SearchBox
          onCheckEnter={onCheckEnter}
          placeholder="제품 이름으로 검색"
          field="name"
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

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <LoaderSpinner />
        </div>
      ) : (
        <ProductTable
          header={tableHeader}
          data={productList}
          deleteItem={deleteItem}
          openEditForm={openEditForm}
        />
      )}

      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPageNum}
        forcePage={page - 1}
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
