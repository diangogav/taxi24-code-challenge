import { ApplicationError } from "./ApplicationError";

export class ServerError extends ApplicationError {
  public readonly statusCode: number = 500;

  constructor(message: string) {
    super({ message });
  }
}