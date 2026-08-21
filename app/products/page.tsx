import { DataTable } from "../_components/ui/data-table";
import { productTablecolumns } from "./_components/table-columns";

import { getProducts } from "../_data-access/product/get-products";
import AddProductButton from "./_components/add-product-button";

const ProductsPage = async () => {
  const products = await getProducts();

  return (
    <div className="w-full p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-textColor-primary">
            Produtos
          </h2>
          <h3 className="text-xl font-semibold text-textColor-third">
            Gestão de produtos
          </h3>
        </div>
        <AddProductButton />
      </div>
      <div>
        <DataTable
          columns={productTablecolumns}
          data={JSON.parse(JSON.stringify(products))}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
