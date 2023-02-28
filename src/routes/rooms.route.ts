import  express from 'express';
import RoomController from '../controllers/rooms.controller';
const router = express.Router();


 
router.route('/')
.post( RoomController.createRoom)
.get(RoomController.fetchOne)
.patch(RoomController.updateRoom)
.delete(RoomController.deleteRoom)
.get(RoomController.fetchAll)

export default router