import mongoose from "mongoose";



const user_schema=mongoose.Schema({
    email:{
        type:"String",
        require:true
    },
    password:{
        type:"String",
        require:true
    }
})

const User=mongoose.model("User",user_schema)
export default User