export class ApiError extends Error {
  isUserError: boolean;

  constructor(message: string, isUserError = false) {
    super(message);
    this.name = "ApiError";
    this.isUserError = isUserError;
  }
}
