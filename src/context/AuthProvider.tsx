"use client";

// session provider form client api in nextauth js
import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}


// go to layput and rap with this bro