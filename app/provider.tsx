"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { Toaster } from "react-hot-toast";
import { NextUIProvider } from "@nextui-org/react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextUIProvider>
      <SessionProvider>
        <Toaster />
        {children}
      </SessionProvider>
    </NextUIProvider>
  );
};

export default Provider;
