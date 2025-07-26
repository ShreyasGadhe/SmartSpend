"use client";
import React, { useState } from "react";
import Logo from "./logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeSwitchBtn } from "./ThemeSwitchBtn";
import { UserButton } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
}

const items = [
  { label: "Dashboard", link: "/" },
  { label: "Transactions", link: "/transactions" },
  { label: "Manage", link: "/manage" },
];
function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="block border-separate bg-backgournd md:hidden">
      <nav className="container flex items-center justify-between px-4">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              className="border border-1 bg-black-100"
              variant={"ghost"}
              size={"icon"}
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[300px] sm:w-[540px] p-4" side="left">
            <Logo />
            <div className="flex flex-col gap-1 pt-4">
              {items.map((item) => (
                <NavbarItem
                  key={item.label}
                  label={item.label}
                  link={item.link}
                  clickCallBack={() => setIsOpen((prev) => !prev)}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
          <Logo />
        </div>
        <div className="flex items-center gap-3">
          <ThemeSwitchBtn />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </nav>
    </div>
  );
}
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

function NavbarItem({
  link,
  label,
  clickCallBack,
}: {
  link: string;
  label: string;
  clickCallBack?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === link;
  return (
    <div
      className={cn(
        "relative flex items-center hover:border border-white h-[35] px-4 rounded-lg ",
        isActive && "bg-zinc-500"
      )}
      onClick={() => {
        if (clickCallBack) clickCallBack();
      }}
    >
      <Link href={link}>{label}</Link>
    </div>
  );
}
