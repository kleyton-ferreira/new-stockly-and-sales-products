"use client";

import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";

import { useForm } from "react-hook-form";
import z from "zod";
import UpsetTable from "./upset-table";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";

const formSchema = z.object({
  productId: z.string().min(1, "O produto é obrigatório.").uuid(),
  quantity: z.coerce
    .number({ required_error: "A quantidade é obrigátoria." })
    .int("A quantidade deve ser número inteiro.")
    .positive("Aquantidade deve ser maior que zero."),
});

type FormSchema = z.infer<typeof formSchema>;

interface UpsetSideMenuProps {
  products: Product[];
  productOptions: ComboboxOption[];
}

interface selectedProductsProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const UpsetSideMenu = ({ productOptions, products }: UpsetSideMenuProps) => {
  const [selectedProducts, setSelectedProducts] = useState<
    selectedProductsProps[]
  >([]);

  const forms = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });

  const handleOnsubmit = (data: FormSchema) => {
    const selectedProduct = products.find((prod) => prod.id === data.productId);
    if (!selectedProduct) return;

    setSelectedProducts((currentProducts) => {
      const existingProduct = currentProducts.find(
        (product) => product.id === selectedProduct.id,
      );
      if (existingProduct) {
        return currentProducts.map((prod) => {
          if (prod.id === selectedProduct.id) {
            return {
              ...prod,
              quantity: prod.quantity + data.quantity,
            };
          }
          return prod;
        });
      }
      return [
        ...currentProducts,
        {
          ...selectedProduct,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        },
      ];
    });
    forms.reset();
  };

  return (
    <SheetContent className="!max-w-[736px]">
      <SheetHeader className="mb-5">
        <SheetTitle className="text-textColor-primary">Nova venda</SheetTitle>
        <SheetDescription>
          Insira as Informações da venda abaixo.
        </SheetDescription>
      </SheetHeader>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(handleOnsubmit)}>
          <div className="space-y-4">
            <FormField
              control={forms.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Produto</FormLabel>
                  <Combobox
                    placeholder="Selecione o produto"
                    options={productOptions}
                    onChange={field.onChange}
                    value={field.value}
                  />

                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={forms.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade</FormLabel>
                  <Input
                    type="number"
                    placeholder="digite a quantidade"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
          <div className="mt-8">
            <Button className="w-full" variant="destructive">
              Adicionar produto à venda
            </Button>
          </div>
        </form>
      </Form>

      {/* ESSE COMPONENTE E O COMPONENTE QUE TEM O TABLE */}
      <UpsetTable
        selectedProducts={selectedProducts}
        setSelectedProduct={setSelectedProducts}
      />
    </SheetContent>
  );
};

export default UpsetSideMenu;

// ESSE COMPONENTE E O COMPONENTE QUE ABRE O MENU LATERAL ELE TA SENDO IMPORTADO NO COMPONENTE PAI ( PAGE - SALES )
