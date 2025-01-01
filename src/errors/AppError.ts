import { ErrorStatus } from "errors/ErrorStatus";

export class AppError extends Error {
  public readonly statusCode: ErrorStatus;
  public readonly metadata?: Record<string, unknown>;

  constructor(
    message: string,
    statusCode: ErrorStatus,
    name: string = "AppError",
    metadata?: Record<string, unknown>,
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.statusCode = statusCode;
    this.metadata = metadata;

    Error.captureStackTrace(this);
  }
}
