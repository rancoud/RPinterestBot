global.logPinterestError = function logPinterestError(error) {
  log.error('RPinterestBot', 'code: %d | message: "%s"', error[0].code, error[0].message);
};
