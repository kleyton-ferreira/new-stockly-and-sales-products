"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/app/_components/ui/button";
import { PlusIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Input } from "@/app/_components/ui/input";
import { NumericFormat } from "react-number-format";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome do produto é obrigatório",
  }),
  price: z.number().min(0.01, {
    message: "O preço do produto é obrigatório.",
  }),
  stock: z.number().min(0, {
    message: "A quantidade de estoque é obrigatória.",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

const AddProductButton = () => {
  const forms = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 1,
    },
  });

  const handleOnsubmit = (data: FormSchema) => {
    console.log({ data });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="text-base [&_svg]:size-auto">
          <PlusIcon size={18} /> Novo produto
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(handleOnsubmit)}>
            <DialogHeader>
              <DialogTitle className="font-semibold text-textColor-primary">
                Criar Produto
              </DialogTitle>
              <DialogDescription>
                Informações do produto abaixo
              </DialogDescription>
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
                  <Button variant="ghost" type="reset">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button variant="destructive" type="submit">
                  Salvar
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductButton;
