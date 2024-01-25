const AsyncErrorHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default AsyncErrorHandler;

// const AsyncErrorHandlerOld = (fn) => (req, res, next) => {
//   Promise.resolve(fn(req, res, next)).catch((err) => {
//     console.error(err);
//     next(err);
//   });
// };
