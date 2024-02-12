import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageGallery from "../components/ImageGallery";

export function UploadImg(){
const [image, setImage] = useState(null);
const [trigger,setTrigger]=useState(false)
const token=localStorage.getItem("token");
const navigate=useNavigate();
useEffect(()=>{
  if(!token){
      setTimeout(() => {
          alert("Please Login.")
      }, 100);
      navigate('/login')
  }
},[])
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  
  const handleUpload = async () => {
    if(image==null) {
      return;
    }
    const formData = new FormData();
    formData.append('image', image);

    try {
      const result=await axios.post('http://localhost:2000/img/upload', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization":"Bearer "+token

        },
      });
      setTimeout(() => {
        alert(result.data.message)
    }, 100);

      setTrigger((prev)=>!prev);
      console.log(result.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <div>
      <input type="file" onChange={handleImageChange} className="text-lg font-bold p-4" />
      </div>
      <div className="text-lg font-bold p-2 border-r-emerald-950 border-s-violet-300 ">
      <button onClick={handleUpload}
      className="border-gray-500 border-2 p-2 rounded-lg"
      >Upload Image</button>  
      <br />
      </div>

      <div>
        <ImageGallery update={trigger} />
      </div>
    </div>
  );
}