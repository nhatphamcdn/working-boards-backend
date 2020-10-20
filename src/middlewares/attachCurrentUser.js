import {
  Logger
} from 'winston';

/**
 * Attach user to req.currentUser
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const attachCurrentUser = async (req, res, next) => {
  // try {
  //   const UserModel = null; //Instance User sequelize
  //   const userRecord = await UserModel.findById(req.token.id);
  //   if (!userRecord) {
  //     return res.sendStatus(401);
  //   }
  //   const currentUser = userRecord.toObject();
  //   req.currentUser = currentUser;
  //   return next();
  // } catch (e) {
  //   Logger.error('🔥 Error attaching user to req: %o', e);
  //   return next(e);
  // }
  req.currentUser = {
    name: 'Nhat Pham',
    age: 25,
    gender: 1
  };
  return next();
};

export default attachCurrentUser;