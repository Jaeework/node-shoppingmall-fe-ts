import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { getProductList } from "../../features/product/productSlice";
import ProductCard from "./components/ProductCard";
import LoaderSpinner from "../../components/ui/atoms/loader-spinner/LoaderSpinner";

const LandingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { productList, loading } = useAppSelector((state) => state.product);
  const [query] = useSearchParams();
  const name = query.get("name") ?? "";

  useEffect(() => {
    dispatch(getProductList({ name }));
  }, [query, dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <LoaderSpinner />
        </div>
      ) : productList.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {productList.map((item) => (
            <ProductCard key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          {name === "" ? (
            <h2 className="text-lg font-monoplex">등록된 상품이 없습니다!</h2>
          ) : (
            <h2 className="text-lg font-monoplex">{name}과 일치하는 상품이 없습니다!</h2>
          )}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
