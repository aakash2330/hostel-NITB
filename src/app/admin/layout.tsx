"use client";
import "~/styles/globals.css";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { Home, LineChart, Package } from "lucide-react";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import AdminNav from "../_components/admin/AdminNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AdminNav></AdminNav>
      {children}
    </div>
  );
}
