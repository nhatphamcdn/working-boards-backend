import catchAsync from '../helpers/catchAsync.helper';
import UserService from '../services/user.service'

// Create instance userSerivce
const userService = new UserService();

/**
 * Attach user to req.currentUser
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const attachCurrentUser = catchAsync(async (req, res, next) => {
  const user = await userService.getCurrentUser(req.token.id)

  if (!user) {
    return res.sendStatus(401);
  }

  req.currentUser = user;
  return next();
});

export default attachCurrentUser;