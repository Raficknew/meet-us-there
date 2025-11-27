import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GroupForm } from "./groupForm";

export const GroupCreateDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Stwórz Grupę</DialogTitle>
        </DialogHeader>
        <GroupForm />
      </DialogContent>
    </Dialog>
  );
};
