import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GlobalContext } from '../Context/GlobalContext'
import axios from 'axios'

export default function OneClientData() {
  const { id } = useParams()
  const { baseUrl } = useContext(GlobalContext)
  const navigate = useNavigate()
 

  const [client, setClient] = useState(null)

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
  }, [baseUrl, navigate, id])

  if (!client) return null

  return (
    <div className="pt-28 pb-28 px-4 bg-[#F8F6F2] min-h-screen">

      {/* Client Details Card */}
      <div className="max-w-xl mx-auto bg-white rounded-2xl p-6 shadow border border-[#E6C85C]/40">

        <h1 className="text-2xl font-semibold text-[#1F1F1F] mb-2">
          {client.name}
        </h1>

        <div className="space-y-1 text-[#6B6B6B]">
          <p>📞 {client.phone}</p>
          <p>🆔 {client.customerId}</p>
          <p>📍 {client.address}</p>
          <p>
            🚻 Gender:{" "}
            <span className="font-medium text-[#4B2E83]">
              {client.gender}
            </span>
          </p>
          <div className=' flex flex-row gap-5'>
            <button
              className='edit-btn'
            >Update</button>

            <button
              className='delete-btn'
              onClick={()=>navigate(`/delete/client/${id}/${client.customerId}`)}
            >Delete</button>
          </div>
        </div>
      </div>

      {/* Dress Section */}
      <div className="max-w-xl mx-auto mt-8">

        <h2 className="text-xl font-semibold text-[#1F1F1F] mb-4">
    Dress Details
  </h2>

  {/* Existing Dresses */}
  {client.dresses && client.dresses.length > 0 ? (
    client.dresses.map((dress, index) => (
      <DressCard key={index} dress={dress} id={id} />
    ))
  ) : (
    <p className="text-[#6B6B6B] text-sm mb-4">
      No dress measurements added yet.
    </p>
  )}

        <h2 className="text-xl font-semibold text-[#1F1F1F] mb-4">
          Add Dress Details
        </h2>

        {/* MALE */}
        {client.gender === "Male" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="dress-btn"
              onClick={()=>navigate(`/add-shirt-measurement/${id}/add_new`)}
            >➕ Add Shirt</button>
            <button className="dress-btn"
              onClick={()=>navigate(`/add-pant-measurement/${id}/add_new`)}
            >➕ Add Pants</button>
          </div>
        )}

        {/* FEMALE */}
        {client.gender === "Female" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="dress-btn"
              onClick={()=>navigate(`/add-chudi-measurement/${id}/add_new`)}
            >➕ Add Chudi</button>
            <button className="dress-btn"
              onClick={()=>navigate(`/add-kurti-measurement/${id}/add_new`)}
            >➕ Add Kurti</button>
          </div>
        )}
      </div>
    </div>
  )
}


function DressCard({ dress ,id}) {
  const navigate=useNavigate();
  const dressName = dress.type.toLocaleLowerCase();
  return (
    <div className="bg-white rounded-2xl p-5 shadow border border-[#E6C85C]/40 mb-4">

      <h3 className="text-lg font-semibold text-[#4B2E83] mb-3">
        👕 {dress.type}
      </h3>

      {/* Measurements */}
      <div className="grid grid-cols-2 gap-2 text-sm text-[#6B6B6B]">
        {Object.entries(dress.measurements).map(([key, value]) => (
          <div key={key} className="flex justify-between">
            <span className="capitalize">{key}</span>
            <span className="font-medium text-[#1F1F1F]">{value}</span>
          </div>
        ))}
      </div>

      {/* Notes */}
      {dress.notes && (
        <p className="mt-3 text-sm text-[#6B6B6B]">
          📝 <span className="font-medium">Notes:</span> {dress.notes}
        </p>
      )}
      <button 
        className='edit-btn'
        onClick={()=>navigate(`/add-${dressName}-measurement/${id}/to_update`)}
      >Edit the size</button>
    </div>
  )
}
