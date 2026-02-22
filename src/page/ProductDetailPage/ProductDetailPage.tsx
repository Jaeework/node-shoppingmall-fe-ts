import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { getProductDetail } from "../../features/product/productSlice";
import { addToCart } from "../../features/cart/cartSlice";
import { currencyFormat } from "../../utils/number";
import LoaderSpinner from "../../components/ui/atoms/loader-spinner/LoaderSpinner";
import Button from "../../components/ui/atoms/button/Button";

const ProductDetailPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { selectedProduct, loading } = useAppSelector((state) => state.product);
  const user = useAppSelector((state) => state.user.user);

  const [size, setSize] = useState("");
  const [sizeError, setSizeError] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (id) dispatch(getProductDetail(id));
  }, [id, dispatch]);

  const selectSize = (value: string) => {
    setSizeError(false);
    setSize(value);
    setDropdownOpen(false);
  };

  const addItemToCart = () => {
    //사이즈를 아직 선택안했다면 에러
    // 아직 로그인을 안한유저라면 로그인페이지로
    // 카트에 아이템 추가하기
  };

  if (loading || !selectedProduct) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoaderSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product image */}
        <div>
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-full rounded-lg border border-gray-200 shadow-lg"
          />
        </div>

        {/* Product info */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-heading">{selectedProduct.name}</h1>
          <p className="text-xl text-gray-700 font-heading">₩ {currencyFormat(selectedProduct.price)}</p>
          <p className="text-gray-600 text-sm font-monoplex">{selectedProduct.description}</p>

          {/* Size dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className={`w-full border rounded px-3 py-2 text-left flex justify-between items-center text-sm transition-colors ${
                sizeError ? "border-red-500" : "border-gray-300 hover:border-gray-500"
              }`}
            >
              <span className="font-monoplex">{size === "" ? "사이즈 선택" : size.toUpperCase()}</span>
              <span className="text-gray-400">▾</span>
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded shadow-lg z-10 mt-1">
                {Object.keys(selectedProduct.stock).map((item, idx) => {
                  const isDisabled = selectedProduct.stock[item] === 0;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => !isDisabled && selectSize(item)}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors font-monoplex ${
                        isDisabled
                          ? "text-gray-300 cursor-not-allowed"
                          : "hover:bg-gray-100 cursor-pointer"
                      }`}
                    >
                      {item.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {sizeError && (
            <p className="text-red-500 text-xs -mt-2">사이즈를 선택해주세요.</p>
          )}

          <Button
            type="button"
            variant="black"
            radius="md"
            size="xl"
            isFullWidth
            className="mt-2"
            onClick={addItemToCart}
          >
            <h1 className="text-[--background] font-heading">추가</h1>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
