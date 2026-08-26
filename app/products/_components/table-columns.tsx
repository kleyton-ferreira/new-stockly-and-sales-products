"use client";

import { Badge } from "@/app/_components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon } from "lucide-react";
import TableDropdown from "./table-dropdown";
import { formatBRL } from "@/app/_lib/format";
import { ProductDto } from "@/app/_data-access/product/get-products";

const getStatusLabel = (status: string) => {
  if (status === "OUT_OF_STOCK") {
    return "Fora de estoque";
  }
  if (status === "IN_STOCK") {
    return "Em estoque";
  }
};

export const productTablecolumns: ColumnDef<ProductDto>[] = [
  {
    accessorKey: "name",
    header: () => (
      <div className="text-base font-semibold text-textColor-primary">
        <h3>Produto</h3>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: () => (
      <div className="text-base font-semibold text-textColor-primary">
        <h3>Valor unitário</h3>
      </div>
    ),
    cell: (row) => formatBRL(Number(row.row.original.price)),
  },
  {
    accessorKey: "stock",
    header: () => (
      <div className="text-base font-semibold text-textColor-primary">
        <h3>Estoque</h3>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => (
      <div className="text-base font-semibold text-textColor-primary">
        <h3>Status</h3>
      </div>
    ),
    cell: (row) => {
      const product = row.row.original;
      const label = getStatusLabel(product.status);
      return (
        <Badge
          variant={label === "Em estoque" ? "destructive" : "outline"}
          className="gap-1.5"
        >
          <CircleIcon
            size={10}
            className={`${label === "Em estoque" ? "fill-primary-foreground" : "fill-foreground"}`}
          />
          {label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => (
      <div className="text-base font-semibold text-textColor-primary">
        <h3>Ações</h3>
      </div>
    ),
    cell: (row) => {
      const product = row.row.original;
      return <TableDropdown product={product} />;
    },
  },
];
