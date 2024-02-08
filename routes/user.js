import express from 'express'
import { getUser, postUser, putUser } from '../controllers/user.js'
import { checkUser } from '../middlewares/user.js';

const userRouter = express.Router();

userRouter.get('/', getUser);
userRouter.post('/', postUser);
userRouter.put('/:id', checkUser, putUser);

export default userRouter;