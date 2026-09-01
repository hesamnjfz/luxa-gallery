"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "./FloatingField";
import {
  createContactSchema,
  type ContactFormValues,
} from "@/lib/forms/schemas";

const VEHICLE_TYPES = [
  "coupe",
  "sedan",
  "suv",
  "convertible",
  "other",
] as const;

export function ContactForm() {
  const t = useTranslations("forms");
  const tContact = useTranslations("forms.contact");
  const reduceMotion = useReducedMotion();
  const [success, setSuccess] = useState(false);

  const schema = useMemo(
    () =>
      createContactSchema({
        nameRequired: t("validation.nameRequired"),
        emailRequired: t("validation.emailRequired"),
        emailInvalid: t("validation.emailInvalid"),
        phoneRequired: t("validation.phoneRequired"),
        phoneInvalid: t("validation.phoneInvalid"),
        vehicleRequired: t("validation.vehicleRequired"),
        messageRequired: t("validation.messageRequired"),
      }),
    [t],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      vehicleType: "",
      message: "",
    },
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (values) => {
    console.log("[LuxeDrive] Contact / concierge inquiry", values);
    await new Promise((r) => setTimeout(r, 400));
    setSuccess(true);
    reset();
  });

  if (success) {
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-line bg-surface px-8 py-16 text-center"
      >
        <span
          className="mx-auto flex h-14 w-14 items-center justify-center border border-ink text-ink"
          aria-hidden
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12l5 5L20 7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="mt-8 font-display text-2xl font-semibold text-ink">
          {tContact("successTitle")}
        </h3>
        <p className="mx-auto mt-4 max-w-md text-sm font-medium text-muted">
          {tContact("successBody")}
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-10"
          onClick={() => setSuccess(false)}
        >
          {tContact("sendAnother")}
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <FloatingInput
        label={t("fields.name")}
        autoComplete="name"
        error={errors.name?.message}
        {...register("name")}
      />
      <FloatingInput
        type="email"
        label={t("fields.email")}
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <FloatingInput
        type="tel"
        label={t("fields.phone")}
        autoComplete="tel"
        error={errors.phone?.message}
        {...register("phone")}
      />
      <FloatingSelect
        label={t("fields.vehicleType")}
        error={errors.vehicleType?.message}
        {...register("vehicleType")}
      >
        <option value="" disabled>
          {t("fields.vehicleTypePlaceholder")}
        </option>
        {VEHICLE_TYPES.map((key) => (
          <option key={key} value={key}>
            {t(`vehicleTypes.${key}`)}
          </option>
        ))}
      </FloatingSelect>
      <FloatingTextarea
        label={t("fields.message")}
        error={errors.message?.message}
        {...register("message")}
      />
      <Button
        type="submit"
        variant="primary"
        className="w-full [--luxa-sweep-bg:#ffffff]"
        disabled={isSubmitting}
      >
        {isSubmitting ? tContact("sending") : tContact("submit")}
      </Button>
    </form>
  );
}
