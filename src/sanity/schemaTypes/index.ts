import { type SchemaTypeDefinition } from 'sanity'

import car from './car'
import form from './form'
import review from './reviews'

export const schema: { types: SchemaTypeDefinition[] } = {
    types:[car, form, review],
  }