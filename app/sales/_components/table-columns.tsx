"use client";

import { SalesDto } from "@/app/_data-access/sale/get-sales";
import { formatBRL } from "@/app/_lib/format";
import { ColumnDef } from "@tanstack/react-table";
import SaleDropdownMenu from "./sale-dropdown-menu";
import { ProductDto } from "@/app/_data-access/product/get-products";
import { ComboboxOption } from "@/app/_components/ui/combobox";

interface saleTableColmunsProps extends SalesDto {
  productsOne: ProductDto[];
  prodOptions: ComboboxOption[];
}

export const saleTableColmuns: ColumnDef<saleTableColmunsProps>[] = [
  {
    accessorKey: "productNames",
    header: () => (
      <div className="text-base font-semibold text-textColor-primary">
        <h3>Produtos</h3>
      </div>
    ),
  },
  {
    accessorKey: "totalProducts",
    header: () => (
      <div className="text-base font-semibold text-textColor-primary">
        <h3>Quantidade de Produtos</h3>
      </div>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: () => (
      <div className="text-base font-semibold text-textColor-primary">
        <h3>Valor Total</h3>
      </div>
    ),
    cell: ({
      row: {
        original: { totalAmount },
      },
    }) => formatBRL(totalAmount),
  },
  {
    accessorKey: "date",
    header: () => (
      <div className="text-base font-semibold text-textColor-primary">
        <h3>Data</h3>
      </div>
    ),
    cell: ({
      row: {
        original: { date },
      },
    }) => new Date(date).toLocaleDateString("pt-BR"),
  },
  {
    accessorKey: "action",
    header: () => (
      <div className="text-base font-semibold text-textColor-primary">
        <h3>Ações</h3>
      </div>
    ),
    cell: ({ row: { original: sale } }) => (
      <SaleDropdownMenu
        sale={sale}
        prodOptions={sale.prodOptions}
        productsOne={sale.productsOne}
      />
    ),
  },
];
