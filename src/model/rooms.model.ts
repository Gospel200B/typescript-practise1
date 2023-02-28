import mongoose from 'mongoose';


const Rooms = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowerCase : true,
    },
    description : {
        type : String,
        required : true,
        trim : true,
        lowerCase: true,
        enum : ['Exclusive suite', 'Standard suite']
    },
    Price : {
        type : Number,
        required : true,
    }
})
const roomModel = mongoose.model('Rooms', Rooms);
export default roomModel; 