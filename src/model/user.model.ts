import mongoose from 'mongoose'
const Schema = mongoose.Schema
import Joi from 'Joi'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const userSchema = new Schema({
    username :{
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    role :{
        type : String,
        required : true,
        trim : true,
        default : 'guest'
    },
    password : {
        type : String,
        required : true
    },
    confirmPassword : {
        type : String,
        required: true
    },
})

const userValidator = Joi.object({
    username : Joi.string().alphanum().min(10).max(50).required(),
    role: Joi.string().valid('guest', 'admin'),
    password : Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{8,20}$')).required(),
    confirmPassword :Joi.ref('password')
})



// Define static method to be used on User object
// userSchema.methods.generateAuthToken = function t() {
//     const token = jwt.sign({
//       _id: this._id,
//       email: this.email,
//       role: this.role
//     },
//      process.env.JwT_SECRET,{ expiresIn: '7 days' });
  
//     return token;
//   };
  
  userSchema.methods.toJSON = function toJSON() {
    const userObject = this.toObject();
  
    delete userObject.password;
  
    return userObject;
  };
  
  userSchema.set('toJSON', {
    versionKey: false,
    transform(doc, ret) {
      // eslint-disable-next-line no-param-reassign
      delete ret.password;
    }
  });
  
  userSchema.pre('save', async function preSave(next) {
    if (this.isModified('password') || this.isNew) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });
  
const usermodel = mongoose.model('user', userSchema)
export default usermodel