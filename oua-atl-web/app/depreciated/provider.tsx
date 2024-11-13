import React, { Children, ReactNode } from "react";
import Navbar from "./ui/navbar";
import { NavbarProvider } from "./context/navbar/navbar";
import { BackgroundBeam } from "./ui/background";

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <BackgroundBeam>
      <NavbarProvider>{children}</NavbarProvider>
    </BackgroundBeam>
  );
}
