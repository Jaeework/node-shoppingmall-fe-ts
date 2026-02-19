import { Link } from "react-router-dom";
import Button from "../../components/ui/atoms/button/Button";

function NotFoundPage() {
  return (
    <div className="max-w-md mx-auto text-center p-8">
      <h1 className="text-6xl font-heading text-[var(--foreground)] mb-4 tracking-tight">
        404
      </h1>
      <h2 className="text-2xl font-heading text-[var(--foreground)] mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-8 max-w-sm mx-auto leading-relaxed">
        요청하신 페이지를 찾을 수 없습니다.
      </p>
      <Link to="/">
        <Button variant="purple-gradient" size="lg" radius="pill" isFullWidth>
          <span className="font-heading italic text-[var(--background)]">
            홈으로 돌아가기
          </span>
        </Button>
      </Link>
    </div>
  );
}

export default NotFoundPage;
