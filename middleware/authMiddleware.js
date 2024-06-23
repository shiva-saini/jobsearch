import { UnauthenticatedError , UnauthorizedError} from "../errors/CustomError.js";
import jwt from "jsonwebtoken";
export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  console.log("token",token)
  debugger
  // if (!token) throw new UnauthenticatedError("unauthenticated user token does not exist");
  try {
    const {userId,role} = verifyJWT(token);
    req.user = {userId,role}
    next();
  } catch (err) {
    console.log(err)
    throw new UnauthenticatedError("unauthenticated user");
  }
};

export const verifyJWT = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};

export const authorizedPermissions = (...roles) => {
    return (req,res,next) => {
      console.log('current role isFinite',req.user.role)
        if(!roles.includes(req.user.role)) {
            throw new UnauthorizedError('unauthorized user')
        }
        next();
    }
}
