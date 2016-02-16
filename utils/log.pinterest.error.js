global.logPinterestError = function logPinterestError(error) {
  log.error('RPinterestBot', 'code: %d | message: "%s"', error.code, error.message);
};
