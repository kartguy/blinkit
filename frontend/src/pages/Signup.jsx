import { useState } from "react";
import { Input } from "../components/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export function Signup(){
    const [email,setEmail] =useState();
    const[pass,setPass]=useState();
    const navigate=useNavigate();

    return(
        
            <div className="p-5 shadow-lg rounded-lg w-2/4 mt-32 ml-96">
                <div className="text-center mb-6">
                <div>
                    <h1 className=" text-5xl font-bold">Sign Up</h1>
                </div>
            
                <div className="mt-3 px-6">
                    <h1 className="text-xl ">Enter your information to create an account</h1>
                </div>
            </div>

                <div>
                <Input type="email" place="abc@gmail.com" name="Email"
                    onChange={(e)=>{
                    setEmail(e.target.value);
                }} 
                />

                <Input type="password" name="Password" 
                    onChange={(e)=>{
                        setPass(e.target.value);
                    }}
                />
                </div>

                <div className="p-2">
                <button className="bg-black w-full h-10 rounded-lg text-white text-lg"
                onClick={async ()=>{
                    try {
                        const response= await axios.post("http://localhost:2000/user/signup",{
                            email: email,
                            password: pass
                    })
                    console.log(response);
                    const token=response.data.token;

                    localStorage.setItem("token", token)

                    navigate('/upload')
                    
                        
                    } catch (error) {
                        console.log(error);
                    }
                    
                }}
                >Sign up</button>
            </div>

            <div className=" text-center text-md font-semibold">
                <h1>Already have an account? <a className=" underline text-lg" href="/login">Login</a></h1>
            </div>

            

            </div>

            
            
        
    )
}