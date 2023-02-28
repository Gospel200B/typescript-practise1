
import lodah from 'lodash'
import mongoose  from 'mongoose'
import usermodel from '../model/user.model'


const isValidateObjectId = mongoose;
class UserService {
    findOne(arg0: { email: any; }) {
        throw new Error('Method not implemented.');
    }
    async createUser(data: IcreateUser) {
        return await usermodel.create(data)
    }
    async updateUser(userName: String, data: IcreateUser) {
        return await usermodel.findOneAndUpdate(userName, data)
    }

    async deleteUser(userName: String){
        return await usermodel.findOneAndDelete(userName)
    }
    async fetchOneUser(filter: Partial<IcreateRoom> & {name?: String}){
        return await usermodel.findOne(filter)
    }
    async fetchAllUser(filter: Partial<IcreateRoom> & {name?: String}){
        return await usermodel.find(filter)
    }
}

export default new UserService()