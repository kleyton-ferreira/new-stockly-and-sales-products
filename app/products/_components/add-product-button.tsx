"use client";

import { Button } from "@/app/_components/ui/button";
import { PlusIcon } from "lucide-react";

import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";

import { useState } from "react";
import UpsetProductDialog from "./upset-product-dialog";

const AddProductButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="text-base [&_svg]:size-auto">
          <PlusIcon size={18} /> Novo produto
        </Button>
      </DialogTrigger>

      <UpsetProductDialog onSucess={() => setDialogIsOpen(false)} />
    </Dialog>
  );
};

export default AddProductButton;
