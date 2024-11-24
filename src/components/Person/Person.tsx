import { Card, Image, Text, Title, Button, Modal } from "@mantine/core";
import { useState } from "react";
import "./Person.css";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface PersonProps {
    fullName: string;
    title: string;
    imagePath: string;
    description: string;
}

export default function Person(props: PersonProps) {
    const [opened, setOpened] = useState(false);

    return (
        <>
            <Card
                shadow="sm"
                padding="lg"
                className="person-card"
                onClick={() => setOpened(true)}
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
            </Card>

            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                // title={props.fullName}
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
                withCloseButton={false}
                size="auto"
            >
                <Card
                    shadow="sm"
                    padding="lg"
                    // className="person-card"
                    className="person-modal"
                    onClick={() => setOpened(true)}
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
                    <Text>{props.description}</Text>
                </Card>
            </Modal>
        </>
    );
}
