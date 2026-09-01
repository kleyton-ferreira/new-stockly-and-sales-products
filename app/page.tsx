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

const HomePage = async () => {
  const { todayRevenue, totalRevenue, totalSales, totalStock, totalProducts } =
    await getDashboard();

  return (
    <div className="m-6 w-full space-y-8 rounded-lg">
      <Header>
        <HeaderLeft>
          <HeaderTitle>Visão geral dos dados</HeaderTitle>
          <HeaderSubTitle>Dashboard</HeaderSubTitle>
        </HeaderLeft>
      </Header>

      <div className="grid grid-cols-2 gap-6">
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

      <div className="grid grid-cols-3 gap-6">
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
    </div>
  );
};

export default HomePage;
