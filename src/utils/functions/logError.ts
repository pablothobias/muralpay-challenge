const logError = (error: unknown, context: string) => {
  console.error(`[${context}]`, {
    message: error instanceof Error ? error.message : 'Unknown error',
    stack: error instanceof Error ? error.stack : undefined,
  });
};

export default logError;
