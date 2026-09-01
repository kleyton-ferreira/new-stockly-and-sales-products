import { ReactNode } from "react";

export const HeaderTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className="text-xl font-bold text-textColor-primary"> {children} </h2>
  );
};

export const HeaderSubTitle = ({ children }: { children: ReactNode }) => {
  return <p className="text-textGreen-primary text-sm font-bold">{children}</p>;
};

export const HeaderLeft = ({ children }: { children: ReactNode }) => {
  return <div className="space-y-1"> {children} </div>;
};

export const HeaderRight = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mb-6 flex items-center justify-between">{children}</div>
  );
};

export const HeaderContainer = ({ children }: { children: ReactNode }) => {
  return <div className="flex items-center justify-between">{children}</div>;
};

const Header = ({ children }: { children: ReactNode }) => {
  return <div className="w-full p-8">{children}</div>;
};

export default Header;
