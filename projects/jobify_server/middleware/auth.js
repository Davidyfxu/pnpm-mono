import { UnAuthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";
const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const testUser = payload.userId === "64aa2396c7110c109a312e35";
    req.user = { userId: payload.userId, testUser };
    next();
  } catch (e) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};
export default auth;
