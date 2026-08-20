import { ShoppingBasket, LayoutGridIcon, PackageIcon } from "lucide-react";
import SidebarButton from "./sidebar-button";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 overflow-hidden bg-white">
      <div className="mb-4 px-8 pt-6 text-2xl">
        <h1 className="font-bold text-[hsl(168,35%,30%)] text-textColor-primary">
          STOCKLY
        </h1>
      </div>
      <div className="flex flex-col space-y-3 p-3">
        <SidebarButton href="/">
          <LayoutGridIcon size={20} />
          Dashboard
        </SidebarButton>

        <SidebarButton href="/products">
          <PackageIcon size={20} />
          Produtos
        </SidebarButton>

        <SidebarButton href="/sales">
          <ShoppingBasket size={20} />
          Vendas
        </SidebarButton>
      </div>
    </div>
  );
};

export default Sidebar;
