import { useParams } from "react-router-dom";
import { supabase } from "../../../lib/supabase";

export default function DeleteDestination(){

  const { id } = useParams();

  const deleteDestination = async ()=>{

    await supabase
      .from("destinations")
      .delete()
      .eq("id",id);

    alert("Deleted");

  };

  return(

    <div className="p-10">

      <h1 className="text-2xl text-[#cc1215] mb-6">
        Delete Destination
      </h1>

      <button
        onClick={deleteDestination}
        className="bg-[#cc1215] text-white px-6 py-2 rounded"
      >
        Confirm Delete
      </button>

    </div>

  );

}