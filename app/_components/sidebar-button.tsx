"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

interface SidebarButtonProps {
  children: React.ReactNode;
  href: string;
}

const SidebarButton = ({ href, children }: SidebarButtonProps) => {
  const pathaname = usePathname();

  return (
    <Button
      variant={pathaname === `${href}` ? "destructive" : "ghost"}
      className="justify-start [&_svg]:size-auto"
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

export default SidebarButton;
