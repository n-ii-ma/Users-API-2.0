// Express-Validator error handling
const { validationResult } = require("express-validator");

const expressValidationError = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error(
      errors
        .array()
        .map((error) => error["msg"])
        .toString()
    );
    err.status = 400;
    next(err);
  } else {
    next();
  }
};

// Error for UNIQUE constraint violation
const uniqueConstraintError = (err, next) => {
  console.error(err.message);
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

// Server error
const serverError = (err, next) => {
  console.error(err.message);
  const error = new Error(err.message);
  error.status = 500;
  next(error);
};

module.exports = {
  expressValidationError,
  uniqueConstraintError,
  validateIdError,
  serverError,
};
