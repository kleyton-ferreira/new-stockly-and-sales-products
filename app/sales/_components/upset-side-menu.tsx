"use client";

import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";

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
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { toast } from "sonner";
import { CreateSaleAction } from "@/app/_actions/sale/create-sale";
import { flattenValidationErrors } from "next-safe-action";
import { ProductDto } from "@/app/_data-access/product/get-products";
import { Loader2Icon } from "lucide-react";

const formSchema = z.object({
  productId: z.string().min(1, "O produto é obrigatório.").uuid(),
  quantity: z.coerce
    .number({ required_error: "A quantidade é obrigátoria." })
    .int("A quantidade deve ser número inteiro.")
    .positive("Aquantidade deve ser maior que zero."),
});

type FormSchema = z.infer<typeof formSchema>;

interface selectedProductsProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface UpsetSideMenuProps {
  saleId?: string;
  products: ProductDto[];
  productOptions: ComboboxOption[];
  onSubmitSuccess: () => void;
  defaultSelectedProducts?: selectedProductsProps[];
  onOpenChange?: (open: boolean) => void;
}

const UpsetSideMenu = ({
  saleId,
  productOptions,
  products,
  onSubmitSuccess,
  defaultSelectedProducts,
  onOpenChange,
}: UpsetSideMenuProps) => {
  const [selectedProducts, setSelectedProducts] = useState<
    selectedProductsProps[]
  >(defaultSelectedProducts ?? []);

  const { execute: executeCreateSale, isPending } = useAction(
    CreateSaleAction,
    {
      onError: ({ error: { validationErrors, serverError } }) => {
        const flattenedErrors = flattenValidationErrors(validationErrors);
        toast.error(serverError ?? flattenedErrors.formErrors[0]);
      },
      onSuccess: () => {
        // Verifica se tem saleId (significa que está editando)
        if (saleId) {
          toast.success("Venda atualizada com sucesso.");
        } else {
          toast.success("Venda realizada com sucesso.");
        }

        setSelectedProducts([]);
        forms.reset();

        // Fechar o sheet - prioridade para onOpenChange
        if (onOpenChange) {
          onOpenChange(false);
        }

        // Chamar callback de sucesso
        onSubmitSuccess();
      },
    },
  );

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
        const productIsOuOfStock =
          existingProduct.quantity + data.quantity > selectedProduct.stock;
        if (productIsOuOfStock) {
          forms.setError("quantity", {
            message: "Quantidade indisponível em estoque.",
          });
          return currentProducts;
        }

        forms.reset();
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

      const productIsOuOfStock = data.quantity > selectedProduct.stock;
      if (productIsOuOfStock) {
        forms.setError("quantity", {
          message: "Quantidade indisponível em estoque.",
        });
        return currentProducts;
      }
      forms.reset();
      return [
        ...currentProducts,
        {
          ...selectedProduct,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        },
      ];
    });
  };

  const handleCreateSales = async () => {
    // Validar se há produtos selecionados
    if (selectedProducts.length === 0) {
      toast.error("Adicione pelo menos um produto à venda.");
      return;
    }

    executeCreateSale({
      id: saleId,
      products: selectedProducts.map((prod) => ({
        id: prod.id,
        quantity: prod.quantity,
        price: prod.price,
      })),
    });
  };

  return (
    <SheetContent className="!max-w-[736px]">
      <SheetHeader className="mb-5">
        <SheetTitle className="text-textColor-primary">
          {saleId ? "Editar venda" : "Nova venda"}
        </SheetTitle>
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
            <Button className="w-full" variant="destructive" type="submit">
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

      <SheetFooter className="mt-5">
        <Button
          variant="destructive"
          className="w-full"
          disabled={selectedProducts.length === 0 || isPending}
          onClick={handleCreateSales}
        >
          {isPending ? (
            <>
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              {saleId ? "Atualizando..." : "Finalizando..."}
            </>
          ) : saleId ? (
            "Atualizar venda"
          ) : (
            "Finalizar venda"
          )}
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};

export default UpsetSideMenu;
