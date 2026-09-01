import { ReactNode } from "react";
import { cn } from "../_lib/utils";

export const SummaryCardIcon = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className="mb-2 flex h-9 w-9 items-center justify-center rounded-md bg-opacity-10 text-textColor-primary">
      {children}
    </h2>
  );
};

export const SummaryCardTitle = ({ children }: { children: ReactNode }) => {
  return (
    <p className="text-sm font-medium text-textColor-secondary">{children}</p>
  );
};

export const SummaryCardValue = ({ children }: { children: ReactNode }) => {
  return (
    <div className="text-2xl font-medium text-textColor-third">{children}</div>
  );
};

const SummaryCard = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "rounded-xl bg-gradient-to-br from-slate-50 to-slate-300 p-6",
        "transition-transform duration-300 hover:scale-105",
        "group relative overflow-hidden",
        "shadow-lg hover:shadow-xl",
        className,
      )}
    >
      {/* Borda animada na esquerda */}
      <div className="absolute bottom-0 left-0 top-0 w-1 bg-[#00A180] opacity-0 transition-opacity duration-300 group-hover:animate-pulse group-hover:opacity-100" />

      {/* Conteúdo */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default SummaryCard;
