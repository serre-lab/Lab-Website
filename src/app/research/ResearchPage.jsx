import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { Title, Text, Divider } from '@mantine/core'
import ResearchCard from './ResearchCard'

export default async function ResearchPage() {
  const payload = await getPayloadHMR({config})

  const research = await payload.find({
    collection: 'research'
  })
  // console.log('research')

  return (
    <div>
        <h1>Research</h1>
        {research.docs.map((research) => {
            return (
              <div key={research.id}>
                {/* <Title>{research.title}</Title>
                <Text>{research.date}</Text>
                <Text>{research.funding}</Text>
                <Text>{research.description}</Text> */}
                <ResearchCard title={research.title} date={research.date} 
                  funding={research.funding} description={research.description}
                  image={research.image}/>
                  <Divider />
              </div>
            )
        })}
    </div>
  )
}
