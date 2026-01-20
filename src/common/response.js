export function success(data, meta = {}) {
  return {
    data,
    meta
  };
}

export function error(code, message) {
  return {
    error: {
      code,
      message
    }
  };
}
