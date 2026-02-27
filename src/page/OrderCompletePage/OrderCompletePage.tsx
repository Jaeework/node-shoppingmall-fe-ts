import { Link } from "react-router-dom";
import { useAppSelector } from "../../features/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/ui/atoms/button/Button";

const OrderCompletePage = () => {
  const { orderNum } = useAppSelector((state) => state.order);

  if (orderNum === "") {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-heading mb-4">주문 실패</h1>
        <div>
          <p className="mb-2 font-monoplex text-lg">메인페이지로 돌아가세요</p>
          <Link to="/">
            <Button variant="purple-gradient" size="lg" radius="pill" isFullWidth>
              <span className="font-heading italic text-[var(--background)]">
                홈으로 돌아가기
              </span>
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[500px] flex flex-col items-center justify-center text-center px-4">
      <FontAwesomeIcon className="text-5xl text-[var(--y2k-purple-deep)] mb-4" icon={faCircleCheck} />
      <h2 className="text-2xl font-heading mb-4">주문이 완료되었습니다</h2>
      <p className="mb-2 font-monoplex font-semibold border border-[var(--y2k-black)] p-2 rounded-lg bg-[var(--background)]">주문 번호: {orderNum}</p>
      <div>
        <p className="mb-4 font-monoplex">주문 확인은 내 주문 목록에서 확인해주세요</p>
        <Link to="/me/purchase">
          <Button variant="purple-gradient" size="lg" radius="pill">
            <span className="font-heading italic text-[var(--background)]">
                주문 목록 바로가기
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderCompletePage;
