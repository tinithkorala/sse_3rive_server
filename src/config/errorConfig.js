export const badRequest = {
  name: "Bad Request: The server could not understand the request due to invalid syntax.",
  code: 400,
};

export const unauthorized = {
  name: "Unauthorized: The request requires user authentication.",
  code: 401,
};

export const forbidden = {
  name: "Forbidden: The server understood the request, but refuses to authorize it.",
  code: 403,
};

export const resourceNotFound = {
  name: "Resource Not Found: The server can't find the requested resource.",
  code: 404,
};

export const internalServerError = {
  name: "Internal Server Error: The server has encountered a situation it doesn't know how to handle.",
  code: 500,
};

export default {
  badRequest,
  unauthorized,
  forbidden,
  resourceNotFound,
  internalServerError,
};