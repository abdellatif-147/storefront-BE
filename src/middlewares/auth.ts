import { Request, Response ,NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const authenticate = async (req: Request, res: Response , next :NextFunction ) => {

  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
    next();
  } catch(err) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
};

export default authenticate;