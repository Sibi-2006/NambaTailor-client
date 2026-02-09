import { useParams } from 'react-router-dom';
import React, { useContext, useState ,useEffect} from 'react';
import { GlobalContext } from '../Context/GlobalContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

export default function EditClient() {
    const {id} = useParams();
    const [user, setUser] = useState({
        name: "",
        phone: "",
        gender: "",
        address: ""
      });
    const {baseUrl}=useContext(GlobalContext);
    const navigate = useNavigate();
    const [client, setClient] = useState({})
    
    const handleChange = (e) => {
    const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
        };
    useEffect(() => {
    const fetchOneClient = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/admin/get-one-client/${id}`,
          { withCredentials: true }
        )
        setClient(res.data.client)
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/")
        }
        console.log(err)
      }
    }
    fetchOneClient()
  }, [baseUrl, navigate, id]);

  useEffect(() => {
  if (client && client.name) {
    setUser({
      name: client.name || "",
      phone: client.phone || "",
      gender: client.gender || "",
      address: client.address || ""
    });
  }
}, [client]);

const handleSubmit = async (e)=>{
    e.preventDefault();
    
      // 🔍 Validation
      if (!user.name.trim()) {
        toast.error("Name is required");
        return;
      }
    
      if (!user.phone.trim()) {
        toast.error("Phone number is required");
        return;
      }
    
      if (!/^\d{10}$/.test(user.phone)) {
        toast.error("Phone number must be 10 digits");
        return;
      }
    
      if (!user.gender) {
        toast.error("Please select gender");
        return;
      }
    
      if (!user.address.trim()) {
        toast.error("Address is required");
        return;
      }

      try{
         const res = await axios.patch(
              `${baseUrl}/admin/update/${id}`,
              user,
              { withCredentials: true }
            );

            if (res.data.updatedClient) {
                  toast.success("Client update successfully ✅");
            
                  setTimeout(() => {
                    navigate(-1);
                  }, 1200);
            }
      }catch(err){
        toast.error("Something went wrong ❌");
      }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F6F2]">
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
      >
        <h1 className=' text-secondary text-center'>Update details for <span className='text-primary font-medium'>{client.name}</span> </h1>
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
          className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold transition hover:bg-green-400 "
        >
          Update Client
        </button>
      </form>
    </div>
  )
}
