import errorConfig from './../../config/errorConfig.js';


describe('errorConfig', () => {
  it('should have a bad request error with correct code', () => {
    expect(errorConfig.badRequest.code).toBe(400);
    expect(errorConfig.badRequest.name).toBe("Bad Request");
  });

  it('should have an unauthorized error with correct code', () => {
    expect(errorConfig.unauthorized.code).toBe(401);
    expect(errorConfig.unauthorized.name).toBe("Unauthorized");
  });

  it('should have a forbidden error with correct code', () => {
    expect(errorConfig.forbidden.code).toBe(403);
    expect(errorConfig.forbidden.name).toBe("Forbidden");
  });

  it('should have a resource not found error with correct code', () => {
    expect(errorConfig.resourceNotFound.code).toBe(404);
    expect(errorConfig.resourceNotFound.name).toBe("Resource Not Found");
  });

  it('should have a validation error with correct code', () => {
    expect(errorConfig.validationError.code).toBe(422);
    expect(errorConfig.validationError.name).toBe("Validation Error");
  });

  it('should have an internal server error with correct code', () => {
    expect(errorConfig.internalServerError.code).toBe(500);
    expect(errorConfig.internalServerError.name).toBe("Internal Server Error");
  });
});