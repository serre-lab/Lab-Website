import React from 'react'
import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

export default async function TestComponent() {
    //how to get stuff from payload
    //1. get item from payload + import config from payload-config
    const payload = await getPayloadHMR({config})

    //2. how to get collection
    const users = await payload.find({
        collection: 'users'
    })

    return (
    <div className="bg-green-500 p-4 text-green-100">
        Hey this is a custom component. 

        <h3>Users</h3>
        {/* map through all users and return email */}
        <div className="flex gap-2">
            {users.docs.map((user) => {
                return (
                    <div key={user._id} className="bg-green-700 p-2 rounded">
                        {user.email}
                    </div>
                )
            })}
        </div>
    </div>
  )
}
