// import {Media} from './Media'

export const Research = {
    slug: 'research',
    // upload: true,
    fields: [
        {
            name: 'title', 
            label: 'Title',
            type: 'text',
        },
        {
            name: 'date',
            label: 'Date',
            type: 'text'
        },
        {
            name: 'funding',
            label: 'Funding',
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
    ]
}
