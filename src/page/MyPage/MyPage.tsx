import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/atoms/button/Button";
import { useAppDispatch } from "../../features/hooks";
import { logout } from "../../features/user/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox } from "@fortawesome/free-solid-svg-icons";

function MyPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="flex flex-col w-full flex-1 px-8 py-4 items-center">
      <div>마이 페이지 제작중입니다.</div>
      <div className="flex-1">
        <div className="">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="underline font-monoplex text-gray-600"
            onClick={() => navigate("/me/purchase")}
          >
            <span>더 보기...</span>
          </Button>
        </div>
        <div>나의 주문 정보 표시</div>
      </div>
      <div className="w-full flex justify-center items-center mb-8">
        <Button
          type="button"
          variant="ghost"
          onClick={handleLogout}
        >
          <span className="font-monoplex text-gray-400 underline">로그아웃</span>
        </Button>
      </div>
    </div>
  );
}

export default MyPage;
