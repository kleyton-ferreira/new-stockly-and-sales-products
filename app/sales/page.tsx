import { getProducts } from "../_data-access/product/get-products";
import { ComboboxOption } from "../_components/ui/combobox";
import CreateSaleButton from "./_components/create-sale-button";

const SalesPage = async () => {
  const product = await getProducts();
  const productionsOptionValues: ComboboxOption[] = product.map((prod) => ({
    label: prod.name,
    value: prod.id,
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
    </div>
  );
};

export default SalesPage;
