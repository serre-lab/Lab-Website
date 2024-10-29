import Learn from "../../components/LearnMoreAbout/Learn";
import "./Home.css";
import { Title, Text } from "@mantine/core";

export function Home() {
    return (
        <div className="home-container">
            {/* Image + Title */}
            <div className="image-wrapper">
                <Title aria-label="lab title">Serre Lab</Title>
                <Text aria-label="lab one-liner" size="xl">
                    Understanding the neural computations supporting visual
                    perception
                </Text>
            </div>

            {/* Content */}
            <Learn />
            <div></div>
        </div>
    );
}
