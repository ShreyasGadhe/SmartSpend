import React, { ReactNode } from "react";
import "@/app/globals.css";
import Logo from "@/components/logo";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-content ">
      <Logo />
      <div className="mt-12">{children}</div>
    </div>
  );
}

export default layout;
