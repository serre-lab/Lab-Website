// 'use client'
import React from 'react'
import { Title, Text, Flex, Group, Divider } from '@mantine/core'
import './Research.css'
import Image from 'next/image'

// export default async function ResearchCard({ title, date, funding, description, image}) {
//   // console.log(im age);
//   return (
//     <div className="card-container">
//     <Flex direction='column' justify={'center'} align={'center'}>
//       <Group>
//         <Title >{title}</Title>
//         <Text >{date}</Text>
//         <Text>{funding}</Text>
//       </Group>
//       <div className='image-description-container'>
//         {image ?
//           <div className='research-container'>
//             <img className='research-img' src={image.url}  alt={image.alt}/>
//           </div>
//           :
//           <p>couldnt load</p>}
//         <Text>{description}</Text>
//       </div>
//     </Flex>
//   </div>
//   )
// }

export default function ResearchCard({ title, date, funding, description, image}) {

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      padding: '1rem',
      border: '1px solid black',
      borderRadius: '1rem',
      margin: '1rem',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        alignSelf: 'flex-start',

      }}>
      <Title >{title}</Title>
      <Text >{date}</Text>
      <Text>{funding}</Text>
      </div>
      <div style = {{
        display: 'flex',
        gap: '1rem',
      }}>
        {image ?
        <Image src={image.url} alt={image.alt} width={200} height={200}/>
        :
        <p>NO IMAGE IN BACKEND</p>}
        <Text>{description}</Text>
      </div>
    </div>
  )

}
