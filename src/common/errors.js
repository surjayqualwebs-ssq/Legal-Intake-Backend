// common/errors.js
export function errorResponse(code, message) {
  return { error: { code, message } };
}
