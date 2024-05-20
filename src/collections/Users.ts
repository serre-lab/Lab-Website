import type { CollectionConfig } from 'payload/types'
import TestComponent from '../components/TestComponent'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed

    //each extra field is an object with a name and type + additional field options
    {
      name: 'test',
      type: 'ui',
      admin: {
        components: {
          Field: TestComponent
        }
      }
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
    },
  ],
}
