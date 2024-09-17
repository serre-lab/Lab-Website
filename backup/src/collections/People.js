
export const People = {
    slug: 'people',
    labels: {
        singular: 'Person',
        plural: 'People',
    },
    fields: [
        {
            name: 'first_name',
            label: 'First Name',
            type: 'text',
        },
        {
            name: 'middle_name',
            label: 'Middle Name',
            type: 'text',
        },
        {
            name: 'last_name',
            label: 'Last Name',
            type: 'text',
        },
        {
            name: 'role',
            label: 'Role',
            type: 'text',
        },
        {
            name: 'image',
            label: 'Image',
            type: 'upload',
            relationTo: 'media',
        }
    ]
}
