enum LogLevel {
  info = 'info',
  debug = 'debug',
  error = 'error',
  warn = 'warn',
}

export class Logger {
  public constructor(private readonly context: string) {}

  public info(...messages: unknown[]) {
    this.log(LogLevel.info, ...messages);
  }

  public debug(...messages: unknown[]) {
    this.log(LogLevel.debug, ...messages);
  }

  public error(...messages: unknown[]) {
    this.log(LogLevel.error, ...messages);
  }

  public warn(...messages: unknown[]) {
    this.log(LogLevel.warn, ...messages);
  }

  private log(level: LogLevel, ...messages: unknown[]) {
    console.log(`${level} | ${new Date().getTime()} | ${this.context} |`, ...messages);
  }
}
