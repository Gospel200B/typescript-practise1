import UserService from '../services/user.services'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
class UserController{

    async createUser(req:Request, res: Response) {
        const userName = req.body

        const existingUser = await UserService.fetchOneUser({
            name : userName.toLowerCase()
        })

        if(existingUser)
        res.status(403).json({
            success : false,
            message : "User already exist"
        
        })
            
        const newUser = await UserService.createUser(req.body)
        res.status(201).json({
            success : true,
            message : "User sucessfully created",
            data : newUser
        })
    }

    async updateUser(req: Request, res: Response) {
        const UserId = req.params.userName;
        const updateData = req.body;

        const existingUser = await UserService.fetchOneUser({
           UserId : userName
        })

        if(!existingUser) {
            res.status(403).json({ 
                success : false,
                message : "User with this ID does not exist"
            })

            if(updateData.name){
                const existingUserWithThisUpdateName = await UserService.fetchOneUser({
                    name : updateData.name.lowercase()
                })
                if(existingUserWithThisUpdateName._id.toString() === existingUser._id.toString()) {
                    res.status(403).json({
                        success : false,
                        message : "User with this name already exist",
                        // data : updatedData
                    })  
                }
            }
            
                const updatedData = await UserService.updateUser(UserId,updateData)
                res.status(200).json({
                    success : true,
                    message : "User updated succesfully",
                    data : updatedData
                })
            }
        
    }
   
     async deleteUser(req:Request, res:Response) {
        const Id = req.params.id

        const existingUser = await UserService.fetchOneUser({
            id : UserId
        })
        if(!existingUser)res.status(403).json({
            success : false,
            message : "Room with this Id des not exist."
        })

        const deleteUser = await UserService.deleteUser({
            id : UserId
        })
        res.status(200).json({
            success : true,
            message : "User deleted successfully"
        })
     }

    //  async login(req:Request, res: Response) {
    //     const user = await UserService.findOne({ email: req.body.email });
    //     if (!user) return res.status(400).send({ success: false, message: 'Invalid email  or password' });
    
    //     const validPassword = await bcrypt.compare(req.body.password, user.password);
    //     if (!validPassword) return res.status(400).send({ success: false, message: 'Invalid password or email' });
    
    //     const token = user.generateAuthToken();
    
    //     res.header('token', token).status(200).send({
    //       success: true,
    //       message: 'login success',
    //       data: { ...user.toJSON(), token }
    //     });
    //   }

    
     }

     export default new UserController()