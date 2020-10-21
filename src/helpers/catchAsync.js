const catchAsync = fn => (req, res, next) => {
  fn(req, res, next).catch(e => {
    global.logger.error('🔥 error: %o', e);
    return next(e);
  });
};

export default catchAsync;