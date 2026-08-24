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
import TableDropdownMenu from "./table-dropdown-menu";
import { toast } from "sonner";

interface SelectedProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface UpsetTableProps {
  selectedProducts: SelectedProduct[];
  setSelectedProduct: (products: SelectedProduct[]) => void;
}

interface UpsetTableProps {
  selectedProducts: SelectedProduct[];
}

const UpsetTable = ({
  selectedProducts,
  setSelectedProduct,
}: UpsetTableProps) => {
  const handleDeleteProduct = (productId: string) => {
    const updatedProductsDelete = selectedProducts.filter(
      (product) => product.id !== productId,
    );
    toast.success("Produto deletado com sucesso.");
    setSelectedProduct(updatedProductsDelete);
  };

  const productTotal = useMemo(() => {
    return selectedProducts.reduce((acc, prodValue) => {
      return acc + prodValue.price * prodValue.quantity;
    }, 0);
  }, [selectedProducts]);
  return (
    <Table>
      <TableCaption>A lista de produtos adicionado à venda.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Produto</TableHead>
          <TableHead>Preço Unitário</TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Ações</TableHead>
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
            <TableCell>
              {/* COMPONENTE IMPORTADO.. PARA DELEÇAO DOS PRODUTOS DE VENDA.. ESSA FUNÇAO EU TENHO O setSelectedProducts E ELE ESTA NO COMPONENTE PAI - Upset-side-menu E LA EU APENAS PASSO O   setSelectedProducts={setSelectedProducts} SO PRA PEGAR O STATE */}
              <TableDropdownMenu
                product={productItens}
                onDelete={() => handleDeleteProduct(productItens.id)}
              />
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
