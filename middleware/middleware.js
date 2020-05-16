const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Takes a url and returns its extension
 * @param {string} url
 *
 * @return {string} the obtained extension
 */
exports.fileExtension = (url) => {
  return url.split('.').pop().split(/\#|\?/)[0];
};

/**
 * Verifies token with secretKey
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function,
 *                          called on successful verification
 *
 * @return {JSON} returned if the verification fails
 */
exports.verifyToken = (req, res, next) => {
  const {token} = req.headers;
  // Return forbidden status if the token is not available
  if (!token) {
    return res
        .status(403)
        .json({authorized: false, error: 'Token is required.'});
  }
  // Verify token
  jwt.verify(token, process.env.secretKey, (err, decoded) => {
    if (err) {
      return res
          .status(401)
          .send({authorized: false,
            error: 'Verification failed or token has expired.'});
    }
    // No error so save decoded token into req.user and go to next process.
    req.user = decoded;
    next();
  });
};
