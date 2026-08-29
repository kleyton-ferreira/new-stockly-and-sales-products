"use client";

import { PlusIcon } from "lucide-react";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { Button } from "@/app/_components/ui/button";
import UpsetSideMenu from "./upset-side-menu";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { useState } from "react";
import { ProductDto } from "@/app/_data-access/product/get-products";

interface CreateSaleButtonProps {
  products: ProductDto[];
  productOptions: ComboboxOption[];
}

const CreateSaleButton = ({
  products,
  productOptions,
}: CreateSaleButtonProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false);

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button variant="destructive" className="text-base [&_svg]:size-auto">
          <PlusIcon size={18} /> Nova venda
        </Button>
      </SheetTrigger>
      {/* AQUI VERIA O SheetContent - QUE ESTA NO COMPONENTE FILHO. UpsetSideMenu - CRIEI UM COMPONENTE SEPARADO */}
      <UpsetSideMenu
        productOptions={productOptions}
        products={products}
        onSubmitSuccess={() => setSheetIsOpen(false)}
        onOpenChange={setSheetIsOpen}
      />
    </Sheet>
  );
};

export default CreateSaleButton;
