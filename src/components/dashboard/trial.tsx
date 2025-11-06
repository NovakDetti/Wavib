export interface Trial {
  isActive: boolean;
  daysRemaining: number;
  expiresAt: string;
}

export function getTrial(): Trial {
  return {
    isActive: true,
    daysRemaining: 5,
    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
  };
}