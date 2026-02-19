import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { getProductDetail } from "../../features/product/productSlice";
import { addToCart } from "../../features/cart/cartSlice";
import { currencyFormat } from "../../utils/number";

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
    // 사이즈 추가하기
  };

  const addItemToCart = () => {
    //사이즈를 아직 선택안했다면 에러
    // 아직 로그인을 안한유저라면 로그인페이지로
    // 카트에 아이템 추가하기
  };

  if (loading || !selectedProduct) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <ColorRing
          visible
          height="80"
          width="80"
          ariaLabel="loading"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
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
            className="w-full rounded-lg"
          />
        </div>

        {/* Product info */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{selectedProduct.name}</h1>
          <p className="text-xl text-gray-700">₩ {currencyFormat(selectedProduct.price)}</p>
          <p className="text-gray-600 text-sm">{selectedProduct.description}</p>

          {/* Size dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className={`w-full border rounded px-3 py-2 text-left flex justify-between items-center text-sm transition-colors ${
                sizeError ? "border-red-500" : "border-gray-300 hover:border-gray-500"
              }`}
            >
              <span>{size === "" ? "사이즈 선택" : size.toUpperCase()}</span>
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
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
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

          <button
            type="button"
            onClick={addItemToCart}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded font-medium transition-colors mt-2"
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
