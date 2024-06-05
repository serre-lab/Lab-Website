'use client'
import Image from "next/image"
import { Carousel, Embla } from "@mantine/carousel"

export default function Featured({features}) {
    return (
        <Carousel withIndicators height={200} loop style={{ width: '50%' }} >
      {features.docs.map((featured) => {
          return (
            // <div key={featured.id}>
            //   <Featured title={featured.title} description={featured.description}
            //   image={featured.image} link={featured.link}/>
            // </div>
            <Carousel.Slide>
              <div style={{
                        border: '1px solid black',
                        borderStyle: 'solid',
                        width: '100%',
                        height: '100%',
                        textAlign: 'center',
                        // padding: '1rem',
                    }}>
                        <Image src={featured.image.url} alt={featured.image.alt} height={200}
                        width={200} onClick={() => {
                            console.log('hi')
                        }}/>
                    </div>
            </Carousel.Slide>
          )
        })}
        <Carousel.Slide>
            1
        </Carousel.Slide>
        </Carousel>

    )
}

// export default function Featured({title, description, image, link}){
//     return (
//         <div style={{
//             display: 'flex',
//             flexDirection: 'column',
//             border: '1px solid black',
//             borderRadius: '1rem',
//             borderStyle: 'solid',
//             alignItems: 'center',
//             justifyContent: 'center',
//             padding: '1rem',
//         }}>
//             {image ? 
//               <Image src={image.url} alt={image.alt} width={200} height={200} style={{
//                 borderRadius: '1rem',
//             }}/>
//               : 
//               <p>no image</p>} 
//             <h1>{title}</h1>
//               <p>{description}</p>
              
//             <a>{link}</a>
//         </div>
//     )
// }
