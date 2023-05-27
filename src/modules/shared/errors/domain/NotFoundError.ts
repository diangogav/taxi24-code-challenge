import { ApplicationError } from "./ApplicationError";

export class NotFoundError extends ApplicationError {
  public readonly statusCode: number = 404;

  constructor(message: string) {
    super({ message });
  }
}