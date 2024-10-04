export const badRequest = {
  name: "Bad Request",
  code: 400,
};

export const unauthorized = {
  name: "Unauthorized",
  code: 401,
};

export const forbidden = {
  name: "Forbidden",
  code: 403,
};

export const resourceNotFound = {
  name: "Resource Not Found",
  code: 404,
};

export const validationError = {
  name: "Validation Error",
  code: 422,
};

export const internalServerError = {
  name: "Internal Server Error",
  code: 500,
};

export default {
  badRequest,
  unauthorized,
  forbidden,
  resourceNotFound,
  internalServerError,
  validationError
};