import Header, {
  HeaderLeft,
  HeaderSubTitle,
  HeaderTitle,
} from "./_components/header";

const HomePage = () => {
  return (
    <Header>
      <HeaderLeft>
        <HeaderTitle>Visão geral dos dados</HeaderTitle>
        <HeaderSubTitle>Dashboard</HeaderSubTitle>
      </HeaderLeft>
    </Header>
  );
};

export default HomePage;
