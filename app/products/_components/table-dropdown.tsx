import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";

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

interface TableDropdownProps {
  product: Pick<Product, "id">;
}

const TableDropdown = ({ product }: TableDropdownProps) => {
  const handleCopyId = () => {
    return navigator.clipboard.writeText(product.id);
  };

  return (
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

        <DropdownMenuItem className="gap-1.5">
          <TrashIcon size={16} />
          Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableDropdown;
