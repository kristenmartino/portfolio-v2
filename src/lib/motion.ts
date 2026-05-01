export const EASE = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  outQuart: [0.25, 1, 0.5, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const DUR = {
  fast: 0.18,
  base: 0.4,
  slow: 0.7,
} as const;

export const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: DUR.slow, ease: EASE.outExpo },
};

export const revealStagger = (i: number) => ({
  ...reveal,
  transition: { duration: DUR.slow, delay: i * 0.06, ease: EASE.outExpo },
});
