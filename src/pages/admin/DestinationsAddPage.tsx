import { useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function AddDestination() {

  const [name,setName] = useState("");
  const [region,setRegion] = useState("");
  const [description,setDescription] = useState("");
  const [image,setImage] = useState<File | null>(null);

  const handleSubmit = async () => {

    if(!image) {
      alert("Upload image");
      return;
    }

    const fileName = `${Date.now()}-${image.name}`;

    const { error } = await supabase
      .storage
      .from("destinations")
      .upload(fileName,image);

    if(error){
      alert("Image upload failed");
      return;
    }

    const { data } = supabase
      .storage
      .from("destinations")
      .getPublicUrl(fileName);

    const imageUrl = data.publicUrl;

    await supabase
      .from("destinations")
      .insert({
        name,
        region,
        description,
        image:imageUrl
      });

    alert("Destination Added");

  };

  return(

    <div className="p-10 max-w-xl">

      <h1 className="text-2xl font-bold text-[#191975] mb-6">
        Add Destination
      </h1>

      <input
        placeholder="Destination Name"
        className="border p-2 w-full mb-3"
        onChange={(e)=>setName(e.target.value)}
      />

      <input
        placeholder="Region"
        className="border p-2 w-full mb-3"
        onChange={(e)=>setRegion(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="border p-2 w-full mb-3"
        onChange={(e)=>setDescription(e.target.value)}
      />

      <input
        type="file"
        className="mb-4"
        onChange={(e)=>setImage(e.target.files?.[0] || null)}
      />

      <button
        onClick={handleSubmit}
        className="bg-[#191975] text-white px-6 py-2 rounded"
      >
        Add Destination
      </button>

    </div>

  );

}