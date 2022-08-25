class Post26Error extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends Post26Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotAuthorizedError extends Post26Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}
class AlreadyRegisteredError extends Post26Error {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}
class NotFoundError extends Post26Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

module.exports = {
  Post26Error,
  ValidationError,
  NotAuthorizedError,
  AlreadyRegisteredError,
  NotFoundError,
};
