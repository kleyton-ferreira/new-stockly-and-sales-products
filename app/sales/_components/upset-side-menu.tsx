"use client";

import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
});

type FormSchema = z.infer<typeof formSchema>;

interface UpsetSideMenuProps {
  productOptions: ComboboxOption[];
}

const UpsetSideMenu = ({ productOptions }: UpsetSideMenuProps) => {
  const forms = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });

  return (
    <SheetContent>
      <SheetHeader className="mb-5">
        <SheetTitle className="text-textColor-primary">Nova venda</SheetTitle>
        <SheetDescription>
          Insira as Informações da venda abaixo.
        </SheetDescription>
      </SheetHeader>
      <Form {...forms}>
        <form>
          <div className="space-y-4">
            <FormField
              control={forms.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Produto</FormLabel>
                  <Combobox
                    placeholder="Selecione o produto"
                    {...field}
                    options={productOptions}
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
        </form>
      </Form>
    </SheetContent>
  );
};

export default UpsetSideMenu;

// ESSE COMPONENTE E O COMPONENTE QUE ABRE O MENU LATERAL ELE TA SENDO IMPORTADO NO COMPONENTE PAI ( PAGE - SALES )
