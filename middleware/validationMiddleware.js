import { body, validationResult, param } from "express-validator";
import { BadRequestError, NotFoundError, UnauthenticatedError, UnauthorizedError } from "../errors/CustomError.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      console.log(errors);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no job")) {
          throw new NotFoundError(errorMessages);
        }
        throw new BadRequestError(errorMessages);

        if(errorMessages[0].startsWith('not authorized')){
          throw new UnauthorizedError('not authorized to access this route')
        }
      }

      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("company name required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation").notEmpty().withMessage("job location is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid status"),
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("job type is required"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value,{ req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) {
      throw new BadRequestError("invalid mongodb id");
      //throw new Error('invalid mongodb id'); we can write like this as well because it is general
    }
    const job = await Job.findById(value);
    if (!job) throw new NotFoundError(`no job with id ${value} does exist`);
    // console.log(req.user);
    const isAdmin = (req.user.role === 'admin');
    const isOwner = (req.user.userId === job.createdBy.toString());

    if(!isAdmin && !isOwner) {
      throw new UnauthenticatedError('not authorized to access this route');
    }
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name required"),
  body("location").notEmpty().withMessage("location required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email")
    .custom(async (email) => {
        const user = await User.findOne({email})
        if(user){
          throw new BadRequestError('user already exists');
        }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({min:8})
    .withMessage("at least 8 chars required for password"),
  body("lastName").notEmpty().withMessage("last name required"),
]);





export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({min:8})
    .withMessage("at least 8 chars required for password")
]);


export const validateUpdateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("name required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email")
    .custom(async (email,{ req }) => {
        const user = await User.findOne({email})
        if(user && user._id.toString() !== req.user.userId){
          throw new BadRequestError('user already exists');
        }
    }),
    body("location").notEmpty().withMessage("location required"),
  body("lastName").notEmpty().withMessage("last name required"),
])

