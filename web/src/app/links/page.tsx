import { AppointmentList } from "@/components/appointments-list";
import { BusinessForm } from "@/components/business-form";
import { BusinessList } from "@/components/business-list";
import { LinksForm } from "@/components/links-form";
import { LinksList } from "@/components/links-list";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Plus, Trash } from "lucide-react";

export default function Links() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-4 md:py-10">
      <Dialog>
        <DialogTrigger asChild className="flex gap-2">
          <Button>
            <Plus className="size-5" /> Adicionar{" "}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Criar link</DialogTitle>
          </DialogHeader>
          <LinksForm />
        </DialogContent>
      </Dialog>

      <LinksList />
    </div>
  );
}
