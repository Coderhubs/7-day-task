import { type SchemaTypeDefinition } from 'sanity'

 import cars from './car'
import form from './form'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [form,cars ],
}
