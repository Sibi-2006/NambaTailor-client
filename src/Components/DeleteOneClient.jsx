import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-toastify"
import { GlobalContext } from "../Context/GlobalContext"
export default function DeleteOneClient() {
    const { id , cId } = useParams();
    const [c_id , setC_id] = useState("CUST");
    const navigate = useNavigate();
    const { baseUrl } = useContext(GlobalContext)
    const handleChange = (e)=>{
        setC_id(e.target.value);
    }

    const handleDelete = async () => {
  if (c_id.trim() === "") {
    toast.error("Enter the customer Id");
    return;
  }

  if (c_id.trim() !== cId.trim()) {
    toast.error("Enter the correct customer Id");
    return;
  }

  try {
    const res = await axios.delete(
      `${baseUrl}/admin/delete/client/${id}`,
      { withCredentials: true }
    );

    toast.success(res.data.message);
    navigate("/search-client"); 

  } catch (err) {
    console.log(err);

    if (err.response?.status === 401) {
      navigate("/");
      return;
    }

    toast.error(err.response?.data?.message || "Server error");
  }
};


  return (
    <div className="pt-28 pb-28 px-4 bg-[#F8F6F2] min-h-screen">
        <div className='max-w-xl mx-auto bg-white rounded-2xl p-6 shadow border border-red-500 flex flex-col gap-3'>
            <p>
                Enter the customer Id <span className='text-red-500 font-bold'>{cId}</span> to delete the client
            </p>
            <input type="text" placeholder='enter customer Id'
                className='delete-input'
                value={c_id}
                onChange={handleChange}
            />
            <button 
                disabled={c_id.trim() !== cId}
                className='delete-btn'
                onClick={handleDelete}
            >Delete client</button>
        </div>
      
    </div>
  )
}
