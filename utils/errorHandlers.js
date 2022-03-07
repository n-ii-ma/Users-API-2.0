// Error for UNIQUE constraint violation
const constraintError = (err, next) => {
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
  const error = new Error("Something Went Wrong!");
  error.status = 500;
  next(error);
};

module.exports = {
  constraintError,
  validateIdError,
  serverError,
};
