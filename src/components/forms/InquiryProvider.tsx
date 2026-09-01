"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { InquiryModal } from "./InquiryModal";

export type InquiryContextValue = {
  openInquiry: (opts?: { vehicleLabel?: string }) => void;
  closeInquiry: () => void;
};

const InquiryContext = createContext<InquiryContextValue | null>(null);

export function useInquiry() {
  const ctx = useContext(InquiryContext);
  if (!ctx) {
    throw new Error("useInquiry must be used within InquiryProvider");
  }
  return ctx;
}

/** Safe optional hook when provider may be absent */
export function useInquiryOptional() {
  return useContext(InquiryContext);
}

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [instance, setInstance] = useState(0);
  const [vehicleLabel, setVehicleLabel] = useState<string | undefined>();

  const openInquiry = useCallback((opts?: { vehicleLabel?: string }) => {
    setVehicleLabel(opts?.vehicleLabel);
    setInstance((n) => n + 1);
    setOpen(true);
  }, []);

  const closeInquiry = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const value = useMemo(
    () => ({ openInquiry, closeInquiry }),
    [openInquiry, closeInquiry],
  );

  return (
    <InquiryContext.Provider value={value}>
      {children}
      <InquiryModal
        key={instance}
        open={open}
        vehicleLabel={vehicleLabel}
        onClose={closeInquiry}
      />
    </InquiryContext.Provider>
  );
}
