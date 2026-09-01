/** Shared motion tokens — luxury easing & durations */

export const easeOut = [0.16, 1, 0.3, 1] as const;
export const easeInOut = [0.65, 0, 0.35, 1] as const;

/** Hover / micro-interaction duration (seconds) */
export const hoverDuration = 0.25;

/** Section / entrance reveal duration (seconds) */
export const revealDuration = 0.65;

export const reveal = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
} as const;

export const revealTransition = (delay = 0) => ({
  duration: revealDuration,
  delay,
  ease: easeOut,
});

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
} as const;

export const staggerItem = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: revealDuration, ease: easeOut },
  },
} as const;

/** Parse "120+", "$15k", "3" into parts for AnimatedCounter */
export function parseStatValue(value: string): {
  prefix: string;
  number: number;
  suffix: string;
} {
  const match = value.trim().match(/^([^\d]*)(\d+(?:[.,]\d+)?)(.*)$/);
  if (!match) {
    return { prefix: "", number: 0, suffix: value };
  }
  const raw = match[2].replace(",", "");
  return {
    prefix: match[1],
    number: Number.parseFloat(raw) || 0,
    suffix: match[3],
  };
}
