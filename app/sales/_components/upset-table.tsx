"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { formatBRL } from "@/app/_lib/format";
import { useMemo } from "react";

interface SelectedProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface UpsetTableProps {
  selectedProducts: SelectedProduct[];
}

interface UpsetTableProps {
  selectedProducts: SelectedProduct[];
}

const UpsetTable = ({ selectedProducts }: UpsetTableProps) => {
  const productTotal = useMemo(() => {
    return selectedProducts.reduce((acc, prodValue) => {
      return acc + prodValue.price * prodValue.quantity;
    }, 0);
  }, [selectedProducts]);
  return (
    <Table>
      <TableCaption>A lista de produtos a venda.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Produto</TableHead>
          <TableHead>Preço Unitário</TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {selectedProducts.map((productItens) => (
          <TableRow key={productItens.id}>
            <TableCell> {productItens.name} </TableCell>
            <TableCell> {formatBRL(productItens.price)} </TableCell>
            <TableCell> {productItens.quantity} </TableCell>
            <TableCell>
              {formatBRL(productItens.price * productItens.quantity)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell> {formatBRL(productTotal)} </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default UpsetTable;
