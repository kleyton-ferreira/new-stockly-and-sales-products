"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { Dialog } from "@/app/_components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";

import {
  MoreHorizontalIcon,
  ClipboardCopyIcon,
  EditIcon,
  TrashIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { useState } from "react";
import UpsetSideMenu from "./upset-side-menu";
import DeleteSalectDialog from "./delete-sale-dialog";
import { ProductDto } from "@/app/_data-access/product/get-products";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { SalesDto } from "@/app/_data-access/sale/get-sales";

interface SaleDeopdownMenuProps {
  sale: Pick<SalesDto, "id" | "saleProduct">;
  productsOne: ProductDto[];
  prodOptions: ComboboxOption[];
}

const SaleDropdownMenu = ({
  sale,
  prodOptions,
  productsOne,
}: SaleDeopdownMenuProps) => {
  const [upsertSheetIsOpen, setUpsertSheetIsOpen] = useState(false);

  const handleCopySale = () => {
    toast.success("Id copiado com sucesso.");
    return navigator.clipboard.writeText(sale.id);
  };

  return (
    <Sheet open={upsertSheetIsOpen} onOpenChange={setUpsertSheetIsOpen}>
      <AlertDialog>
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

            <SheetTrigger>
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
            </SheetTrigger>

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
        <UpsetSideMenu
          saleId={sale.id}
          productOptions={prodOptions || []}
          products={productsOne || []}
          onSubmitSuccess={() => setUpsertSheetIsOpen(false)}
          onOpenChange={setUpsertSheetIsOpen}
          defaultSelectedProducts={sale.saleProduct.map((slProducts) => ({
            id: slProducts.productId,
            quantity: slProducts.quantity,
            price: Number(slProducts.unitPrice),
            name: slProducts.productName,
          }))}
        />
      </AlertDialog>
    </Sheet>
  );
};

export default SaleDropdownMenu;
