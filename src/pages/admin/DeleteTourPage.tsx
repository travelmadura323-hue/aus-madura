import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";

export default function DeleteTourPage(){

const { id } = useParams();
const navigate = useNavigate();

const [title,setTitle] = useState("");

useEffect(()=>{

const fetchTour = async ()=>{

const { data } = await supabase
.from("tours")
.select("title")
.eq("id",id)
.single();

if(data){
setTitle(data.title);
}

};

fetchTour();

},[id]);

const deleteTour = async ()=>{

await supabase
.from("tours")
.delete()
.eq("id",id);

alert("Tour Deleted");

navigate("/admin/tours");

};

return(

<div className="p-10 max-w-xl">

<h1 className="text-2xl font-bold text-[#cc1215] mb-6">
Delete Tour
</h1>

<div className="bg-white shadow p-6 rounded">

<p className="mb-6">
Are you sure you want to delete this tour?
</p>

<p className="font-semibold mb-6">
{title}
</p>

<div className="flex gap-4">

<button
onClick={deleteTour}
className="bg-[#cc1215] text-white px-6 py-2 rounded"
>
Delete
</button>

<button
onClick={()=>navigate("/admin/tours")}
className="bg-[#191975] text-white px-6 py-2 rounded"
>
Cancel
</button>

</div>

</div>

</div>

);

}