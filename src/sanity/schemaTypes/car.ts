
const car = {
  name: 'cars',
  title: 'car',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'number',
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    
    {
      name: 'type',
      title: 'Type',
      type: 'string',
    },
    {
      name: 'fuel_capacity',
      title: 'Fuel Capacity',
      type: 'string',
    },
    {
      name: 'transmission',
      title: 'Transmission',
      type: 'string',
    },
    {
      name: 'seating_capacity',
      title: 'Seating Capacity',
      type: 'string',
    },
    {
      name: 'price_per_day',
      title: 'Price Per Day',
      type: 'string',
    },
    {
      name: 'original_price',
      title: 'Original Price',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Car Image',
      type: 'image',

     
    },
    {
      name: 'image_1',
      title: 'Additional Image',
      type: 'image',

     
    },
    {
      name: 'image_2',
      title: 'Additional Image',
      type: 'image',

     
    },
    
    {
      name: 'image_3',
      title: 'Additional Image',
      type: 'image',

     
    },
    
   
    
    {
      name: 'description',
      title: 'description',
      type: 'string',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
   
  ],
};

export default  car;