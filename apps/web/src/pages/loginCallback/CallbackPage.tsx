import { useNavigate } from "react-router";
import { useAuthStore } from "../../store/useAuthStore";
import { useEffect } from "react";

const COOKIE_NAME = "access_token";

export default function LoginCallbackPage() {
  const { handleAccessToken } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const match = document.cookie.match(
      new RegExp(`(^| )${COOKIE_NAME}=([^;]+)`)
    );
    const accessToken = match ? match[2] : null;

    if (accessToken) {
      handleAccessToken(accessToken).then(() => {
        navigate("/");
      });
    } else {
      navigate("/login");
    }
  }, []);

  return <div>Callback Page</div>;
}
