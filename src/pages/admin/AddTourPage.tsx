import { useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function AddTourPage(){

const [title,setTitle] = useState("");
const [slug,setSlug] = useState("");
const [country,setCountry] = useState("");
const [cities,setCities] = useState("");
const [overview,setOverview] = useState("");
const [days,setDays] = useState("");
const [nights,setNights] = useState("");
const [price,setPrice] = useState("");
const [startingPlace,setStartingPlace] = useState("");
const [description,setDescription] = useState("");
const [highlights,setHighlights] = useState("");
const [included,setIncluded] = useState("");
const [excluded,setExcluded] = useState("");
const [image,setImage] = useState<File | null>(null);

const addTour = async ()=>{

if(!image){
alert("Upload tour image");
return;
}

const fileName = `${Date.now()}-${image.name}`;

const { error } = await supabase
.storage
.from("tours")
.upload(fileName,image);

if(error){
alert("Image upload failed");
return;
}

const { data } = supabase
.storage
.from("tours")
.getPublicUrl(fileName);

const imageUrl = data.publicUrl;

await supabase.from("tours").insert({

slug,
title,

location:{
country,
cities:cities.split(",")
},

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

startingPlace,

description,

image:imageUrl,

highlights:highlights.split(","),

included:included.split(","),

excluded:excluded.split(",")

});

alert("Tour Added");

};

return(

<div className="p-10 max-w-3xl">

<h1 className="text-2xl font-bold text-[#191975] mb-6">
Add Tour Package
</h1>

<input
placeholder="Tour Title"
className="border p-2 w-full mb-3"
onChange={(e)=>setTitle(e.target.value)}
/>

<input
placeholder="Slug (australia-11Days)"
className="border p-2 w-full mb-3"
onChange={(e)=>setSlug(e.target.value)}
/>

<input
placeholder="Country"
className="border p-2 w-full mb-3"
onChange={(e)=>setCountry(e.target.value)}
/>

<input
placeholder="Cities (Sydney,Melbourne)"
className="border p-2 w-full mb-3"
onChange={(e)=>setCities(e.target.value)}
/>

<textarea
placeholder="Overview"
className="border p-2 w-full mb-3"
onChange={(e)=>setOverview(e.target.value)}
/>

<div className="flex gap-4 mb-3">

<input
placeholder="Days"
className="border p-2 w-full"
onChange={(e)=>setDays(e.target.value)}
/>

<input
placeholder="Nights"
className="border p-2 w-full"
onChange={(e)=>setNights(e.target.value)}
/>

</div>

<input
placeholder="Price"
className="border p-2 w-full mb-3"
onChange={(e)=>setPrice(e.target.value)}
/>

<input
placeholder="Starting Place"
className="border p-2 w-full mb-3"
onChange={(e)=>setStartingPlace(e.target.value)}
/>

<textarea
placeholder="Full Description"
className="border p-2 w-full mb-3"
onChange={(e)=>setDescription(e.target.value)}
/>

<textarea
placeholder="Highlights (comma separated)"
className="border p-2 w-full mb-3"
onChange={(e)=>setHighlights(e.target.value)}
/>

<textarea
placeholder="Included (comma separated)"
className="border p-2 w-full mb-3"
onChange={(e)=>setIncluded(e.target.value)}
/>

<textarea
placeholder="Excluded (comma separated)"
className="border p-2 w-full mb-3"
onChange={(e)=>setExcluded(e.target.value)}
/>

<input
type="file"
className="mb-4"
onChange={(e)=>setImage(e.target.files?.[0] || null)}
/>

<button
onClick={addTour}
className="bg-[#191975] text-white px-6 py-2 rounded"
>
Add Tour
</button>

</div>

);

}