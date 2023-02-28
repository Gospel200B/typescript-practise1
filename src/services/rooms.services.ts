import roomModel from '../model/rooms.model'


class RoomService{
    async create(Roomdata: IcreateRoom){
        return await roomModel.create(Roomdata)
    }
    async fetchAll(filter: Partial<IcreateRoom>) {
        return await roomModel.find(filter)
    }

    async fetchOne(filter: Partial<IcreateRoom> & {name?: String}) {
        return await roomModel.findOne(filter)
    }

    async updateRoom(name: String, roomData: Partial<IcreateRoom>) {
        return await roomModel.findOneAndUpdate(name, roomData, {
            new : true
        })
    }

    async deleteRoom(name: String) {
        return await roomModel.findOneAndDelete(name)
    }
}

export default new RoomService()