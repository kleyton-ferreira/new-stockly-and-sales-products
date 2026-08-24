import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import { ClipboardCopyIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";

interface TableDropdownMenuProps {
  product: Pick<Product, "id">;
  onDelete: () => void;
}

const TableDropdownMenu = ({ product, onDelete }: TableDropdownMenuProps) => {
  const handleCopyId = () => {
    toast.success("Id copiado com sucesso.");
    return navigator.clipboard.writeText(product.id);
  };

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost">
            <MoreHorizontalIcon size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="group" onClick={handleCopyId}>
            <div className="flex items-center gap-1.5 transition-all duration-200 ease-in hover:text-textColor-primary">
              <ClipboardCopyIcon size={16} />
              Copiar ID
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="group" onClick={() => onDelete()}>
              <div className="flex items-center gap-1.5 transition-all duration-200 ease-in hover:text-textColor-primary">
                <TrashIcon size={16} /> Deletar
              </div>
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
    </AlertDialog>
  );
};

export default TableDropdownMenu;

// ESSE COMPONENTE E O COMPONENTE DE DELETAR OS PRODUTOS DE VENDA AONDE TEM AÇOES E O ICONE QUANDO APARECE
