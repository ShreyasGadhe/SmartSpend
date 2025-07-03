"use client";
import React from "react";
import Logo from "./logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeSwitchBtn } from "./ThemeSwitchBtn";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <>
      <DesktopNavbar />
    </>
  );
}

const items = [
  { label: "Dashboard", link: "/" },
  { label: "Transactions", link: "/transactions" },
  { label: "Manage", link: "/manage" },
];

function DesktopNavbar() {
  return (
    <div className="hidden border-separate border-b bg-background md:block">
      <nav className="container flex items-center justfy-between px-8 w-full">
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4 w-full">
          <Logo />
          <div className="flex h-full w-full justify-end gap-x-8 items-center">
            {items.map((item) => (
              <NavbarItem
                key={item.label}
                label={item.label}
                link={item.link}
              />
            ))}
          </div>
          <div className="h-full  flex items-center justify-center gap-x-8">
            <ThemeSwitchBtn />
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </div>
      </nav>
    </div>
  );
}

function NavbarItem({ link, label }: { link: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === link;
  return (
    <div
      className={cn(
        "relative flex items-center hover:border border-white h-[35] px-4 rounded-lg ",
        isActive && "bg-zinc-500"
      )}
    >
      <Link href={link}>{label}</Link>
    </div>
  );
}
