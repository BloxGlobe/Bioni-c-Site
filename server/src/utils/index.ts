export const formatError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    const timeoutId = (global as any).setTimeout(resolve, ms);
    void timeoutId;
  });
};
