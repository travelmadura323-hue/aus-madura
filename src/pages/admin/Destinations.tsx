import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../lib/supabase";

export default function Destinations() {

  const [destinations,setDestinations] = useState<any[]>([]);

  useEffect(()=>{

    const fetchData = async ()=>{

      const { data } = await supabase
        .from("destinations")
        .select("*");

      if(data) setDestinations(data);

    };

    fetchData();

  },[]);

  return(

    <div className="p-10">

      <h1 className="text-3xl text-[#191975] font-bold mb-6">
        Destinations
      </h1>

      <Link
        to="/admin/destinations/add"
        className="bg-[#191975] text-white px-4 py-2 rounded"
      >
        Add Destination
      </Link>

      <div className="mt-6 space-y-4">

        {destinations.map((dest)=>(
          
          <div
            key={dest.id}
            className="bg-white shadow p-4 flex justify-between items-center"
          >

            <div>
              <h2 className="font-semibold">{dest.name}</h2>
              <p className="text-sm text-gray-500">{dest.region}</p>
            </div>

            <div className="flex gap-4">

              <Link
                to={`/admin/destinations/edit/${dest.id}`}
                className="bg-[#191975] text-white px-3 py-1 rounded"
              >
                Edit
              </Link>

              <Link
                to={`/admin/destinations/delete/${dest.id}`}
                className="bg-[#cc1215] text-white px-3 py-1 rounded"
              >
                Delete
              </Link>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}