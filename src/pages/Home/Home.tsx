import './Home.css';
import { Image, Title } from '@mantine/core';

export function Home() {
    return (
        <div className="home-container">
            <div className="image-wrapper">
                <Image 
                    h={`55vh`}
                    fit={'cover'}
                    src="metcalf.png" 
                    alt="Serre Lab Logo" 
                />
                <Title className="home-title">Serre Lab</Title>
            </div>
        </div>
    );
}