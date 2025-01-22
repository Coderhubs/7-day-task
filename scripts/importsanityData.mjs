
// import { createClient } from '@sanity/client'
// import axios from 'axios'
// import dotenv from 'dotenv'
// import { fileURLToPath } from 'url'
// import path from 'path'
//  import { v4 as uuidv4 } from 'uuid'; 

// // Load environment variables from .env.local
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
// dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

// // Create Sanity client
// const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
//   useCdn: false,
//   token: process.env.SANITY_API_TOKEN,
//   apiVersion: '2021-08-31'
// })

// // Upload image to Sanity
// async function uploadImageToSanity(imageUrl) {
//   try {
//     console.log(`Uploading image: ${imageUrl}`)
//     const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })
//     const buffer = Buffer.from(response.data)
//     const asset = await client.assets.upload('image', buffer, {
//       filename: imageUrl.split('/').pop()
//     })
//     console.log(`Image uploaded successfully: ${asset._id}`)
//     return asset._id
//   } catch (error) {
//     console.error('Failed to upload image:', imageUrl, error)
//     return null
//   }
// }

// // Import data into Sanity
// async function importData() {
//   try {
//     console.log('Fetching cars from API...')
//     const response = await axios.get('https://template-7-api.vercel.app/api/cars')
//     const cars = response.data
//     console.log(`Fetched ${cars.length} cars`)

//     for (const car of cars) {
//       console.log(`Processing car: ${car.name}`)

//       // Upload images
//       const mainImageRef = car.images.mainImage ? await uploadImageToSanity(car.images.mainImage) : null
//       const sideAngleImageRefs = car.images.sideAngleImages
//         ? await Promise.all(
//             car.images.sideAngleImages.map((image) => uploadImageToSanity(image))
//           )
//         : []

//       // Prepare Sanity document
//       const sanityCar = {
//         _type: 'cars',
//         id:car.id,
//         name: car.name,
//         type: car.type,
//         fuelCapacity: car.fuelCapacity,
//         transmission: car.transmission,
//         passengers: car.passengers,
//         priceAfterDiscount: car.price_after_discount || null,
//         originalPrice: car.originalPrice,
//         availability: car.availability,
//         is_favourite: car.is_favourite,
//         description: car.description,
//         tags: car.tags,
//         images: {
//           mainImage: mainImageRef
//             ? {
//                 _type: 'image',
//                 _key: uuidv4(),
//                 asset: {
//                   _type: 'reference',
//                   _ref: mainImageRef
//                 }
//               }
//             : undefined,
//           sideAngleImages: sideAngleImageRefs.map((imageRef) => ({
//             _type: 'image',
//             _key: uuidv4(),
//             asset: {
//               _type: 'reference',
//               _ref: imageRef
//             }
//           }))
//         },
//         inventoryDetails: {
//           totalUnits: car.inventory_details?.total_units || null,
//           unitsAvailable: car.inventory_details?.units_available || null
//         },
//         reviews:
//           car.reviews?.map((review) => ({
//             _key: uuidv4(), // Add unique key
//             rating: review.rating || null,
//             comment: review.comment || null,
//             user: review.user || null,
//           })) || [],
//         rating: car.rating
//           ? {
//               average: car.rating.average || null,
//               breakdown: car.rating.breakdown || null
//             }
//           : null
//       }

//       console.log('Uploading car to Sanity:', sanityCar.name)
//       const result = await client.create(sanityCar)
//       console.log(`Car uploaded successfully: ${result._id}`)
//     }

//     console.log('Data import completed successfully!')
//   } catch (error) {
//     console.error('Error importing data:', error)
//   }
// }


// importData()
import { createClient } from "@sanity/client";
import axios from "axios";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });
// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2021-08-31",
});
async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading image: ${imageUrl}`);
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data);
    const asset = await client.assets.upload("image", buffer, {
      filename: imageUrl.split("/").pop(),
    });
    console.log(`Image uploaded successfully: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error("Failed to upload image:", imageUrl, error);
    return null;
  }
}
// async function importData() {
//   try {
//     console.log('Fetching products from API...')
//     const response = await axios.get('https://67820232c51d092c3dcdf34f.mockapi.io/carrental/cars')
//     const products = response.data
//     console.log(`Fetched ${products.length} products`)
//     for (const product of products) {
//       console.log(`Processing product: ${product.name}`)
//       let imageRef = null
//       if (product.image_url) {
//         imageRef = await uploadImageToSanity(product.image_url)
//       }
async function importData() {
  try {
    console.log("Fetching products from API...");
    const response = await axios.get(
      "https://67820232c51d092c3dcdf34f.mockapi.io/carrental/cars"
    );
    const products = response.data;
    console.log(`Fetched ${products.length} products`);

    for (const product of products) {
      console.log(`Processing product: ${product.name}`);
      console.log("API product data:", JSON.stringify(product, null, 2));

      let imageRef = null;
      if (product.image_url) {
        imageRef = await uploadImageToSanity(product.image_url);
      }

      const sanityProduct = {
        _type: "cars",
        id: product.id,
        name: product.name,
        type: product.type,
        fuel_capacity: product.fuel_capacity,
        transmission: product.transmission,
        seating_capacity: product.seating_capacity,
        price_per_day: product.price_per_day,
        original_price: product.original_price,
        description: product.description,
        tags: product.tags || [],
        image: imageRef
          ? {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: imageRef,
              },
            }
          : undefined,
      };

      console.log(
        "Sanity product data:",
        JSON.stringify(sanityProduct, null, 2)
      );

      try {
        console.log("Uploading product to Sanity:", sanityProduct.name);
        const result = await client.create(sanityProduct);
        console.log(`Product uploaded successfully: ${result._id}`);
      } catch (error) {
        console.error("Error creating product in Sanity:", error);
        console.error(
          "Failed product data:",
          JSON.stringify(sanityProduct, null, 2)
        );
      }
    }

    console.log("Data import completed successfully!");
  } catch (error) {
    console.error("Error importing data:", error);
  }
}

importData();