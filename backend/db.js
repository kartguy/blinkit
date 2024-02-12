const { mongoose } = require("mongoose");
const bcrypt=require("bcrypt")

const userSchema=new mongoose.Schema(
    {
    email:{
            type:String,
            required:true,
            unique:true
        },
    password:{
        type: String,
        required: true,
        minLength: 6
    }

},
{timestamps:true}
)


const imageSchema = new mongoose.Schema({
    filename: String,
    path: String,
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
  });
  
const Image = mongoose.model('Image', imageSchema);
  


userSchema.methods.createHash = async function (plainTextPassword) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainTextPassword, salt);
  };
  
userSchema.methods.validatePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };

  const User=mongoose.model("user",userSchema);


  

  module.exports= {
    User,Image
}