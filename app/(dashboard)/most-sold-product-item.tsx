import { MostSoldProductDto } from "../_data-access/dashboard/get-dashboard";
import { formatBRL } from "../_lib/format";
import ProductStatusBadge from "../products/_components/product-status-badge";

interface MostSoldProductItemProps {
  product: MostSoldProductDto;
}

const MostSoldProductItem = ({ product }: MostSoldProductItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <ProductStatusBadge status={product.status} />
        <h2 className="text-lg font-semibold text-textColor-third">
          {product.name}
        </h2>
        <p className="text-base text-textColor-secondary">
          {formatBRL(Number(product.price))}
        </p>
      </div>
      <div>
        <p className="font-bold text-textColor-secondary">
          {product.totalRevenue} - vendido(s)
        </p>
      </div>
    </div>
  );
};

export default MostSoldProductItem;
