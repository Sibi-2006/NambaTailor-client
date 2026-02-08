import React, { useContext, useEffect } from 'react'
import AddNewClient from "../Images/AddUser.png";
import SearchClient from "../Images/SearchUser.png"
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../Context/GlobalContext';
import axios from 'axios';
export default function HomePage() {
    const navigate = useNavigate();
    const { baseUrl } = useContext(GlobalContext);

    useEffect(() => {
  const checkAdmin = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/admin/dashboard`,
        { withCredentials: true }
      );

      console.log("dashboard:", res.data);

    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/");
      }
      console.log(err);
    }
  };

  checkAdmin(); 
}, [baseUrl, navigate]);


  return (
    <div className=' flex items-center justify-center min-h-screen flex-col md:flex-row gap-5'>

    {/* add new client */}
      <div className=' border-2 border-primary rounded-lg hover:scale-105 hover:cursor-pointer hover:shadow-2xl text-textPrimary hover:text-secondary'
      onClick={()=>navigate("/add-new-client")}
      >
        <img className=' w-52 h-44 rounded-lg py-2'  src={AddNewClient} alt="add new client img" />
        <h1 className=' font-semibold text-center'>Add New client</h1>
      </div>

      {/* search the client */}
      <div className=' border-2 border-primary rounded-lg hover:cursor-pointer hover:scale-105 hover:shadow-2xl text-textPrimary hover:text-secondary'
      onClick={()=>navigate("/search-client")}
      >
        <img className=' w-52 h-44 rounded-lg py-2' src={SearchClient} alt="search client img" />
        <h1 className='  font-semibold text-center '>Search client</h1>
      </div>
    </div>
  )
}
