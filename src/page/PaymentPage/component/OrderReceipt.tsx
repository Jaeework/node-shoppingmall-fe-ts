import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../features/hooks";

const OrderReceipt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartList, totalPrice } = useAppSelector((state) => state.cart);

  const currencyFormat = (value: number) => {
    const number = value !== undefined ? value : 0;
    return number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">주문 내역</h3>
      <ul>
        {cartList.map((item) => (
          <li key={item._id} className="flex justify-between py-2 border-b text-sm">
            <div>
              {item.productId.name}{" "}
              <span className="text-gray-500">x {item.qty}</span>
            </div>
            <div>₩ {currencyFormat(item.productId.price * item.qty)}</div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between font-bold text-lg mt-4 pt-2">
        <div>
          <strong>Total:</strong>
        </div>
        <div>
          <strong>₩ {currencyFormat(totalPrice)}</strong>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-4">
        가능한 결제 수단 귀하가 결제 단계에 도달할 때까지 가격 및 배송료는
        확인되지 않습니다. 30일의 반품 가능 기간, 반품 수수료 및 미수취시
        발생하는 추가 배송 요금 읽어보기 반품 및 환불
      </p>
      {location.pathname.includes("/cart") && cartList.length > 0 && (
        <button
          className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded font-medium mt-4 transition-colors"
          onClick={() => navigate("/payment")}
        >
          결제하기
        </button>
      )}
    </div>
  );
};

export default OrderReceipt;
