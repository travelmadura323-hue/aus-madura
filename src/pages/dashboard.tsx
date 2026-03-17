// import { useState } from "react";
// import { destinations, tours } from "../data/mockData";

// export default function Dashboard() {
//   const [activePage, setActivePage] = useState<"tours" | "destinations">("tours");

//   return (
//     <div className="flex min-h-screen">
      
//       {/* Sidebar */}
//       <div className="w-64 bg-black text-white p-5">
//         <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

//         <button
//           onClick={() => setActivePage("tours")}
//           className={`block w-full text-left mb-3 p-2 rounded ${
//             activePage === "tours" ? "bg-gray-700" : ""
//           }`}
//         >
//           Tours
//         </button>

//         <button
//           onClick={() => setActivePage("destinations")}
//           className={`block w-full text-left p-2 rounded ${
//             activePage === "destinations" ? "bg-gray-700" : ""
//           }`}
//         >
//           Destinations
//         </button>
//       </div>

//       {/* Content */}
//       <div className="flex-1 p-6 bg-gray-100">
        
//         {/* TOURS PAGE */}
//         {activePage === "tours" && (
//           <div>
//             <h1 className="text-2xl font-bold mb-4">Tours</h1>

//             <div className="grid gap-4">
//               {toursData.map((tour) => (
//                 <div
//                   key={tour.id}
//                   className="bg-white p-4 rounded shadow flex justify-between"
//                 >
//                   <div>
//                     <h2 className="font-bold">{tour.title}</h2>
//                     <p>Price: ${tour.price}</p>
//                   </div>

//                   <div className="flex gap-2">
//                     <button className="bg-yellow-400 px-3 py-1 rounded">
//                       Edit
//                     </button>
//                     <button className="bg-red-500 text-white px-3 py-1 rounded">
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* DESTINATIONS PAGE */}
//         {activePage === "destinations" && (
//           <div>
//             <h1 className="text-2xl font-bold mb-4">Destinations</h1>

//             <div className="grid gap-4">
//               {destinationsData.map((dest) => (
//                 <div
//                   key={dest.id}
//                   className="bg-white p-4 rounded shadow flex justify-between"
//                 >
//                   <div>
//                     <h2 className="font-bold">{dest.name}</h2>
//                     <p>{dest.description}</p>
//                   </div>

//                   <div className="flex gap-2">
//                     <button className="bg-yellow-400 px-3 py-1 rounded">
//                       Edit
//                     </button>
//                     <button className="bg-red-500 text-white px-3 py-1 rounded">
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }