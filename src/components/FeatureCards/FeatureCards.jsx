'use client'
import Image from "next/image"
import { Carousel, Embla } from "@mantine/carousel"
import { Text, Title } from "@mantine/core"
import "./FeatureCards.css"
import Link from "next/link"
import { Transition } from "@mantine/core"


//TODO: Work on:
//1. DONE Clicking the card redirects to its url
//2. SKIPPEd make images same level, images fixed text variable
//3. Hover feature
//4. Go work on people
//5. Fix order
//6. Fix images
export function FeatureCards({features}) {
    return (
        <div 
            className="features-container"
            onMouseEnter={() => {}}
        // style={{
        //     display: 'flex',
        //     flexDirection: 'row',
        //     justifyContent: 'space-evenly',
        //     alignItems: 'center',
        //     flexWrap: 'wrap',
        //     gap: '3rem',
        // }}
        >
            {features.docs.map((feature) => {
                return(
                <div 
                    className="feature-card"
                >
                    <Link href={feature.link} passHref target="_blank" style={{
                        color: 'inherit', textDecoration: 'inherit',
                    }}>
                    <Image 
                        src={feature.image.url}
                        alt={feature.image.alt}
                        height={225}
                        width={300}
                        style={{
                            borderRadius: '1rem',
                            // display: 'block',    
                            maxWidth: '300',
                            maxHeight: '225',
                            boxShadow: '5px 5px 30px 5px rgb(0,0,0,0.3)'
                            // margin: 'auto',
                            // alignSelf: 'flex-start',
                            // justifySelf: 'flex-start',
                        }}
                         />
                <div style={{
                    // justifySelf: 'center',
                    // alignSelf: 'center',
                }}>
                 <Title order={1} style={{
                    textAlign: 'center',
                    marginTop: '1rem',
                    marginBottom: '.5rem',
                }}>{feature.title}</Title>
                <Text style={{
                    textAlign: 'center',
                    margin: '0',
                    padding: '0',
                }}>{feature.description}</Text>
                </div>
                </Link>
                </div>
            )})}
           
        </div>
    )
}


{/* <Carousel withIndicators height={200} loop style={{ width: '50%' }} >
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
  </Carousel> */}

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
