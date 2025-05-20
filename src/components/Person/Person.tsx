import { Card, Image, Text, Title, Modal } from "@mantine/core";
import { useState } from "react";
import "./Person.css";

interface PersonProps {
    fullName: string;
    title: string;
    imagePath: string;
    description: string;
}

export default function Person({ fullName, title, imagePath, description }: PersonProps) {
    const [opened, setOpened] = useState(false);

    return (
        <>
            <Card
                shadow="md"
                padding="lg"
                radius="md"
                className="person-card"
                onClick={() => setOpened(true)}
                withBorder
            >
                {imagePath && (
                    <Card.Section>
                        <Image
                            src={imagePath}
                            alt={fullName}
                            className="person-image"
                            radius="sm"
                        />
                    </Card.Section>
                )}
                <Title order={4} className="person-name">
                    {fullName}
                </Title>
                <Text className="person-title">{title}</Text>
            </Card>

            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 4,
                }}
                withCloseButton
                centered
                size="lg"
                padding="lg"
            >
                <div className="person-modal-content">
                    {imagePath && (
                        <Image
                            src={imagePath}
                            alt={fullName}
                            className="person-modal-image"
                        />
                    )}
                    <div className="person-modal-text">
                        <Title order={1} className="person-name">
                            {fullName}
                        </Title>
                        <Text className="person-title">{title}</Text>
                        <Text className="person-description">
                            {description || `${fullName} is a student in the Serre Lab at Brown University.`}
                        </Text>
                    </div>
                </div>
            </Modal>
        </>
    );
}
