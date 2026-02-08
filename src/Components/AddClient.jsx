import React, { useContext, useState } from 'react';
import { GlobalContext } from '../Context/GlobalContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddClient() {
  const [user, setUser] = useState({
    name: "",
    phone: "",
    gender: "",
    address: ""
  });
  const {baseUrl}=useContext(GlobalContext);
  const navigate = useNavigate()
  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try{
      const res = await axios.post(`${baseUrl}/admin/add-new-client`,{
        name:user.name,
        phone:user.phone,
        gender:user.gender,
        address:user.address
      }
        ,{ withCredentials: true });
        if(res.data.data){
          navigate(`/one-client/data/${res.data.data._id}`)
        }
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F6F2]">
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-[#1F1F1F]">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="mt-1 mb-5 w-full rounded-lg px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-[#4B2E83]"
            placeholder="Enter Name"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-[#1F1F1F]">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="mt-1 mb-5 w-full rounded-lg px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-[#4B2E83]"
            placeholder="Enter Phone number"
          />
        </div>

        {/* Gender (Radio Buttons) */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-[#1F1F1F]">Select Gender</label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2">
              <input 
                type="radio" 
                name="gender" 
                value="Male"
                checked={user.gender === "Male"}
                onChange={handleChange}
              />
              Male
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="radio" 
                name="gender" 
                value="Female"
                checked={user.gender === "Female"}
                onChange={handleChange}
              />
              Female
            </label>
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-[#1F1F1F]">Address</label>
          <textarea
            name="address"
            value={user.address}
            onChange={handleChange}
            className="mt-1 mb-5 w-full rounded-lg px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-[#4B2E83]"
            placeholder="Enter Address"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#4B2E83] text-white py-2 rounded-lg font-semibold transition hover:bg-[#E6C85C] hover:text-[#1F1F1F]"
        >
          Add Client
        </button>
      </form>
    </div>
  );
}

