class HttpError extends Error {
  code: number;

  constructor(message: string, errorCode: number) {
    super(message);
    this.code = errorCode;

    // Set the prototype explicitly, necessary when extending built-in classes like Error in TypeScript
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export default HttpError;
