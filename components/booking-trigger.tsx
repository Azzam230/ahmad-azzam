"use client";

import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { useBooking } from "@/components/booking-provider";
import { cn } from "@/lib/utils";

export interface BookingTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function BookingTrigger({
  className,
  variant,
  size,
  children,
  ...props
}: BookingTriggerProps) {
  const { openBooking } = useBooking();
  return (
    <button
      type="button"
      onClick={openBooking}
      className={cn(buttonVariants({ variant, size }), "no-underline", className)}
      {...props}
    >
      {children}
    </button>
  );
}
