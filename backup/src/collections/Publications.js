export const Publications = {
    slug: 'publications',

    fields: [
        {
            name: 'title', 
            label: 'Title',
            type: 'text',
        },
        {
            name: 'journal',
            label: 'Journal',
            type: 'text',
        },
        {
            name: 'authors',
            label: 'Authors',
            type: 'text',
        },
        {
            name: 'link',
            label: 'Link',
            type: 'text',
        },
        {
            name: 'year',
            label: 'Year',
            type: 'number',
        },
        // {
        //     name: 'status',
        //     // label: 'Status',
        //     type: 'radio',
        //     options: [
        //         {
        //             label: 'Work in Progress',
        //             value: 'work-in-progress',
        //         },
        //         {
        //             label: 'Completed',
        //             value: 'completed',
        //         }
        //     ],
        //     defaultValue: 'work-in-progress', // The first value in options.
        //     admin: {
        //         layout: 'horizontal',
        //     },
        // }
        
    ]
}
