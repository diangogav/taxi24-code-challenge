import { ApplicationError } from "./ApplicationError";

export class ConflictError extends ApplicationError {
  public readonly statusCode: number = 409;

  constructor(message: unknown) {
    super({ message });
  }
}