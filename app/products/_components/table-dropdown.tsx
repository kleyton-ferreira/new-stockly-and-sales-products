import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import DeleteProductDialog from "./delete-product-dialog";
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
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";

interface TableDropdownProps {
  product: Pick<Product, "id" | "name">;
}

const TableDropdown = ({ product }: TableDropdownProps) => {
  const handleCopyId = () => {
    const products = `${product.id} - ${product.name}`;
    toast.success("Produto copiado com sucesso.");
    return navigator.clipboard.writeText(products);
  };

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="transition-all duration-300 hover:bg-textColor-primary hover:text-white"
          >
            <MoreHorizontalIcon size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="gap-1.5" onClick={handleCopyId}>
            <ClipboardCopyIcon size={16} />
            Copiar ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="gap-1.5">
            <EditIcon size={16} />
            Editar
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          {/* BUTTON DELETE */}
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="gap-1.5">
              <TrashIcon size={16} />
              Deletar
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* AlertDialogContent - MESSAGE!*/}
      <DeleteProductDialog productsName={product.name} productId={product.id} />
    </AlertDialog>
  );
};

export default TableDropdown;
