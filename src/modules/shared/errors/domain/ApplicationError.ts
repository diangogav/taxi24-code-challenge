export abstract class ApplicationError {
  public readonly message: unknown;
  abstract readonly statusCode: number;

  constructor({ message }: { message: unknown }) {
    this.message = message;
  }

  serialize(): { message: unknown; errors?: string[] } {
    return {
      message: this.message
    }
  }
}