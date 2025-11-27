import { useAuthStore } from "@/store/useAuthStore";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const href = `${import.meta.env.VITE_API_AUTH_URL}/google/redirect`;

  if (user) {
    navigate("/");
  }

  return (
    <div className="flex justify-center items-center h-full w-full">
      <Link hrefLang={href} to={href}>
        <Button>Zaloguj się z google</Button>
      </Link>
    </div>
  );
}
