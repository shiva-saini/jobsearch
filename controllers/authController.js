import { StatusCodes } from "http-status-codes";
import {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/CustomError.js";

import User from "../models/UserModel.js";

import bcrypt from "bcryptjs";

import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";
export const registerUser = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";
  // console.log(req.body.role);
  // const salt  = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(req.body.password,salt);
  req.body.password = await hashPassword(req.body.password);
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ message: "user created" });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isValidUser = user && (await comparePassword(password,user.password));
  if (!isValidUser) throw new UnauthenticatedError('invalid credentials');

  const token = createJWT({userId:user._id,role:user.role});
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie('token',token,{
        httpOnly:true,
        expires:new Date(Date.now() + oneDay),
        secure:process.env.NODE_ENV==='production',
  })
  res.status(StatusCodes.OK).json({ message:'user logged in' });
};


export const logoutUser = (req,res) => {
  res.cookie('token','logout',{
    httpOnly:true,
    expires:new Date(Date.now())
  })
  res.status(StatusCodes.OK).json({msg:'user logged out'})
}