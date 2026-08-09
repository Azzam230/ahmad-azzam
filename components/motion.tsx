"use client";

import { motion, useInView, useSpring, useMotionValue, type Variants } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

const APPLE_EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      transition={{ duration, delay, ease: APPLE_EASE }}
    >
      {children}
    </motion.div>
  );
}

const cardMotion = {
  whileHover: { scale: 1.015, y: -2 },
  whileTap: { scale: 0.985 },
  transition: { type: "spring", stiffness: 300, damping: 20 } as const,
};

export const cardMotionProps = cardMotion;

export { APPLE_EASE, fadeUp };

interface CounterProps {
  value: number;
  className?: string;
  duration?: number;
}

export function Counter({ value, className, duration = 1.2 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 60,
    damping: 18,
  });

  useEffect(() => {
    if (!inView) return;
    motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = String(Math.round(latest));
      }
    });
    return unsubscribe;
  }, [spring]);

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}
