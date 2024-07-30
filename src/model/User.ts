import mongoose, {Schema, Document} from "mongoose";


// firstly type the data through interface
// for the follow guideline in the schema
export interface Message extends Document{
    content : string;
    createdAt: Date
}


// define mongoose message schema
const MessageSchema:Schema<Message> = new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
})

// for the user schema
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifycode: string;
  verifycodeExpiry: Date;
  isAcceptingMessage:boolean;
  isVerified:boolean;
  message:Message[]
}

// define mongoose USer schema
const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "username is requires"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  verifycode: {
    type: String,
    required: [true, "verifycode is required"],
  },
  verifycodeExpiry: {
    type: Date,
    required: [true, "verifycodeExpiry is required"],
  },
  isVerified: {
    type: Boolean,
    default:false,
  },
  isAcceptingMessage: {
    type: Boolean,
    default:true,
  },
  message:[MessageSchema]
});


const UserModel= (mongoose.models.USer as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema)
export default UserModel;

// in next we use checks for it
//in express server run once and all bakend works properly
