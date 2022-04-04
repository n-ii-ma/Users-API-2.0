// Express-Validator error handling
const { validationResult } = require("express-validator");

const expressValidationError = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Stringify and parse the error and access the first and most specific error message
    const parseError = JSON.parse(JSON.stringify(errors.array()))[0].msg;

    const error = new Error(parseError);
    error.status = 400;
    next(error);
  } else {
    next();
  }
};

// Error for UNIQUE constraint violation
const uniqueConstraintError = (next) => {
  const error = new Error("Email or Username Already Exists!");
  error.status = 400;
  next(error);
};

// Error for invalid ID
const validateIdError = (id, next) => {
  const error = new Error(`User with ID of ${id} Not Found!`);
  error.status = 404;
  next(error);
};

module.exports = {
  expressValidationError,
  uniqueConstraintError,
  validateIdError,
};
