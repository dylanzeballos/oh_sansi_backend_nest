import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppLogger {
  private readonly logger = new Logger(AppLogger.name);

  log(message: string, context?: string): void {
    this.logger.log(message, context || AppLogger.name);
  }

  error(message: string, trace?: string, context?: string): void {
    this.logger.error(message, trace, context || AppLogger.name);
  }

  warn(message: string, context?: string): void {
    this.logger.warn(message, context || AppLogger.name);
  }

  debug(message: string, context?: string): void {
    this.logger.debug(message, context || AppLogger.name);
  }

  verbose(message: string, context?: string): void {
    this.logger.verbose(message, context || AppLogger.name);
  }
}
