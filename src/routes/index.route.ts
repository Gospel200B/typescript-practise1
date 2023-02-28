const router = require('express').Router();
import roomRouter from '../routes/rooms.route';
import userRouter from '../routes/user.route';

router.use('/room', roomRouter);
router.use('/user', userRouter)

export default router