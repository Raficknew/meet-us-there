import { useNavigate } from "react-router";
import { useAuthStore } from "../../store/useAuthStore";
import { useEffect } from "react";

export default function HomePage() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  console.log("Current user:", user);

  return (
    <div>
      {user?.name}
      <div>v</div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}
