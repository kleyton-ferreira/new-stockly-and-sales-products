import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Sale } from "@prisma/client";

import {
  MoreHorizontalIcon,
  ClipboardCopyIcon,
  EditIcon,
  TrashIcon,
} from "lucide-react";
import { toast } from "sonner";
import DeleteSalectDialog from "./delete-sale-dialog";

interface SaleDeopdownMenuProps {
  sale: Pick<Sale, "id">;
}

const SaleDeopdownMenu = ({ sale }: SaleDeopdownMenuProps) => {
  const handleCopySale = () => {
    toast.success("Id copiado com sucesso.");
    return navigator.clipboard.writeText(sale.id);
  };

  return (
    <AlertDialog>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontalIcon
                size={16}
                className="text-bg-textGreen-primary"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="space-y-2">
            <DropdownMenuLabel className="font-semibold text-textColor-primary">
              Ações
            </DropdownMenuLabel>

            <DropdownMenuItem
              className="group gap-1.5"
              onClick={handleCopySale}
            >
              <div className="flex items-center gap-2">
                <ClipboardCopyIcon
                  size={16}
                  className="transition-colors duration-300 group-hover:text-textColor-primary"
                />
                <p className="transition-colors duration-300 group-hover:text-textColor-primary">
                  Copiar ID
                </p>
              </div>
            </DropdownMenuItem>

            <DialogTrigger asChild>
              <DropdownMenuItem className="group gap-1.5">
                <div className="flex items-center gap-2">
                  <EditIcon
                    size={16}
                    className="transition-colors duration-300 group-hover:text-textColor-primary"
                  />
                  <p className="transition-colors duration-300 group-hover:text-textColor-primary">
                    Editar
                  </p>
                </div>
              </DropdownMenuItem>
            </DialogTrigger>

            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="group gap-1.5">
                <div className="flex items-center gap-2">
                  <TrashIcon
                    size={16}
                    className="transition-colors duration-300 group-hover:text-textColor-primary"
                  />
                  <p className="transition-colors duration-300 group-hover:text-textColor-primary">
                    Deletar
                  </p>
                </div>
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <DeleteSalectDialog salesId={sale.id} />
      </Dialog>
    </AlertDialog>
  );
};

export default SaleDeopdownMenu;
