// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { FaSearch } from "react-icons/fa";
// import { groq } from "next-sanity";
// import { client } from "@/sanity/lib/client"
 
// interface SearchResult {
//   _id: string;
//   title: string;
//   // Add other fields you want to display
// }

// export default function SearchBar({ searchParams }: { searchParams: { term: string } }) {
//   const [searchTerm, setSearchTerm] = useState(searchParams?.term || ""); // Initialize with current term if available
//   const [results, setResults] = useState<SearchResult[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const handleSearch = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!searchTerm.trim()) return;

//     setIsLoading(true);

//     try {
//       // Fetch results from Sanity
//       const query = groq`*[_type == "cars"] {
//         _id,
//         title,
//         name,
//         _type,
//       }`;

//       const fetchedResults: SearchResult[] = await client.fetch(query, { searchTerm: `*${searchTerm}*` });
//       setResults(fetchedResults);

//       // Update URL with the search term
//       router.push(`/search?term=${encodeURIComponent(searchTerm)}`);
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-4">Search Results</h1>

//       {/* SearchBar */}
//       <form
//         onSubmit={handleSearch}
//         className="flex items-center w-full sm:w-[492px] bg-white border border-[#c3d4e9]/40 rounded-[70px] h-11 px-4"
//       >
//         <button type="submit" className="focus:outline-none">
//           <FaSearch className="text-gray-500 w-5 h-5 hover:text-blue-500" />
//         </button>
//         <input
//           type="text"
//           placeholder="Search something here"
//           className="flex-grow bg-transparent outline-none text-gray-700 ml-2 placeholder-gray-400"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <Image src="/images/filter.jpg" alt="filter" width={24} height={24} className="hidden md:block cursor-pointer" />
//       </form>

//       {/* Results Section */}
//       <div className="mt-8">
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : results.length > 0 ? (
//           <ul className="space-y-4">
//             {results.map((cars) => (
//             //   <li key={cars._id} className="border-b pb-4">
//                 <h2 className="text-xl font-semibold">{cars.title}</h2>
//                 {/* Add more details or a link to the full content */}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No results found for "{searchTerm}"</p>
//         )}
//       </div>
//     </div>
//   );
// }
