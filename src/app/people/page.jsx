import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import PersonCard from './PersonCard'
// import './page.css'

export default async function page() {
  const payload = await getPayloadHMR({config})

  const people = await payload.find({
    collection: 'people'
  })

  return (
    <div>
        <h3>
            People
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(200px, 1fr))',
          gap: '20px',
          padding: '20px',
          width: '100%',
          margin: 'auto',
        }}>
        {
          people.docs.map((person) => {
            return(
              <div key={person.id}>
                <PersonCard first_name={person.first_name} middle_name={person.middle_name}
                 last_name={person.last_name} role={person.role} image={person.image}/>
              </div>
            )
          })
        }
          
          </div>
    </div>
  )
}
