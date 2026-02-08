import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from "../Context/GlobalContext";
import { useNavigate } from "react-router-dom"
import axios from 'axios';

export default function SearchClient() {
  const { baseUrl } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");

  // fetch all clients
  useEffect(() => {
    const fetchAllClient = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/admin/get-all-clients`,
          { withCredentials: true }
        );
        setClients(res.data.clients);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/");
        }
        console.log(err);
      }
    };
    fetchAllClient();
  }, [baseUrl, navigate]);

  // filter logic
  const filteredClients = clients.filter(client =>
    client.name?.toLowerCase().includes(search.toLowerCase()) ||
    client.phone?.includes(search) ||
    client.customerId?.toLowerCase().includes(search.toLowerCase())
  );

  return (
  <div className="pt-28 px-4 bg-[#F8F6F2] min-h-screen">

    {/* Search Center */}
    <div className="flex justify-center mb-8">
      <input
        type="search"
        placeholder="Search by name, phone, customer ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full md:w-1/2 lg:w-1/3
          rounded-xl px-4 py-2.5 border bg-[#FFFFFF]
          focus:outline-none focus:ring-2 focus:ring-[#4B2E83]
        "
      />
    </div>

    {/* No Data */}
    {filteredClients.length === 0 ? (
      <div className="flex items-center justify-center mt-20">
        <p className="text-3xl font-medium text-[#D4AF37] text-center">
          No Client data available
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map(client => (
          <div
            key={client._id}
            className="
              bg-[#FFFFFF] p-5 rounded-2xl shadow-sm
              border border-[#E6C85C]/40
              hover:shadow-md hover:border-[#4B2E83]
              transition-all duration-300
              flex flex-col gap-2
            "
          >
            <h1 className="text-xl font-semibold text-[#1F1F1F]">
              {client.name}
            </h1>

            <div className="w-full h-[1px] bg-[#E6C85C]/40 my-1"></div>

            <p className="text-[#6B6B6B] flex items-center gap-2 text-sm">
              <span className="text-[#4B2E83]">📞</span> {client.phone}
            </p>

            <p className="text-[#6B6B6B] flex items-center gap-2 text-sm">
              <span className="text-[#4B2E83]">🆔</span> {client.customerId}
            </p>
            <div  className=' flex items-center justify-center'>
              <button
                onClick={()=>navigate(`/one-client/data/${client._id}`)}
                className="w-1/2 bg-[#4B2E83] text-white py-2 rounded-lg font-semibold transition hover:bg-[#E6C85C] hover:text-[#1F1F1F]"
              >View Full Details</button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

}
