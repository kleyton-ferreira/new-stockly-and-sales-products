"use client";

import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import DeleteProductDialog from "./delete-product-dialog";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import UpsetProductDialogInput from "./upset-product-dialog-input";
import { useState } from "react";

interface TableDropdownProps {
  product: Pick<Product, "id" | "name" | "price" | "stock">;
}

const TableDropdown = ({ product }: TableDropdownProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleCopyId = () => {
    const products = `${product.id} - ${product.name}`;
    toast.success("Produto copiado com sucesso.");
    return navigator.clipboard.writeText(products);
  };

  return (
    <AlertDialog>
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="transition-all duration-300 hover:bg-textColor-primary hover:text-white"
            >
              <MoreHorizontalIcon size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="space-y-2">
            <DropdownMenuLabel className="font-semibold text-textColor-primary">
              Ações
            </DropdownMenuLabel>

            <DropdownMenuItem className="group gap-1.5" onClick={handleCopyId}>
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

            {/* BUTTON DELETE */}
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

        {/* COMPONENTS - FILHO - ESTOU IMPORTANDO ELE AQUI.. AQUI ELE E O BUTTON DE EDITAR OS PRODUTOS - SO ESTOU REUTILIZANDO.. ESSE COMPONENTE*/}
        <UpsetProductDialogInput
          defaultValues={{
            id: product.id,
            name: product.name,
            price: Number(product.price),
            stock: product.stock,
          }}
          onSucess={() => setEditDialogOpen(false)}
        />
        <DeleteProductDialog
          productsName={product.name}
          productId={product.id}
        />
      </Dialog>
    </AlertDialog>
  );
};

export default TableDropdown;
