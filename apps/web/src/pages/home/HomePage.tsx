import { useNavigate } from "react-router";
import { useAuthStore } from "../../store/useAuthStore";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <h1>Hej! {user?.name}</h1>
      <h2>Wybierz swoją grupę: </h2>
      <Button>Grupa 1</Button>
      <Button onClick={() => navigate("/group/create")}>Utwórz grupę</Button>
    </div>
  );
}
