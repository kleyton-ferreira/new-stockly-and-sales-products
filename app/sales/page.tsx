import { PlusIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { Sheet, SheetTrigger } from "../_components/ui/sheet";
import UpsetSideMenu from "./_components/upset-side-menu";
import { getProducts } from "../_data-access/product/get-products";
import { ComboboxOption } from "../_components/ui/combobox";

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

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="destructive"
              className="text-base [&_svg]:size-auto"
            >
              <PlusIcon size={18} /> Nova venda
            </Button>
          </SheetTrigger>
          {/* AQUI VERIA O SheetContent - QUE ESTA NO COMPONENTE FILHO. UpsetSideMenu - CRIEI UM COMPONENTE SEPARADO */}
          <UpsetSideMenu productOptions={productionsOptionValues} products={product} />
        </Sheet>
      </div>
    </div>
  );
};

export default SalesPage;
