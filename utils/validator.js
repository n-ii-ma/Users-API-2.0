const { body } = require("express-validator");
const { expressValidationError } = require("./errorHandlers");

// Validate POST request
const validateUserPost = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name Cannot be Empty!")
    .bail()
    .isLength({ max: 255 })
    .withMessage("Name Must be Less than 255 Characters Long!")
    .bail()
    .trim()
    .escape(),
  body("username")
    .exists({ checkFalsy: true })
    .withMessage("Username Cannot be Empty!")
    .bail()
    .isLength({ min: 5, max: 255 })
    .withMessage("Username Must be Between 5 to 255 Characters Long!")
    .bail()
    .trim()
    .escape(),
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("Email Cannot be Empty!")
    .bail()
    .isEmail()
    .withMessage("Email Must be a Valid Email!")
    .bail()
    .isLength({ min: 5, max: 255 })
    .withMessage("Email Must be Between 5 to 255 Characters Long!")
    .bail()
    .normalizeEmail()
    .trim()
    .escape(),
  body("phone")
    .optional({ nullable: true })
    .isLength({ min: 10, max: 20 })
    .withMessage("Phone Number Must be Between 10 to 20 Characters Long!")
    .bail()
    .trim()
    .escape(),
  body("website")
    .optional({ nullable: true })
    .isLength({ min: 5, max: 255 })
    .withMessage("Website Address Must be Between 3 to 255 Characters Long!")
    .bail()
    .trim()
    .escape(),
  // Error Handling
  expressValidationError,
];

const validateUserPut = [
  body("name")
    .optional({ nullable: true })
    .isLength({ max: 255 })
    .withMessage("Name Must be Less than 255 Characters Long!")
    .bail()
    .trim()
    .escape(),
  body("username")
    .optional({ nullable: true })
    .isLength({ min: 5, max: 255 })
    .withMessage("Username Must be Between 5 to 255 Characters Long!")
    .bail()
    .trim()
    .escape(),
  body("email")
    .optional({ nullable: true })
    .isEmail()
    .withMessage("Email Must be a Valid Email!")
    .bail()
    .isLength({ min: 5, max: 255 })
    .withMessage("Email Must be Between 5 to 255 Characters Long!")
    .bail()
    .normalizeEmail(),
  body("phone")
    .optional({ nullable: true })
    .isLength({ min: 10, max: 20 })
    .withMessage("Phone Number Must be Between 10 to 20 Characters Long!")
    .bail()
    .trim()
    .escape(),
  body("website")
    .optional({ nullable: true })
    .isLength({ min: 5, max: 255 })
    .withMessage("Website Address Must be Between 3 to 255 Characters Long!")
    .bail()
    .trim()
    .escape(),
  // Error Handling
  expressValidationError,
];

module.exports = {
  validateUserPost,
  validateUserPut,
};
