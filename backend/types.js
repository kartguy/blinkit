const z=require("zod");

const signupBody=z.object({
    email:z.string().email(),
    password:z.string().min(6,{message:"Must be atleast 5 characters"})
})

const loginBody=z.object({
    email:z.string().email(),
    password:z.string().min(6,{message:"Must be atleast 5 characters"})
})

module.exports={
    signupBody,
    loginBody
}