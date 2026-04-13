export class conflictException extends Error {
  constructor(message) {
    super(message, { cause: 409 });
  }
}

export class NotFoundtException extends Error {
  constructor(message) {
    super(message, { cause: 404 });
  }
}
export class unauthorizedException extends Error {
  constructor(message) {
    super(message, { cause: 409 });
  }
}

export class BadRequestException extends Error {
  constructor(message) {
    super(message, { cause: 409 });
  }
}
