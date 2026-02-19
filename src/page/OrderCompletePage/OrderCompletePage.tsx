import { Link } from "react-router-dom";
import { useAppSelector } from "../../features/hooks";

const OrderCompletePage = () => {
  const { orderNum } = useAppSelector((state) => state.order);

  if (orderNum === "") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold mb-4">주문 실패</h1>
        <div>
          <p className="mb-2">메인페이지로 돌아가세요</p>
          <Link to="/" className="text-blue-500 hover:underline">
            메인페이지로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <img
        src="/image/greenCheck.png"
        className="w-24 h-24 mb-6"
        alt="greenCheck.png"
      />
      <h2 className="text-2xl font-bold mb-4">예약이 완료됐습니다!</h2>
      <p className="mb-2">예약번호: {orderNum}</p>
      <div>
        <p className="mb-2">예약 확인은 내 예약 메뉴에서 확인해주세요</p>
        <Link to="/account/purchase" className="text-blue-500 hover:underline">
          내 예약 바로가기
        </Link>
      </div>
    </div>
  );
};

export default OrderCompletePage;
