const unitMs: Record<string, number> = {
  s: 1000,
  m: 60 * 1000,
  h: 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
};

export const parseDurationMs = (value: string): number => {
  const match = /^(\d+)([smhd])$/.exec(value.trim());
  if (!match) {
    throw new Error(`Invalid duration: ${value}`);
  }
  const amount = Number(match[1]);
  const unit = match[2];
  const multiplier = unitMs[unit];
  if (!multiplier) {
    throw new Error(`Invalid duration unit: ${unit}`);
  }
  return amount * multiplier;
};
