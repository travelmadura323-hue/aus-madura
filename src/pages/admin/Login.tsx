import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Login(){

 const [email,setEmail] = useState("");

 const login = async ()=>{

   const { data } = await supabase
     .from("admins")
     .select("*")
     .eq("email",email)
     .single();

   if(!data){
     alert("Access denied");
     return;
   }

   localStorage.setItem("admin",email);

   window.location.href="/admin/dashboard";

 };

 return(

   <div className="p-10">

     <input
       placeholder="Admin Email"
       className="border p-2"
       onChange={(e)=>setEmail(e.target.value)}
     />

     <button
       onClick={login}
       className="bg-blue-600 text-white px-4 py-2 ml-3"
     >
       Login
     </button>

   </div>

 );

}