// Wraps an async route handler so thrown errors go to Express's error handler
// instead of crashing the process. Keeps controllers free of repeated try/catch.
export default function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
