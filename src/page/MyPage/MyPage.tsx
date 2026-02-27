import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/atoms/button/Button";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { logout } from "../../features/user/userSlice";
import { getOrder } from "../../features/order/orderSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faCrown, faBox, faChevronRight, faCircle, faStarOfLife } from "@fortawesome/free-solid-svg-icons";
import LoaderSpinner from "../../components/ui/atoms/loader-spinner/LoaderSpinner";
import OrderStatusCard from "../MyOrderPage/component/OrderStatusCard";

function MyPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const { orderList, loading } = useAppSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrder({ page: 1 }));
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const recentOrders = orderList.slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in-up">
      <h1 className="text-2xl font-heading mb-2">MY_PROFILE</h1>
      <div className="flex items-center gap-2 mb-6">
        <div className="w-5 h-5 rounded-full bg-[var(--y2k-magenta-vivid)] flex items-center justify-center">
          <FontAwesomeIcon icon={faCrown} className="text-xs text-white" />
        </div>
        <h2 className="font-monoplex font-semibold capitalize text-[var(--y2k-purple-vivid)]">{"USER_ACCESS: "}{user?.level || "-"}</h2>
      </div>
      {/* 프로필 섹션 */}
      <div className="border border-[var(--y2k-purple-vivid)] p-6 mb-8 bg-[var(--background)] relative
        after:content-[''] after:absolute after:inset-0 after:bg-[--y2k-purple-vivid] after:translate-x-1 after:translate-y-1 after:-z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-[var(--y2k-purple-vivid)] flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="text-white" />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-orbit">이름</div>
              <div className="font-monoplex font-semibold">{user?.name || "-"}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-[var(--y2k-magenta)] flex items-center justify-center">
              <FontAwesomeIcon icon={faEnvelope} className="text-white" />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-orbit">이메일</div>
              <div className="font-monoplex font-semibold text-sm truncate max-w-[200px]">{user?.email || "-"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 주문 목록 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading flex items-center gap-2">
            <FontAwesomeIcon icon={faStarOfLife} className="text-[var(--y2k-purple-deep)]" />
            MY ORDERS
          </h2>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="font-monoplex text-gray-600 hover:text-[var(--y2k-purple)]"
            onClick={() => navigate("/me/purchase")}
          >
            <span>전체보기</span>
            <FontAwesomeIcon icon={faChevronRight} className="ml-1 text-xs" />
          </Button>
        </div>

        {loading && orderList.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <LoaderSpinner />
          </div>
        ) : recentOrders.length === 0 ? (
          <div className="text-center py-12 text-gray-500 border border-dashed border-gray-300 rounded-lg">
            <FontAwesomeIcon icon={faBox} className="text-4xl mb-3 text-gray-300" />
            <p className="font-monoplex">주문 내역이 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <OrderStatusCard key={order._id} orderItem={order} />
            ))}
          </div>
        )}
      </div>

      {/* 로그아웃 버튼 */}
      <div className="relative after:content-[''] after:absolute after:inset-0 after:bg-[--y2k-black] after:translate-x-1 after:translate-y-1 after:-z-10">
        <Button
          type="button"
          variant="magenta"
          size="xl"
          radius="none"
          className="font-heading text-white"
          onClick={handleLogout}
          isFullWidth
        >
          LOGOUT_SESSION
        </Button>
      </div>
    </div>
  );
}

export default MyPage;
