import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import OrderReceipt from "./component/OrderReceipt";
import PaymentForm from "./component/PaymentForm";
import { createOrder } from "../../features/order/orderSlice";
import type { CardValue } from "../../types";

const PaymentPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { orderNum } = useAppSelector((state) => state.order);

  const [cardValue, setCardValue] = useState<CardValue>({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });

  const [shipInfo, setShipInfo] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    address: "",
    city: "",
    zip: "",
  });

  useEffect(() => {
    // 오더번호를 받으면 어디로 갈까?
  }, [orderNum]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 오더 생성하기
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //shipInfo에 값 넣어주기
  };

  const handlePaymentInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //카드정보 넣어주기
  };

  // if (cartList?.length === 0) {
  //   navigate("/cart");
  // }// 주문할 아이템이 없다면 주문하기로 안넘어가게 막음

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setCardValue({ ...cardValue, focus: e.target.name });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <h2 className="text-2xl font-bold mb-4">배송 주소</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  성
                </label>
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  name="lastName"
                  onChange={handleFormChange}
                  required
                  value={shipInfo.lastName}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  이름
                </label>
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  name="firstName"
                  onChange={handleFormChange}
                  required
                  value={shipInfo.firstName}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                연락처
              </label>
              <input
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="contact"
                placeholder="010-xxx-xxxxx"
                onChange={handleFormChange}
                required
                value={shipInfo.contact}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                주소
              </label>
              <input
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="address"
                placeholder="Apartment, studio, or floor"
                onChange={handleFormChange}
                required
                value={shipInfo.address}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  name="city"
                  onChange={handleFormChange}
                  required
                  value={shipInfo.city}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Zip
                </label>
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  name="zip"
                  onChange={handleFormChange}
                  required
                  value={shipInfo.zip}
                />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">결제 정보</h2>
              <PaymentForm
                handleInputFocus={handleInputFocus}
                cardValue={cardValue}
                handlePaymentInfoChange={handlePaymentInfoChange}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded font-medium transition-colors mt-4"
            >
              결제하기
            </button>
          </form>
        </div>

        <div className="lg:col-span-5">
          <OrderReceipt />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
