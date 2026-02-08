import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function ChuridarMeasurements() {
  const { id  , usedFor} = useParams();
  const { baseUrl } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(false);

  const [chudi, setChudi] = useState({
    waist: "",
    hip: "",
    thigh: "",
    knee: "",
    calf: "",
    ankle: "",
    fullLength: "",
    extraChudiLength: "",
    frontRise: "",
    backRise: "",
    ankleFit: "",
    notes: "",
  });

  useEffect(() => {
    const fetchOneClient = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/admin/get-one-client/${id}`,
          { withCredentials: true }
        );
        setClient(res.data.client);
      } catch (err) {
        if (err.response?.status === 401) navigate("/");
        else toast.error("Failed to load client");
      }
    };
    fetchOneClient();
  }, [baseUrl, id, navigate]);

  const handleChange = (e) => {
    setChudi({ ...chudi, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const requiredFields = [
      "waist",
      "hip",
      "thigh",
      "knee",
      "calf",
      "ankle",
      "fullLength",
      "extraChudiLength",
    ];

    for (let field of requiredFields) {
      if (!chudi[field] || Number(chudi[field]) <= 0) {
        toast.error(`Please enter valid ${field}`);
        return false;
      }
    }

    if (!chudi.ankleFit) {
      toast.error("Please select ankle fit");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const payload = {
  chudi: {
    type: "Chudi",
    measurements: {
      waist: Number(chudi.waist),
      hip: Number(chudi.hip),
      thigh: Number(chudi.thigh),
      knee: Number(chudi.knee),
      calf: Number(chudi.calf),
      ankle: Number(chudi.ankle),
      fullLength: Number(chudi.fullLength),
      extraChudiLength: Number(chudi.extraChudiLength),
      frontRise: Number(chudi.frontRise),
      backRise: Number(chudi.backRise),
    },
    ankleFit: chudi.ankleFit,
    notes: chudi.notes,
  }
};

await axios.post(
  `${baseUrl}/admin/add-dress/chudi/${id}`,
  payload,
  { withCredentials: true }
);


      toast.success("Chudi measurements saved");
      navigate(-1);
    } catch (err) {
      toast.error("Failed to save measurement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-28 px-4 bg-[#F8F6F2] min-h-screen">
      <div className="max-w-xl mx-auto bg-white rounded-2xl p-6 shadow">
        <h1 className="text-center text-[#6B6B6B] mb-6">
          {usedFor==="to_update"?<span>Update</span>:<span>Add</span>} Chudi Measurement for{" "}
          <span className="text-[#D4AF37] font-semibold">
            {client.name}
          </span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Waist" name="waist" value={chudi.waist} onChange={handleChange} />
          <Input label="Hip" name="hip" value={chudi.hip} onChange={handleChange} />
          <Input label="Thigh" name="thigh" value={chudi.thigh} onChange={handleChange} />
          <Input label="Knee" name="knee" value={chudi.knee} onChange={handleChange} />
          <Input label="Calf" name="calf" value={chudi.calf} onChange={handleChange} />
          <Input label="Ankle" name="ankle" value={chudi.ankle} onChange={handleChange} />
          <Input label="Full Length" name="fullLength" value={chudi.fullLength} onChange={handleChange} />
          <Input label="Extra Chudi Length" name="extraChudiLength" value={chudi.extraChudiLength} onChange={handleChange} />
          <Input label="Front Rise" name="frontRise" value={chudi.frontRise} onChange={handleChange} />
          <Input label="Back Rise" name="backRise" value={chudi.backRise} onChange={handleChange} />

          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#6B6B6B]">Ankle Fit</label>
            <select
              name="ankleFit"
              value={chudi.ankleFit}
              onChange={handleChange}
              className="rounded-lg px-3 py-2 border focus:ring-2 focus:ring-[#4B2E83]"
            >
              <option value="">-- Select --</option>
              <option value="comfort">Comfort</option>
              <option value="tight">Tight</option>
            </select>
          </div>

           <div className="flex flex-col gap-1">
            <label className="text-sm text-[#6B6B6B]">Note</label>
            <textarea
                    name="notes"
                    value={chudi.notes}
                    onChange={handleChange}
                    rows={3}
                    className="rounded-lg px-3 py-2 border focus:ring-2 focus:ring-[#4B2E83]"
                    />
            </div>

        </div>

        {
                    usedFor==="add_new"&&(
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className={`w-full mt-6 py-3 rounded-xl text-white font-medium
                                ${loading ? "bg-gray-400" : "bg-[#4B2E83] hover:bg-[#3A2366]"}`}
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
        className="rounded-lg px-3 py-2 border focus:ring-2 focus:ring-[#4B2E83]"
      />
    </div>
  );
}
