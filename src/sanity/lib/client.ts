import { createClient } from 'next-sanity'


export const client = createClient({
  // projectId,
  // dataset,
  // apiVersion,
  // useCdn: true, 
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token:"skuraquVHrGDxrvarWbi9Nb4vDT7fV5ldHev2ESMTl1JCSSyhshwbTsjyGJxzM3ELtUbdvILayIUaSjN38dcwv59T7M8jipfjIaYkOlzGI2grUzOADdS4MZbHTX3pkX88Eyk5GxPIA2mRHG7FotqxVdOKsI0ZsUMEPT16cZuYzLVM5cdngtj",
   apiVersion: "2021-08-31",
  // token:"",
 
  // // Set to false if statically generating pages, using ISR or tag-based revalidation
})




