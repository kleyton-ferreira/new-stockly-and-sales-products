"use client";

import { ColumnDef } from "@tanstack/react-table";
import TableDropdown from "./table-dropdown";
import { formatBRL } from "@/app/_lib/format";
import { ProductDto } from "@/app/_data-access/product/get-products";
import ProductStatusBadge from "./product-status-badge";

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
    cell: ({ row }) => {
      const status = row.original.status;
      return <ProductStatusBadge status={status} />;
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
