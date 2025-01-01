import { AppError } from "errors/AppError";
import { ErrorStatus } from "errors/ErrorStatus";

export class ValidationError extends AppError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, ErrorStatus.BAD_REQUEST, "ValidationError", metadata);
  }

  static fromField(field: string, details?: string): ValidationError {
    return new ValidationError(`Invalid value for field ${field}`, { details });
  }
}
