import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../lib/supabase";

export default function EditTourPage(){

const { id } = useParams();

const [title,setTitle] = useState("");
const [overview,setOverview] = useState("");
const [price,setPrice] = useState("");
const [days,setDays] = useState("");
const [nights,setNights] = useState("");
const [startingPlace,setStartingPlace] = useState("");

useEffect(()=>{

const fetchTour = async ()=>{

const { data } = await supabase
.from("tours")
.select("*")
.eq("id",id)
.single();

if(data){

setTitle(data.title);
setOverview(data.overview);
setPrice(data.price?.startingFrom);
setDays(data.duration?.days);
setNights(data.duration?.nights);
setStartingPlace(data.startingPlace);

}

};

fetchTour();

},[id]);

const updateTour = async ()=>{

await supabase
.from("tours")
.update({

title,

overview,

duration:{
days:Number(days),
nights:Number(nights)
},

price:{
startingFrom:Number(price),
currency:"USD",
perPerson:true
},

startingPlace

})
.eq("id",id);

alert("Tour Updated");

};

return(

<div className="p-10 max-w-3xl">

<h1 className="text-2xl font-bold text-[#191975] mb-6">
Edit Tour
</h1>

<input
value={title}
onChange={(e)=>setTitle(e.target.value)}
className="border p-2 w-full mb-3"
/>

<textarea
value={overview}
onChange={(e)=>setOverview(e.target.value)}
className="border p-2 w-full mb-3"
/>

<div className="flex gap-4 mb-3">

<input
value={days}
onChange={(e)=>setDays(e.target.value)}
placeholder="Days"
className="border p-2 w-full"
/>

<input
value={nights}
onChange={(e)=>setNights(e.target.value)}
placeholder="Nights"
className="border p-2 w-full"
/>

</div>

<input
value={price}
onChange={(e)=>setPrice(e.target.value)}
placeholder="Price"
className="border p-2 w-full mb-3"
/>

<input
value={startingPlace}
onChange={(e)=>setStartingPlace(e.target.value)}
placeholder="Starting Place"
className="border p-2 w-full mb-4"
/>

<button
onClick={updateTour}
className="bg-[#191975] text-white px-6 py-2 rounded"
>
Update Tour
</button>

</div>

);

}