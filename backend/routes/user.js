const { User } = require("../db");
const { createTokenForUser, validateToken } = require("../services/auth");
const { signupBody, loginBody } = require("../types");
const express=require("express");
const router=express.Router();


router.post('/signup',async(req,res)=>{
    const userbody=req.body;

    const parsedPayload=signupBody.safeParse(userbody);

    if(!parsedPayload.success){
        console.log(parsedPayload.error);
        res.status(411).json({msg:`Wrong input.`})
        return;
    }

    try {
        const existingUser=await User.findOne({email:userbody.email});
        if(existingUser){
            return res.status(411).json({msg:"Email already taken."})
        }

        const newUser = new User({
            email: userbody.email,
        });

        const hashedPassword=await newUser.createHash(userbody.password);

        newUser.password=hashedPassword;

        await newUser.save();

        const token= createTokenForUser(newUser);

        return res.status(201).json({   
            msg:"User created successfully.",
            token:`${token}`
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg:"Server not working" });
    }
})

router.use('/login',async (req,res)=>{
    const userBody=req.body;
    const parsedPayload=loginBody.safeParse(userBody);

    if(!parsedPayload.success){
        console.log(parsedPayload.error);
        return res.status(411).json({msg:`Wrong inputs.`})
    }

    try {
        const user=await User.findOne({email:userBody.email});

        if(user==null){
            return res.status(400).json({
                msg: "User not found."
            })
        }
        else{
            if (await user.validatePassword(userBody.password)) {
                
                const token= createTokenForUser(user);

                return res.status(200).json({
                  message: "User Successfully Logged In",
                  token:`${token}`
                });
              } else {
                return res.status(400).json({
                  message: "Incorrect Password",
                });
              }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg:"Server error" });
    }
})



module.exports= {userRouter:router};



