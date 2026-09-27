type LogLevel = "debug" | "info" | "warn" | "error";

type LogContext = Record<string, unknown>;

const levelPriority: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const configuredLevel = (): LogLevel => {
  const fromEnv = process.env.NEXT_PUBLIC_LOG_LEVEL as LogLevel | undefined;
  if (fromEnv && fromEnv in levelPriority) {
    return fromEnv;
  }
  return process.env.NODE_ENV === "development" ? "debug" : "warn";
};

const isEnabled = (level: LogLevel): boolean =>
  levelPriority[level] >= levelPriority[configuredLevel()];

const emit = (level: LogLevel, context: LogContext, message: string): void => {
  if (!isEnabled(level)) {
    return;
  }
  console[level](message, context);
};

export const logger = {
  debug: (context: LogContext, message: string): void => emit("debug", context, message),
  info: (context: LogContext, message: string): void => emit("info", context, message),
  warn: (context: LogContext, message: string): void => emit("warn", context, message),
  error: (context: LogContext, message: string): void => emit("error", context, message),
};
