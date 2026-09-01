import { Badge } from "@/app/_components/ui/badge";
import { ProductStatus } from "@/app/_data-access/product/get-products";
import { CircleIcon } from "lucide-react";

interface ProductStatusBadgeProps {
  status: ProductStatus;
}

const ProductStatusBadge = ({ status }: ProductStatusBadgeProps) => {
  const getStatusLabel = (status: string) => {
    if (status === "OUT_OF_STOCK") {
      return "Fora de estoque";
    }
    if (status === "IN_STOCK") {
      return "Em estoque";
    }
    return status;
  };

  const label = getStatusLabel(status);

  return (
    <Badge
      variant={label === "Em estoque" ? "destructive" : "outline"}
      className="gap-1.5"
    >
      <CircleIcon
        size={10}
        className={`${
          label === "Em estoque" ? "fill-primary-foreground" : "fill-foreground"
        }`}
      />
      {label}
    </Badge>
  );
};

export default ProductStatusBadge;
