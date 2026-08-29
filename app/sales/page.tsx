import { getProducts } from "../_data-access/product/get-products";
import { getSales } from "../_data-access/sale/get-sales";
import { ComboboxOption } from "../_components/ui/combobox";
import CreateSaleButton from "./_components/create-sale-button";
import { DataTable } from "../_components/ui/data-table";
import { saleTableColmuns } from "./_components/table-columns";

const SalesPage = async () => {
  const product = await getProducts();
  const sales = await getSales();

  const productionsOptionValues: ComboboxOption[] = product.map((prod) => ({
    label: prod.name,
    value: prod.id,
  }));

  const tableData = sales.map((item) => ({
    ...item,
    productsOne: product,
    prodOptions: productionsOptionValues,
  }));

  return (
    <div className="w-full p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-textColor-primary">
            Vendas
          </h2>
          <h3 className="text-xl font-semibold text-textColor-third">
            Gestão de produtos
          </h3>
        </div>

        {/* ESSE COMPONENTE FOI CRIADO PARA TER UMA INTERAÇAO E PRA FECHARMOS O SHEET QUANDO CRIAR A VENDA */}
        <CreateSaleButton
          productOptions={productionsOptionValues}
          products={JSON.parse(JSON.stringify(product))}
        />
      </div>
      <DataTable
        columns={saleTableColmuns}
        data={JSON.parse(JSON.stringify(tableData))}
      />
    </div>
  );
};

export default SalesPage;
