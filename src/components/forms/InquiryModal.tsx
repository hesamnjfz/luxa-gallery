"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui";
import { FloatingInput, FloatingTextarea } from "./FloatingField";
import {
  createViewingStep1Schema,
  createViewingStep2Schema,
  type ViewingStep1Values,
  type ViewingStep2Values,
} from "@/lib/forms/schemas";
import { cn } from "@/lib/cn";
import { getDirection, type Locale } from "@/i18n/config";

type InquiryModalProps = {
  open: boolean;
  onClose: () => void;
  vehicleLabel?: string;
};

type Phase = "step1" | "step2" | "success";

export function InquiryModal({ open, onClose, vehicleLabel }: InquiryModalProps) {
  const t = useTranslations("forms");
  const tInquiry = useTranslations("forms.inquiry");
  const locale = useLocale() as Locale;
  const isRtl = getDirection(locale) === "rtl";
  const slide = isRtl ? -24 : 24;
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("step1");
  const [step1Data, setStep1Data] = useState<ViewingStep1Values | null>(null);

  const step1Schema = useMemo(
    () =>
      createViewingStep1Schema({
        nameRequired: t("validation.nameRequired"),
        emailRequired: t("validation.emailRequired"),
        emailInvalid: t("validation.emailInvalid"),
        phoneRequired: t("validation.phoneRequired"),
        phoneInvalid: t("validation.phoneInvalid"),
      }),
    [t],
  );

  const step2Schema = useMemo(
    () =>
      createViewingStep2Schema({
        dateRequired: t("validation.dateRequired"),
      }),
    [t],
  );

  const step1Form = useForm<ViewingStep1Values>({
    resolver: zodResolver(step1Schema),
    defaultValues: { name: "", email: "", phone: "" },
    mode: "onBlur",
  });

  const step2Form = useForm<ViewingStep2Values>({
    resolver: zodResolver(step2Schema),
    defaultValues: { preferredAt: "", message: "" },
    mode: "onBlur",
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const onStep1 = step1Form.handleSubmit((values) => {
    setStep1Data(values);
    setPhase("step2");
  });

  const onStep2 = step2Form.handleSubmit((values) => {
    const payload = {
      type: "private-viewing",
      vehicleLabel: vehicleLabel ?? null,
      ...step1Data,
      ...values,
    };
    console.log("[LuxeDrive] Private viewing inquiry", payload);
    setPhase("success");
  });

  const stepIndex = phase === "step1" ? 0 : phase === "step2" ? 1 : 2;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label={tInquiry("close")}
            className="absolute inset-0 cursor-pointer bg-deep/70 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="inquiry-title"
            className="relative z-10 w-full max-w-lg border border-line bg-surface shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5 sm:px-8">
              <div>
                <p className="font-sans text-label font-semibold uppercase tracking-label text-soft">
                  {tInquiry("eyebrow")}
                </p>
                <h2
                  id="inquiry-title"
                  className="mt-2 font-display text-2xl font-semibold text-ink"
                >
                  {tInquiry("title")}
                </h2>
                {vehicleLabel ? (
                  <p className="mt-2 text-sm font-medium text-muted">
                    {tInquiry("forVehicle", { vehicle: vehicleLabel })}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={tInquiry("close")}
                className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center text-soft transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/35 focus-visible:ring-offset-2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/icons/close.png"
                  alt=""
                  width={22}
                  height={22}
                  aria-hidden
                  className="h-[22px] w-[22px] object-contain"
                />
              </button>
            </div>

            {phase !== "success" && (
              <div className="flex items-center justify-center gap-2 px-6 pt-6">
                {[0, 1].map((i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1.5 w-1.5 rounded-full transition-colors duration-300",
                      i <= stepIndex ? "bg-ink" : "bg-line",
                    )}
                    aria-hidden
                  />
                ))}
                <span className="sr-only">
                  {tInquiry("stepOf", { current: stepIndex + 1, total: 2 })}
                </span>
              </div>
            )}

            <div className="min-h-[280px] overflow-hidden px-6 pb-8 pt-6 sm:min-h-[300px] sm:px-8">
              <AnimatePresence mode="wait">
                {phase === "step1" && (
                  <motion.form
                    key="step1"
                    onSubmit={onStep1}
                    noValidate
                    initial={reduceMotion ? false : { opacity: 0, x: slide }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, x: -slide }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <p className="text-sm font-medium text-muted">
                      {tInquiry("step1Lead")}
                    </p>
                    <FloatingInput
                      label={t("fields.name")}
                      error={step1Form.formState.errors.name?.message}
                      {...step1Form.register("name")}
                    />
                    <FloatingInput
                      type="email"
                      autoComplete="email"
                      label={t("fields.email")}
                      error={step1Form.formState.errors.email?.message}
                      {...step1Form.register("email")}
                    />
                    <FloatingInput
                      type="tel"
                      autoComplete="tel"
                      label={t("fields.phone")}
                      error={step1Form.formState.errors.phone?.message}
                      {...step1Form.register("phone")}
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full [--luxa-sweep-bg:#ffffff]"
                    >
                      {tInquiry("continue")}
                    </Button>
                  </motion.form>
                )}

                {phase === "step2" && (
                  <motion.form
                    key="step2"
                    onSubmit={onStep2}
                    noValidate
                    initial={reduceMotion ? false : { opacity: 0, x: slide }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, x: -slide }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <p className="text-sm font-medium text-muted">
                      {tInquiry("step2Lead")}
                    </p>
                    <FloatingInput
                      type="datetime-local"
                      label={t("fields.preferredAt")}
                      error={step2Form.formState.errors.preferredAt?.message}
                      {...step2Form.register("preferredAt")}
                    />
                    <FloatingTextarea
                      label={t("fields.messageOptional")}
                      error={step2Form.formState.errors.message?.message}
                      {...step2Form.register("message")}
                    />
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button
                        type="button"
                        variant="secondary"
                        className="w-full"
                        onClick={() => setPhase("step1")}
                      >
                        {tInquiry("back")}
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        className="w-full [--luxa-sweep-bg:#ffffff]"
                      >
                        {tInquiry("submit")}
                      </Button>
                    </div>
                  </motion.form>
                )}

                {phase === "success" && (
                  <motion.div
                    key="success"
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center py-6 text-center"
                  >
                    <motion.span
                      className="flex h-16 w-16 items-center justify-center border border-ink text-ink"
                      initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      aria-hidden
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <motion.path
                          d="M5 12l5 5L20 7"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={reduceMotion ? false : { pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.55, delay: 0.15 }}
                        />
                      </svg>
                    </motion.span>
                    <h3 className="mt-8 font-display text-2xl font-semibold text-ink">
                      {tInquiry("successTitle")}
                    </h3>
                    <p className="mt-4 max-w-sm text-sm font-medium leading-relaxed text-muted">
                      {tInquiry("successBody")}
                    </p>
                    <Button
                      type="button"
                      variant="primary"
                      className="mt-10 [--luxa-sweep-bg:#ffffff]"
                      onClick={onClose}
                    >
                      {tInquiry("done")}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
