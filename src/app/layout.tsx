import type { ReactNode } from "react";
import "./globals.css";

/**
 * Root layout must exist; locale-specific <html> lives in [locale]/layout.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
