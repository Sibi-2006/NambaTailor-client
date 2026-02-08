import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function PantsMeasurement() {

  const [pant, setPant] = useState({
    waist: "",
    hip: "",
    length: "",
    inseam: "",
    thigh: "",
    knee: "",
    bottom: "",
    calf: "",       // optional
    frontRise: "",  
    backRise: "",
        
  });

  const { id , usedFor} = useParams();
  const { baseUrl } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch client
  useEffect(() => {
    const fetchOneClient = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/admin/get-one-client/${id}`,
          { withCredentials: true }
        );
        setClient(res.data.client);
      } catch (err) {
        console.log(err);
        if (err.response?.status === 401) {
          navigate("/");
        } else {
          toast.error("Failed to load client data");
        }
      }
    };
    fetchOneClient();
  }, [baseUrl, navigate, id]);

  // 🔹 Handle input
  const handleChange = (e) => {
    setPant({ ...pant, [e.target.name]: e.target.value });
  };

  // 🔹 Validation
  const validateForm = () => {
    const requiredFields = [
      "waist",
      "hip",
      "length",
      "inseam",
      "thigh",
      "knee",
      "bottom"
    ];

    for (let field of requiredFields) {
      if (!pant[field] || pant[field].toString().trim() === "") {
        toast.error(`${field.toUpperCase()} is required`);
        return false;
      }
      if (Number(pant[field]) <= 0) {
        toast.error(`${field.toUpperCase()} must be greater than 0`);
        return false;
      }
    }

    // optional fields validation
    const optionalFields = ["calf", "frontRise", "backRise"];
    for (let field of optionalFields) {
      if (pant[field] && Number(pant[field]) <= 0) {
        toast.error(`${field.toUpperCase()} must be greater than 0`);
        return false;
      }
    }

    return true;
  };

  // 🔹 Submit
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const res = await axios.post(
        `${baseUrl}/admin/add-dress/pant/${id}`,
        {
          type: "Pant",
          ...pant
        },
        { withCredentials: true }
      );

      toast.success(res.data.message || "Pant measurement added successfully");

      // reset
      setPant({
        waist: "",
        hip: "",
        length: "",
        inseam: "",
        thigh: "",
        knee: "",
        bottom: "",
        calf: "",
        frontRise: "",
        backRise: ""
      });

    } catch (err) {
      console.log(err);

      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong");
      }

      if (err.response?.status === 401) {
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!client) return null;

  return (
    <div className="pt-28 px-4 bg-[#F8F6F2] min-h-screen">

      <div className="max-w-xl mx-auto bg-white rounded-2xl p-6 shadow border border-[#E6C85C]/40">

        <h1 className="text-center text-[#6B6B6B] mb-6">
          {usedFor==="to_update"?<span>Update</span>:<span>Add</span>} Pant Measurement for{" "}
          <span className="text-[#D4AF37] font-semibold">
            {client.name}
          </span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <Input label="Waist" name="waist" value={pant.waist} onChange={handleChange} />
          <Input label="Hip" name="hip" value={pant.hip} onChange={handleChange} />
          <Input label="Length" name="length" value={pant.length} onChange={handleChange} />
          <Input label="Inseam" name="inseam" value={pant.inseam} onChange={handleChange} />
          <Input label="Thigh" name="thigh" value={pant.thigh} onChange={handleChange} />
          <Input label="Knee" name="knee" value={pant.knee} onChange={handleChange} />
          <Input label="Bottom / Hem" name="bottom" value={pant.bottom} onChange={handleChange} />
          <Input label="Calf (optional)" name="calf" value={pant.calf} onChange={handleChange} />
          <Input label="Front Rise (optional)" name="frontRise" value={pant.frontRise} onChange={handleChange} />
          <Input label="Back Rise (optional)" name="backRise" value={pant.backRise} onChange={handleChange} />

        </div>

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
            <button>update the size</button>
          )
        }
        

      </div>
    </div>
  );
}

/* 🔹 Reusable Input */
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
  );
}
