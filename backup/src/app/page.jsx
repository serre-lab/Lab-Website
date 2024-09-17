
import React from 'react'
import RecentBlogPosts from '../components/RecentBlogPosts'
import { Hero } from '../components/Hero/Hero'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { Text, Title } from '@mantine/core'
import {FeatureCards} from '../components/FeatureCards/FeatureCards'

export default async function page() {
  const payload = await getPayloadHMR({config})
  const features = await payload.find({
    collection: 'featured'
  })
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      // padding: '2rem',
    }}>
      <Hero />
      <FeatureCards features={features}/> 
      <Text>
        We are proud members of the Carney Institute for Brain Science and the Center for Computational Brain Science at Brown! We also work in close collaboration with and leverage resources from the Center for Computation and Visualization.
      </Text>
      <Title>Prospective students</Title>
      <Text>
        The lab is actively recruiting! Brown students interested in conducting research in the lab are encouraged to email Prof. Serre with a copy of their course transcripts and CV. Expectations are that students would have taken an intro to CS sequence, at least one course in machine learning, computer vision and/or deep learning. Prospective Ph.D. students can apply to the graduate programs in cognitive science, computer science and neuroscience. Prospective postdoc applicants should email Prof. Serre directly.
      </Text>
    </div>
  )
}
