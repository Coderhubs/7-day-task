// components/MapComponent.tsx
"use client"
import { useEffect, useState } from 'react';
import Head from 'next/head';
import mapboxgl from 'mapbox-gl';

// Access the Mapbox API key from environment variable
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY!;

const MapComponent: React.FC = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [marker, setMarker] = useState<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      // Get the user's current position
      navigator.geolocation.watchPosition(
        (position) => {
          const { longitude, latitude } = position.coords;

          // Update the user location state
          setUserLocation([longitude, latitude]);

          if (map) {
            // Update the map's center and zoom level to user's location
            map.flyTo({
              center: [longitude, latitude],
              zoom: 14, // Set zoom level as needed
            });

            // If marker doesn't exist, create one
            if (!marker) {
              const newMarker = new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
              setMarker(newMarker);
            } else {
              // Otherwise, move the existing marker to the new location
              marker.setLngLat([longitude, latitude]);
            }
          }
        },
        (error) => {
          console.error('Error getting location: ', error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 5000,
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    return () => {
      // Cleanup: Remove the marker and map when component unmounts
      if (map) map.remove();
      if (marker) marker.remove();
    };
  }, [map, marker]);

  useEffect(() => {
    const newMap = new mapboxgl.Map({
      container: 'map', // Container ID
      style: 'mapbox://styles/mapbox/streets-v11', // Map style
      center: [-74.5, 40], // Default coordinates
      zoom: 9, // Zoom level
    });

    setMap(newMap);

    return () => {
      if (newMap) newMap.remove();
    };
  }, []);

  return (
    <>
      <Head>
        <script async src="https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.js"></script>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <div className="w-full h-64 rounded-md" id="map"> </div>
    </>
  );
};

export default MapComponent;
// components/MapComponent.tsx
// "use client"
// import { useEffect, useState } from 'react';
// import Head from 'next/head';
// import mapboxgl from 'mapbox-gl';

// // Access the Mapbox API key from environment variable
// mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY!;

// const MapComponent: React.FC = () => {
//   const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
//   const [map, setMap] = useState<mapboxgl.Map | null>(null);
//   const [marker, setMarker] = useState<mapboxgl.Marker | null>(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       // Get the user's current position
//       navigator.geolocation.watchPosition(
//         (position) => {
//           const { longitude, latitude } = position.coords;

//           // Update the user location state
//           setUserLocation([longitude, latitude]);

//           if (map) {
//             // Update the map's center and zoom level to user's location
//             map.flyTo({
//               center: [longitude, latitude],
//               zoom: 14, // Set zoom level as needed
//             });

//             // If marker doesn't exist, create one
//             if (!marker) {
//               const newMarker = new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
//               setMarker(newMarker);
//             } else {
//               // Otherwise, move the existing marker to the new location
//               marker.setLngLat([longitude, latitude]);
//             }
//           }
//         },
//         (error) => {
//           console.error('Error getting location: ', error);
//         },
//         {
//           enableHighAccuracy: true,
//           maximumAge: 10000,
//           timeout: 5000,
//         }
//       );
//     } else {
//       console.log("Geolocation is not supported by this browser.");
//     }

//     return () => {
//       // Cleanup: Remove the marker and map when component unmounts
//       if (map) map.remove();
//       if (marker) marker.remove();
//     };
//   }, [map, marker]);

//   useEffect(() => {
//     const newMap = new mapboxgl.Map({
//       container: 'map', // Container ID
//       style: 'mapbox://styles/mapbox/streets-v11', // Map style
//       center: [-74.5, 40], // Default coordinates
//       zoom: 9, // Zoom level
//     });

//     // Add zoom controls (in and out)
//     newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
    

//     setMap(newMap);

//     return () => {
//       if (newMap) newMap.remove();
//     };
//   }, []);

//   return (
//     <>
//       <Head>
//         <script
//           src="https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.js"
//           integrity="sha384-pExr9r9Q8Vfmf33ss3Aq8PjYI/tzUv7l1+4Yq1VJ6c9rC1gFlKOPqYoFq8xosbp5"
//           crossOrigin="anonymous"
//         ></script>
//         <link
//           href="https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.css"
//           rel="stylesheet"
//         />
//       </Head>
//       <div className="w-full h-64 rounded-md mb-14"  id="map"> </div>
//     </>
//   );
// };

// export default MapComponent;
