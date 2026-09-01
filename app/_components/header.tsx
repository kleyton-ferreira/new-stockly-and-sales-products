import { ReactNode } from "react";
import { cn } from "../_lib/utils";

const Header = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={cn("w-full p-6", className)}>{children}</div>;
};

export default Header;

export const HeaderTitle = ({ children }: { children: ReactNode }) => {
  return (
    <p className="text-sm font-semibold text-textColor-primary">{children}</p>
  );
};

export const HeaderSubTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className="text-xl font-semibold text-textColor-third">{children}</h2>
  );
};

export const HeaderLeft = ({ children }: { children: ReactNode }) => {
  return <div className="space-y-0">{children}</div>;
};
