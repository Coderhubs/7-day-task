const car = {
  name: 'cars',
  title: 'Car',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'string',
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'price_per_day',
      title: 'Price Per Day',
      type: 'number',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
    },
    {
      name: 'reviews',
      title: 'Reviews Count',
      type: 'number',
    }
  ]
};

export default car;