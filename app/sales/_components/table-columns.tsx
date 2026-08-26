"use client";

import { Button } from "@/app/_components/ui/button";
import { SalesDto } from "@/app/_data-access/sale/get-sales";
import { formatBRL } from "@/app/_lib/format";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";

export const saleTableColmuns: ColumnDef<SalesDto>[] = [
  {
    accessorKey: "productName",
    header: "Produtos",
  },
  {
    accessorKey: "totalProducts",
    header: "Quantidade de Produtos",
  },
  {
    header: "Valor Total",
    cell: ({
      row: {
        original: { totalAmount },
      },
    }) => formatBRL(totalAmount),
  },
  {
    header: "Data",
    cell: ({
      row: {
        original: { date },
      },
    }) => new Date(date).toLocaleDateString("pt-BR"),
  },
  {
    header: "Ações",
    cell: () => (
      <Button variant="ghost">
        <MoreHorizontalIcon size={16} />
      </Button>
    ),
  },
];
