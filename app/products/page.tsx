import { DataTable } from "../_components/ui/data-table";
import { productTablecolumns } from "./_components/table-columns";
import { db } from "../_lib/prisma";
import { PlusIcon } from "lucide-react";
import { Button } from "../_components/ui/button";

const ProductsPage = async () => {
  const products = await db.product.findMany({});

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
        <div>
          <Button variant="destructive" className="text-base [&_svg]:size-auto">
            <PlusIcon size={18} /> Novo produto
          </Button>
        </div>
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
