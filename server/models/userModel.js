import  mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        min:2,
        max:50
    },
    lastname:{
        type:String,
        required:true,
        min:2,
        max:50
    },
    email:{
        type:String,
        required:true,
        unique:true,
        max:50
    },
    password:{
        type:String,
        required:true,
        min:2,
        max:50
    },
    picturePath:{
        type:String,
        default:""
    },
    friends:{
        type:Array,
        default:[]
    },
    location:String,
    occupation:String,
    viewedProfile:Number,
    impressions:Number
},
{timestamps:true}
)

export default   mongoose.model("User", userSchema);