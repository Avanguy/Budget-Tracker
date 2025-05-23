import jwt from 'jsonwebtoken';
import userModel from "./models/userModel.js";
const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]

  try {
    const {_id} = jwt.verify(token, process.env.SECRET);
      req.user = await userModel.findOne({ _id }).select('_id');
    if (!req.user) {
      return res.status(401).json({ error: 'User not found' });
    }

    next();

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}
export default requireAuth;