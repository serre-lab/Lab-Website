
import { HeroBanner } from "../../components/HeroBanner/HeroBanner";

const About = () => {
    return (
        <div>
            <HeroBanner 
                title="About" 
                subtitle="Learn more about the Serre Lab and our research mission"
                backgroundImage="/metcalf.png"
                blur={true}
            />
        </div>
    )
}

export default About;