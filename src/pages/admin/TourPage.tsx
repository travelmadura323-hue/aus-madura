// import { Link } from "react-router-dom"
// import { useEffect, useState } from "react"


// export default function Tours() {

//   const [tours, setTours] = useState([])

//   useEffect(() => {

//     const fetchTours = async () => {
//       const { data } = await supabase.from("tours").select("*")
//       if (data) setTours(data)
//     }

//     fetchTours()

//   }, [])

//   return (

//     <div className="p-10">

//       <h1 className="text-2xl mb-6">Tours</h1>

//       <Link
//         to="/admin/tours/add"
//         className="bg-green-600 text-white px-4 py-2 rounded"
//       >
//         Add Tour
//       </Link>

//       {tours.map((tour: any) => (
//         <div key={tour.id} className="border p-4 mt-4 flex justify-between">

//           <div>
//             <h2>{tour.title}</h2>
//             <p>{tour.location}</p>
//           </div>

//           <div className="flex gap-4">

//             <Link
//               to={`/admin/tours/edit/${tour.id}`}
//               className="text-blue-600"
//             >
//               Edit
//             </Link>

//             <Link
//               to={`/admin/tours/delete/${tour.id}`}
//               className="text-red-600"
//             >
//               Delete
//             </Link>

//           </div>

//         </div>
//       ))}

//     </div>

//   )

// }