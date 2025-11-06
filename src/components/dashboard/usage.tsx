export function getUsage(): Usage {
  const current = 7834;
  const limit = 10000;
  return {
    current,
    limit,
    percentage: (current / limit) * 100,
  };
}

export interface Usage {
  current: number;
  limit: number;
  percentage: number;
}
