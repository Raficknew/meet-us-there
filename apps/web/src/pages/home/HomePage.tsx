import { useNavigate } from "react-router";
import { useAuthStore } from "../../store/useAuthStore";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GroupCreateDialog } from "@/features/group/components/groupCreateDialog";

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
      <GroupCreateDialog />
    </div>
  );
}
