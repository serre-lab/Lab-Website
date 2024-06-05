
export const Featured = {
    slug: 'featured',
    labels: {
        singular: 'Featured',
        plural: 'Featured',
    },
    fields: [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
        },
        {
            name: 'description',
            label: 'Description',
            type: 'textarea',
        },
        {
            name: 'image',
            label: 'Image',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'link',
            label: 'Link',
            type: 'text',
        }
    ]

}
