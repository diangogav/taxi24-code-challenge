export abstract class ApplicationError extends Error {
  public readonly message: string;
  abstract readonly statusCode: number;

  constructor({ message }: { message: string }) {
    super();
    this.message = message;
  }

  serialize(): { message: string; errors?: string[] } {
    return {
      message: this.message
    }
  }
}