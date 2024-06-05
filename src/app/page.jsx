
import React from 'react'
import RecentBlogPosts from '../components/RecentBlogPosts'
import { HeroImageRight } from '../components/HeroImageRight/HeroImageRight'
import { getPayloadHMR } from '@payloadcms/next/utilities'
// import { Carousel } from '@mantine/carousel'
import config from '@payload-config'
import Featured from '../components/Featured/Featured'
import { Text, Title } from '@mantine/core'

export default async function page() {
  const payload = await getPayloadHMR({config})
  const features = await payload.find({
    collection: 'featured'
  })
  return (
    <div >
      <HeroImageRight />
      <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}>
      <Featured features={features}/>
      </div>
      {/* <Featured image={}/> */}
      {/* <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        maxWidth: '75%',
        margin: 'auto',
      }}>
      {
        features.docs.map((featured) => {
          return (
            <div key={featured.id}>
              <Featured title={featured.title} description={featured.description}
              image={featured.image} link={featured.link}/>

            </div>
          )
        })
      }
      </div> */}
      {/* <RecentBlogPosts /> */}
      <Text>
        We are proud members of the Carney Institute for Brain Science and the Center for Computational Brain Science at Brown! We also work in close collaboration with and leverage resources from the Center for Computation and Visualization.
      </Text>
      <Title>Prospective students</Title>
      <Text>
        The lab is actively recruiting! Brown students interested in conducting research in the lab are encouraged to email Prof. Serre with a copy of their course transcripts and CV. Expectations are that students would have taken an intro to CS sequence, at least one course in machine learning, computer vision and/or deep learning. Prospective Ph.D. students can apply to the graduate programs in cognitive science, computer science and neuroscience. Prospective postdoc applicants should email Prof. Serre directly.
      </Text>
      <Title>Funding</Title>
      <Text>
      Our work is currently supported by ONR (N00014-24-1-2026), NSF (EAR-1925481), DARPA (D19AC00015), and the ANR-3IA Artificial and Natural Intelligence Toulouse Institute (ANR-19-PI3A-0004).

      Additional support was provided by the Carney Institute for Brain Science, the Center for Vision Research (CVR), and the Center for Computation and Visualization (CCV). We acknowledge the Cloud TPU hardware resources that Google made available via the TensorFlow Research Cloud (TFRC) program as well as computing hardware supported by NIH Office of the Director grant S10OD025181.
      </Text>
    </div>
  )
}
