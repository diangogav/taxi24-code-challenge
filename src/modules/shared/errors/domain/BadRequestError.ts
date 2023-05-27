import { ApplicationError } from "./ApplicationError";

export class BadRequestError extends ApplicationError {
  public readonly statusCode: number = 400;

  constructor(message: unknown) {
    super({ message });
  }
}