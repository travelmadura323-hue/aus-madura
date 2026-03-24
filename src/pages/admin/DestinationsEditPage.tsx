import { useParams } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function EditDestination(){

  const { id } = useParams();

  const [name,setName] = useState("");

  const updateDestination = async ()=>{

    await supabase
      .from("destinations")
      .update({ name })
      .eq("id",id);

    alert("Updated");

  };

  return(

    <div className="p-10">

      <h1 className="text-2xl text-[#191975] mb-6">
        Edit Destination
      </h1>

      <input
        placeholder="New Name"
        className="border p-2 mb-4"
        onChange={(e)=>setName(e.target.value)}
      />

      <button
        onClick={updateDestination}
        className="bg-[#191975] text-white px-5 py-2 rounded"
      >
        Update
      </button>

    </div>

  );

}
