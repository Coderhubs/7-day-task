 const review = {
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
    },
    {
      name: 'review',
      title: 'Review',
      type: 'text',
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'string',
    },
    {
      name: 'userId',
      title: 'User ID',
      type: 'string',
    },
    {
      name: 'userProfile',
      title: 'User Profile',
      type: 'object',
      fields: [
        {
          name: 'image',
          title: 'Image',
          type: 'string',
        }
      ]
    }
  ]
}

export default review;
