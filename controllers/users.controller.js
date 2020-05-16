const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

exports.user_login_post = [
  // Validate input fields. Trim spaces around username
  body('username', 'Username is required.').isLength({ min: 1 }).trim(),
  body('username', 'Username must contain at least 3 characters.').isLength({ min: 3 }).trim(),
  body('password', 'Password must contain at least 6 characters.').isLength({ min: 6 }),

  // Process the request after validating.
  (req, res) => {
    // Save errors from validation, if any.
    const errors = validationResult(req)

    // Check if there were errors from the form.
    if (!errors.isEmpty()) {
      res.status(400).send({ errors: errors.array() })
    } else {
      // Save username and password.
      // Convert username to lowercase for db consistency
      const username = req.body.username.toLowerCase();
      const password = req.body.password;
      // Create a token for the user.
      const token = jwt.sign({ username: username }, process.env.jwtSecret,
        { expiresIn: 21600 });
      // Set token in header
      req.headers['token'] = token;
      res.status(200).send({ user: username, authorized: true, token: token });
    }
  }
]

