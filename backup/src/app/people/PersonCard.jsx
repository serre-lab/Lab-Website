'use client'
import Image from 'next/image'
import { Text } from '@mantine/core'

export default function PersonCard({first_name, middle_name, last_name, role, image}) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            border: '1px solid black',
            borderRadius: '5px',
            boxShadow: '0 0 5px 0 rgba(0,0,0,0.2)',
        
        }}>
            <div style={{
                width: '100%',
                height: 250,
                position: 'relative',
                borderRadius: '20px',
            }}>
                <Image src={image.url} alt={image.alt} fill
                    objectFit='contain'/>
            </div>
            
            <Text>{first_name} {middle_name ? middle_name : null} {last_name}</Text>
            <Text>{role}</Text>
        </div>
    )
}
