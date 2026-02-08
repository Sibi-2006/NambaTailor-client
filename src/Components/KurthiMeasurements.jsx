import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext";
import axios from "axios";
import { toast } from "react-toastify";
export default function KurthiMeasurements() {

     const { id, usedFor } = useParams();
        const { baseUrl } = useContext(GlobalContext);
        const navigate = useNavigate();

        const [client, setClient] = useState({});
        const [loading, setLoading] = useState(false);
    const [kurti, setKurti] = useState({
            bust: "",
            waist: "",
            hip: "",
            shoulder: "",
            neck: "",
            frontNeckDepth: "",
            backNeckDepth: "",
            armhole: "",
            sleeveLength: "",
            sleeveRound: "",
            kurtiLength: "",
            bottomWidth: "",
            slitLength: "",
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
            setKurti({ ...kurti, [e.target.name]: e.target.value });
        };

        const validate = () => {
                const requiredFields = [
                     "bust",
                    "waist",
                    "hip",
                    "shoulder",
                    "neck",
                    "frontNeckDepth",
                    "backNeckDepth",
                    "armhole",
                    "sleeveLength",
                    "sleeveRound",
                    "kurtiLength",
                    "bottomWidth",
                    "slitLength",
                ];
            
                for (let field of requiredFields) {
                if (!kurti[field] || Number(kurti[field]) <= 0) {
                    toast.error(`Please enter valid ${field}`);
                    return false;
                }
                }
            
                return true;
            };

        const handleSubmit = async () => {
            if (!validate()) return;
            try {
      setLoading(true);

      const payload = {
            kurti: {
                type: "Kurti",
                measurements: {
                    bust: Number(kurti.bust),
                    waist: Number(kurti.waist),
                    hip: Number(kurti.hip),
                    shoulder:  Number(kurti.shoulder),
                    neck:  Number(kurti.neck),
                    frontNeckDepth:  Number(kurti.frontNeckDepth),
                    backNeckDepth:  Number(kurti.backNeckDepth),
                    armhole:  Number(kurti.armhole),
                    sleeveLength:  Number(kurti.sleeveLength),
                    sleeveRound:  Number(kurti.sleeveRound),
                    kurtiLength:  Number(kurti.kurtiLength),
                    bottomWidth:  Number(kurti.bottomWidth),
                    slitLength:  Number(kurti.slitLength),
                },
                notes: kurti.notes,
            }
            };

            await axios.post(
            `${baseUrl}/admin/add-dress/kurti/${id}`,
            payload,
            { withCredentials: true }
            );


                toast.success("kurti measurements saved");
                navigate(-1);
                } catch (err) {
                toast.error("Failed to save measurement");
                } finally {
                setLoading(false);
                }
        }

  return (
    <div className="py-28 px-4 bg-[#F8F6F2] min-h-screen">
        <div className="max-w-xl mx-auto bg-white rounded-2xl p-6 shadow">
          
                <h1 className="text-center text-[#6B6B6B] mb-6">
                {usedFor==="to_update"?<span>Update</span>:<span>Add</span>} Kurti Measurement for{" "}
                <span className="text-[#D4AF37] font-semibold">
                    {client.name}
                </span>
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Bust" name="bust" value={kurti.bust} onChange={handleChange} />
                    <Input label="Waist" name="waist" value={kurti.waist} onChange={handleChange} />
                    <Input label="Hip" name="hip" value={kurti.hip} onChange={handleChange} />
                    <Input label="Shoulder" name="shoulder" value={kurti.shoulder} onChange={handleChange} />
                    <Input label="Neck" name="neck" value={kurti.neck} onChange={handleChange} />
                    <Input label="Front neck depth" name="frontNeckDepth" value={kurti.frontNeckDepth} onChange={handleChange} />
                    <Input label="Back neck depth" name="backNeckDepth" value={kurti.backNeckDepth} onChange={handleChange} />
                    <Input label="Arm hole" name="armhole" value={kurti.armhole} onChange={handleChange} />
                    <Input label="Sleeve length" name="sleeveLength" value={kurti.sleeveLength} onChange={handleChange} />
                    <Input label="Sleeve round" name="sleeveRound" value={kurti.sleeveRound} onChange={handleChange} />
                    <Input label="Kurti length" name="kurtiLength" value={kurti.kurtiLength} onChange={handleChange} />
                    <Input label="Bottom width" name="bottomWidth" value={kurti.bottomWidth} onChange={handleChange} />
                    <Input label="Slit length" name="slitLength" value={kurti.slitLength} onChange={handleChange} />

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-[#6B6B6B]">Note</label>
                        <textarea
                                name="notes"
                                value={kurti.notes}
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
  )
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