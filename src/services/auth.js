import {
  user
} from "../models";
import {
  findOrCreate
} from "./base";
import {
  hashPassword
} from "../libs/passwordOp";
import catchAsync from "../lib/catchAsync";

/**
 * Sign up function
 */
export const signupService = catchAsync(async (req, res, next) => {
  const password = await hashPassword(req.body.password);

  const email = req.body.email.toLowerCase();

  const [userResponse, created] = await findOrCreate(user, {
    ...req.body,
    password,
    email
  });

  if (!created) {
    return res.status(400).json({
      status: "fail",
      message: "user already exist"
    });
  }

  return res.status(201).json({
    status: "success",
    message: "User successfully created",
    payload: userResponse.toJSON()
  });
});