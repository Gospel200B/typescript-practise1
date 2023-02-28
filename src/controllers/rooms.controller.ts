import RoomService from '../services/rooms.services';
import {Request, Response} from 'express'


class RoomController{

    async createRoom(req: Request, res: Response) {
        const {name, description, price} = req.body

        const existingRoom = await RoomService.fetchOne({
            name : name.toLowerCase()
        })

        if(existingRoom) res.status(403).json({
            success : false,
            message : "Room already exist"
        })

        const newRoom = await RoomService.create(req.body)
        res.status(201).json({
            success : true,
            message : "Room sucessfully created",
            data : newRoom
        })
    }

    async updateRoom(req: Request, res: Response ) {
        const roomName = req.params.name;
        const updateData = req.body;

        const existingRoom = await RoomService.fetchOne({
            name: roomName
        })

        if(!existingRoom) {
            res.status(403).json({ 
                success : false,
                message : "Room with this ID does not exist"
            })

            if(updateData.name){
                const existingRoomWithThisUpdateName = await RoomService.fetchOne({
                    name : updateData.name.lowercase()

                    

                })
                const updatedData = await RoomService.updateRoom(roomName,updateData)
                res.status(200).json({
                    success : true,
                    message : "Room updated succesfully",
                    data : updatedData
                })
            }
        }
    }
   
     async deleteRoom(req: Request, res: Response) {
        const roomName = req.params.name

        const existingRoom = await RoomService.fetchOne({
            name: roomName
        })
        if(!existingRoom)res.status(403).json({
            success : false,
            message : "Room with this Id does not exist."
        })

        const deleteRoom = await RoomService.deleteRoom
            res.status(200).json({
            success : true,
            message : "Room deleted successfully"
        })
     }

     async fetchOne(req:Request, res: Response) {
        const roomName = req.params.name

        const existingRoom = await RoomService.fetchOne({name : roomName})

        if(!existingRoom) res.status(403).json({
            success : false,
            message : " Room does not exist"
        })
         res.status(200).json({
            success : true,
            message : "Room fetched"
         })

     }

     async fetchAll(req: Request, res: Response) {
        const fetchAll = await RoomService.fetchAll({})

        res.status(200).json({
            success : true,
            message : " All rooms fetched succesfully",
            data : fetchAll
        })
     }
}

export default new RoomController()