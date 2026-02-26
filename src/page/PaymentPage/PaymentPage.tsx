import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import OrderReceipt from "./component/OrderReceipt";
import PaymentForm from "./component/PaymentForm";
import { createOrder } from "../../features/order/orderSlice";
import { getCartList } from "../../features/cart/cartSlice";
import type { CardValue } from "../../types";
import { cc_expires_format, phone_format } from "../../utils/number";
import Input from "../../components/ui/atoms/input/Input";
import Button from "../../components/ui/atoms/button/Button";
import LoaderSpinner from "../../components/ui/atoms/loader-spinner/LoaderSpinner";

const PaymentPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { orderNum, loading } = useAppSelector((state) => state.order);
  const { cartList, totalPrice, loading: cartLoading } = useAppSelector((state) => state.cart);
  
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
    dispatch(getCartList());
  }, [dispatch]);

  useEffect(() => {
    if (!cartLoading && cartList?.length === 0) {
      navigate("/cart");
    }
  }, [cartLoading, cartList, navigate]);

  useEffect(() => {
    // 오더번호를 받으면 어디로 갈까?
  }, [orderNum]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { firstName , lastName, contact, address, city, zip } = shipInfo;
    dispatch(createOrder({
      totalPrice,
      shipTo: {address, city, zip},
      contact: {firstName, lastName, contact},
      orderList: cartList.map((item) => {
        return {
          productId: item.productId._id,
          price: item.productId.price,
          qty: item.qty,
          size: item.size,
        };
      })
    }));
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "contact") {
      return setShipInfo({ ...shipInfo, [name]: phone_format(value) });
    }
    setShipInfo({ ...shipInfo, [name]: value });
  };

  const handlePaymentInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "expiry") {
      const newValue = cc_expires_format(value);
      return setCardValue({ ...cardValue, [name]: newValue });
    }
    setCardValue({ ...cardValue, [name]: value });
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setCardValue({ ...cardValue, focus: e.target.name });
  };

  return (
    <div className="max-w-5xl mx-auto py-4">
      {loading ? (
        <div className="fixed inset-0 bg-black/30 z-10 flex justify-center items-center min-h-[400px]">
          <LoaderSpinner />
        </div>
      ) : ""}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <h2 className="text-xl font-bold font-monoplex mb-4">배송 주소</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Input
                  label="성"
                  type="text"
                  name="lastName"
                  onChange={handleFormChange}
                  required
                  value={shipInfo.lastName}
                />
              </div>
              <div>
                <Input
                  label="이름"
                  type="text"
                  name="firstName"
                  onChange={handleFormChange}
                  required
                  value={shipInfo.firstName}
                />
              </div>
            </div>

            <div className="mb-4">
              <Input
                label="연락처"
                type="tel"
                pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}"
                name="contact"
                placeholder="010-xxx-xxxxx"
                onChange={handleFormChange}
                required
                value={shipInfo.contact}
              />
            </div>

            <div className="mb-4">
              <Input
                label="주소"
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
                <Input
                  label="City"
                  type="text"
                  name="city"
                  onChange={handleFormChange}
                  required
                  value={shipInfo.city}
                />
              </div>
              <div>
                <Input
                  label="Zip"
                  type="text"
                  name="zip"
                  onChange={handleFormChange}
                  required
                  value={shipInfo.zip}
                />
              </div>
            </div>

            {/* OrderReceipt - 모바일에서 중간에 위치 */}
            <div className="mb-4 lg:hidden">
              <OrderReceipt />
            </div>

            <div>
              <h2 className="text-xl font-bold font-monoplex mb-4">결제 정보</h2>
              <PaymentForm
                handleInputFocus={handleInputFocus}
                cardValue={cardValue}
                handlePaymentInfoChange={handlePaymentInfoChange}
              />
            </div>

            <Button
              variant="purple-gradient"
              radius="md"
              type="submit"
              isFullWidth
              size="lg"
              className="text-white py-3 rounded font-monoplex mt-4"
            >
              결제하기
            </Button>
          </form>
        </div>

        <div className="lg:col-span-5 hidden lg:block">
          <OrderReceipt />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
