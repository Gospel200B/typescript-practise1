import express from 'express';
const router = express.Router();
// import Auth from '../middleware/auth.middleware'
import UserController from'../controllers/user.controller';

router.route('/')
  .post(UserController.createUser)

.patch(UserController.updateUser)
.delete(UserController.deleteUser);


export default  router