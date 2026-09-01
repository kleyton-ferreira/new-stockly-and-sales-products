import {
  CircleDollarSign,
  DollarSign,
  PackageIcon,
  ShoppingBasketIcon,
} from "lucide-react";
import SummaryCard, {
  SummaryCardIcon,
  SummaryCardValue,
  SummaryCardTitle,
} from "./(dashboard)/summary-card";
import Header, {
  HeaderLeft,
  HeaderSubTitle,
  HeaderTitle,
} from "./_components/header";

import { getDashboard } from "./_data-access/dashboard/get-dashboard";
import { formatBRL } from "./_lib/format";
import RevenueChart from "./(dashboard)/revenue-chart";
import MostSoldProductItem from "./(dashboard)/most-sold-product-item";

const HomePage = async () => {
  const {
    todayRevenue,
    totalRevenue,
    totalSales,
    totalStock,
    totalProducts,
    totalLast14DaysRevenue,
    mostSoldProducts,
  } = await getDashboard();

  return (
    <div className="m-3 w-full space-y-4 rounded-lg sm:m-4 sm:space-y-6 md:m-6 md:space-y-8">
      <Header>
        <HeaderLeft>
          <HeaderTitle>Visão geral dos dados</HeaderTitle>
          <HeaderSubTitle>Dashboard</HeaderSubTitle>
        </HeaderLeft>
      </Header>

      {/* Grid 2 Colunas - Receita */}
      <div className="grid grid-cols-1 gap-3 sm:w-full sm:grid-cols-2 sm:gap-4 md:gap-6">
        <SummaryCard>
          <SummaryCardIcon> {<DollarSign />} </SummaryCardIcon>
          <SummaryCardTitle>Receita total</SummaryCardTitle>
          <SummaryCardValue>{formatBRL(totalRevenue)}</SummaryCardValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryCardIcon> {<DollarSign />} </SummaryCardIcon>
          <SummaryCardTitle>Receita de hoje</SummaryCardTitle>
          <SummaryCardValue> {formatBRL(todayRevenue)} </SummaryCardValue>
        </SummaryCard>
      </div>

      {/* Grid 3 Colunas - KPIs */}
      <div className="grid grid-cols-1 gap-3 sm:w-full sm:grid-cols-2 sm:gap-4 md:gap-6 lg:grid-cols-3">
        <SummaryCard>
          <SummaryCardIcon> {<PackageIcon />} </SummaryCardIcon>
          <SummaryCardTitle>Vendas de hoje</SummaryCardTitle>
          <SummaryCardValue> {totalSales} </SummaryCardValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryCardIcon> {<CircleDollarSign />} </SummaryCardIcon>
          <SummaryCardTitle>Total em estoque</SummaryCardTitle>
          <SummaryCardValue> {totalStock} </SummaryCardValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryCardIcon> {<ShoppingBasketIcon />} </SummaryCardIcon>
          <SummaryCardTitle>Produtos</SummaryCardTitle>
          <SummaryCardValue> {totalProducts} </SummaryCardValue>
        </SummaryCard>
      </div>

      <div className="grid min-h-0 grid-cols-[minmax(0,2.5fr),minmax(0,1fr)] gap-6">
        <div className="flex flex-col overflow-hidden rounded-xl bg-white p-3 sm:p-4 md:p-6">
          <p className="pt-2 text-base font-bold text-textColor-primary sm:pt-3 sm:text-lg">
            Receita Total
          </p>
          <p className="text-xs text-textColor-secondary sm:text-sm">
            Útimos 14 dias
          </p>
          <RevenueChart data={totalLast14DaysRevenue} />
        </div>
        <div className="space-y-6 overflow-auto pt-9">
          <p className="font-semibold text-textColor-primary">
            Produtos mais vendido
          </p>
          {mostSoldProducts.map((prodItem) => (
            <MostSoldProductItem key={prodItem.productId} product={prodItem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
