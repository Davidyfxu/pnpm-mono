import { UnAuthenticatedError } from "../errors/index.js";
// 确保创建者的id和当前页面用户的id一致
const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new UnAuthenticatedError("Not authorized to access this route");
};
export default checkPermissions;
