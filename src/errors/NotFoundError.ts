import { AppError } from "errors/AppError";
import { ErrorStatus } from "errors/ErrorStatus";

export class NotFoundError extends AppError {
  constructor(resource: string, metadata?: Record<string, unknown>) {
    super(`${resource} not found`, ErrorStatus.NOT_FOUND, "NotFoundError", metadata);
  }

  static fromResource(resource: string, resourceId?: string): NotFoundError {
    return new NotFoundError(resource, { resourceId });
  }
}
