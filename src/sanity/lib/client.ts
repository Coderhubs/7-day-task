import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  // projectId,
  // dataset,
  // apiVersion,
  // useCdn: true, 
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
   apiVersion: "2021-08-31"
  // token:"sk9isE5shnyWeR5HRIfp5xSBLW9sDiKUhBaDHh7rH36LeFwlUaahfpvpTjLt4J9yPIVSWyeyCkNrAgx34OFTBrgUThvDEBaw0XkQarBuzy8gNHzdmsHeF69jhF8G4Mtq8OmxGFERzzGzV2Gconc3ATX2NqWTARoKZij6zswLZcJw6GEhbYTO",
 
  // // Set to false if statically generating pages, using ISR or tag-based revalidation
})
