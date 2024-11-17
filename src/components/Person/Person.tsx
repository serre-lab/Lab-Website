import { Card, Image, Text, Title, Button } from "@mantine/core";
import { useState } from "react";
import "./Person.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface PersonProps {
    fullName: string;
    title: string;
    imagePath: string;
    description: string;
}

export default function Person(props: PersonProps) {
    const [showDescription, setShowDescription] = useState(false);

    const toggleDescription = () => {
        setShowDescription(!showDescription);
    };

    return (
        <Card
            shadow="sm"
            padding="lg"
            className="person-card"
            onClick={toggleDescription}
        >
            {props.imagePath && (
                <Card.Section>
                    <Image
                        src={props.imagePath}
                        alt={props.fullName}
                        className="person-image"
                    />
                </Card.Section>
            )}
            <Title order={3} className="person-name">
                {props.fullName}
            </Title>
            <Text className="person-title">{props.title}</Text>
            {showDescription && (
                <div className="person-description">
                    <Text>{props.description} </Text>
                </div>
            )}
            <Button
                variant="white"
                onClick={toggleDescription}
                className="toggle-button"
                color="gray"
            >
                {showDescription ? "Show Less" : "Learn More"}{" "}
                {showDescription ? <FaChevronUp /> : <FaChevronDown />}
            </Button>
        </Card>
    );
}
