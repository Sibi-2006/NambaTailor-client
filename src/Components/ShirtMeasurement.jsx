import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GlobalContext } from '../Context/GlobalContext'
import axios from 'axios'
import { toast } from "react-toastify"

export default function ShirtMeasurement() {

  const [shirt, setShirt] = useState({
    neck: "",
    chest: "",
    waist: "",
    shoulder: "",
    sleeve: "",
    length: "",
    cuff: "",
    note: ""
  })

  const { id , usedFor } = useParams()
  const { baseUrl } = useContext(GlobalContext)
  const navigate = useNavigate()
  const [client, setClient] = useState({})
  const [loading, setLoading] = useState(false)
  const [dresses,setDresses] = useState([]);

  // 🔹 Fetch client
  useEffect(() => {
    const fetchOneClient = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/admin/get-one-client/${id}`,
          { withCredentials: true }
        )
        setClient(res.data.client);
        setDresses(res.data.client.dresses);
        
      } catch (err) {
        console.log(err)
        if (err.response?.status === 401) {
          navigate("/")
        } else {
          toast.error("Failed to load client data")
        }
      }
    }
    fetchOneClient()
  }, [baseUrl, navigate, id]);

  useEffect(() => {
  const checkDressInClientData = () => {
    
    const shirtone = dresses.find(drs => drs.type === "Shirt");
    if(!shirtone) return;
    const shirtData = shirtone.measurements;
    if (shirtData) {
      const currShirt ={
        neck: shirtData.neck,
        chest: shirtData.chest,
        waist: shirtData.waist,
        shoulder: shirtData.shoulder,
        sleeve: shirtData.sleeve,
        length: shirtData.length,
        cuff: shirtData.cuff,
        note:shirtone.notes,
      }
      setShirt(currShirt);
    } else {
      return;
    }
  };

  checkDressInClientData();
}, [dresses]);


  // 🔹 Handle input change
  const handleChange = (e) => {
    setShirt({ ...shirt, [e.target.name]: e.target.value })
  }

  // 🔹 Frontend validation
  const validateForm = () => {
    const requiredFields = [
      "neck",
      "chest",
      "waist",
      "shoulder",
      "sleeve",
      "length",
      "cuff"
    ]

    for (let field of requiredFields) {
      if (!shirt[field] || shirt[field].toString().trim() === "") {
        toast.error(`${field.toUpperCase()} is required`)
        return false
      }

      if (Number(shirt[field]) <= 0) {
        toast.error(`${field.toUpperCase()} must be greater than 0`)
        return false
      }
    }
    return true
  }

  // 🔹 Submit measurement
  const handleSubmit = async () => {
    if (!validateForm()) return

    try {
      setLoading(true)

      const res = await axios.post(
        `${baseUrl}/admin/add-dress/shirt/${id}`,
        {
          type: "Shirt",
          neck: shirt.neck,
          chest: shirt.chest,
          waist: shirt.waist,
          shoulder: shirt.shoulder,
          sleeve: shirt.sleeve,
          length: shirt.length,
          cuff: shirt.cuff,
          note: shirt.note
        },
        { withCredentials: true }
      )

      toast.success(res.data.message || "Shirt measurement added successfully")

      // reset form
      setShirt({
        neck: "",
        chest: "",
        waist: "",
        shoulder: "",
        sleeve: "",
        length: "",
        cuff: "",
        note: ""
      })

    } catch (err) {
      console.log(err)

      if (err.response?.data?.message) {
        toast.error(err.response.data.message)
      } else {
        toast.error("Something went wrong")
      }

      if (err.response?.status === 401) {
        navigate("/")
      }
    } finally {
      setLoading(false)
    }
  }

  if (!client) return null

  const handleUpdate = ()=>{
    if (!validateForm()) return
    console.log(shirt)
  }

  return (
    <div className="pt-28 px-4 bg-[#F8F6F2] min-h-screen">

      <div className="max-w-xl mx-auto bg-white rounded-2xl p-6 shadow border border-[#E6C85C]/40">

        <h1 className="text-center text-[#6B6B6B] mb-6">
          {usedFor==="to_update"?<span>Update</span>:<span>Add</span>} Shirt Measurement for{" "}
          <span className="text-[#D4AF37] font-semibold">
            {client.name}
          </span>
        </h1>

        {/* Measurement Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <Input label="Neck" name="neck" value={shirt.neck} onChange={handleChange} />
          <Input label="Chest" name="chest" value={shirt.chest} onChange={handleChange} />
          <Input label="Waist" name="waist" value={shirt.waist} onChange={handleChange} />
          <Input label="Shoulder" name="shoulder" value={shirt.shoulder} onChange={handleChange} />
          <Input label="Sleeve Length" name="sleeve" value={shirt.sleeve} onChange={handleChange} />
          <Input label="Shirt Length" name="length" value={shirt.length} onChange={handleChange} />
          <Input label="Cuff" name="cuff" value={shirt.cuff} onChange={handleChange} />

          {/* Notes */}
          <div className="flex flex-col gap-1 sm:col-span-2">
            <label className="text-sm text-[#6B6B6B]">Notes</label>
            <textarea
              name="note"
              value={shirt.note}
              onChange={handleChange}
              placeholder="Notes (optional)"
              className="
                rounded-lg px-3 py-2 border
                focus:outline-none
                focus:ring-2
                focus:ring-[#4B2E83]
              "
            />
          </div>

        </div>
        {/* Submit Button */}
      {
        usedFor==="add_new"&&(
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`
                w-full mt-6 py-3 rounded-xl
                text-white font-medium transition-all
                ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#4B2E83] hover:bg-[#3A2366]"
                }
              `}
            >
              {loading ? "Saving..." : "Save Measurement"}
            </button>
        )
      }

      {
        usedFor==="to_update"&&(
          <button
          className='update-btn'
          onClick={handleUpdate}
          >
            Update the size
          </button>
        )
      }
        
        

      </div>
    </div>
  )
}

/* 🔹 Reusable Input Component */
function Input({ label, name, value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-[#6B6B6B]">{label}</label>
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        placeholder="in inches"
        className="
          rounded-lg px-3 py-2 border
          focus:outline-none
          focus:ring-2
          focus:ring-[#4B2E83]
        "
      />
    </div>
  )
}
