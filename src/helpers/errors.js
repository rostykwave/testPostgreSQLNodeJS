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

class WromgParametersError extends Post26Error {
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

module.exports = {
  Post26Error,
  ValidationError,
  WromgParametersError,
  NotAuthorizedError,
};
