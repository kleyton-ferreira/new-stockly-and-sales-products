"use client";

import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/app/_components/ui/input";
import { NumericFormat } from "react-number-format";
import { createdProduct } from "@/app/_actions/product/create-products";
import { useForm } from "react-hook-form";

import {
  CreatedProductSchema,
  createdProductSchema,
} from "@/app/_actions/product/schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { useAction } from "next-safe-action/hooks";

interface UpsetProductDialogInputProps {
  defaultValues?: CreatedProductSchema;
  onSucess?: () => void;
}

const UpsetProductDialogInput = ({
  onSucess,
  defaultValues,
}: UpsetProductDialogInputProps) => {
  const { execute: executeCreatedProducts, isPending } = useAction(
    createdProduct,
    {
      onSuccess: () => {
        if (defaultValues) {
          toast.success("Produto atualizado com sucesso.");
        } else {
          toast.success("Produto salvo com sucesso.");
        }

        forms.reset();
        onSucess?.();
      },
      onError: () => {
        toast.error("Ocorreu um erro ao salvar o produto.");
      },
    },
  );

  const forms = useForm({
    resolver: zodResolver(createdProductSchema),
    defaultValues: defaultValues ?? {
      name: "",
      price: 0,
      stock: 1,
    },
  });

  const isEditing = !!defaultValues;

  return (
    <DialogContent>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(executeCreatedProducts)}>
          <DialogHeader>
            <DialogTitle className="font-semibold text-textColor-primary">
              {isEditing ? "Editar" : "Criar"} Produto
            </DialogTitle>
            <DialogDescription>Informações do produto abaixo</DialogDescription>
          </DialogHeader>

          <div className="mt-5 space-y-4">
            <FormField
              control={forms.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do produto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o Produto"
                      error={!!forms.formState.errors.name}
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={forms.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <NumericFormat
                      customInput={Input}
                      id="price"
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="R$ "
                      decimalScale={2}
                      fixedDecimalScale
                      placeholder="R$ 0,00"
                      error={!!forms.formState.errors.price}
                      disabled={isPending}
                      value={field.value}
                      onValueChange={(values) => {
                        field.onChange(values.floatValue ?? 0);
                      }}
                      onBlur={field.onBlur}
                      name={field.name}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={forms.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estoque</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      error={!!forms.formState.errors.stock}
                      placeholder="Digite o estoque do Produto"
                      disabled={isPending}
                      {...field}
                      onChange={(e) => {
                        const value = e.target.valueAsNumber;
                        field.onChange(isNaN(value) ? 0 : value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost" type="reset" disabled={isPending}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                className="w-[30%]"
                variant="destructive"
                type="submit"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    Finalizando...
                  </>
                ) : (
                  "Salvar"
                )}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsetProductDialogInput;
