import { Card, Image, Text, Modal, Anchor } from "@mantine/core";
import { useState } from "react";
import "./Person.css";

interface PersonProps {
    fullName: string;
    title: string; // One of: PI, Assistant Prof of Research, PostDoc, Grad student, Research Assistant, Undergraduate student
    university: string; // "Brown" or "ANITI"
    imagePath: string;
    description: string;
}

// Helper function to render text with clickable URLs
function renderTextWithLinks(text: string) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, index) => {
        if (part.match(urlRegex)) {
            return (
                <Anchor key={index} href={part} target="_blank" rel="noopener noreferrer" title="Opens in new tab" style={{ color: 'var(--color-primary)' }}>
                    {part}
                </Anchor>
            );
        }
        return part;
    });
}

export default function Person({ fullName, title, university, imagePath, description }: PersonProps) {
    const [opened, setOpened] = useState(false);

    // Ensure image path starts with /
    const imageUrl = imagePath?.startsWith('/') ? imagePath : `/${imagePath}`;

    return (
        <>
            <Card
                shadow="md"
                padding="lg"
                radius="md"
                className="person-card"
                onClick={() => setOpened(true)}
                withBorder
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-label={`View bio for ${fullName}`}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setOpened(true);
                    }
                }}
            >
                {imagePath && (
                    <Card.Section>
                        <Image
                            src={imageUrl}
                            alt={fullName}
                            className="person-image"
                            radius="sm"
                            loading="lazy"
                            w={280}
                            h={220}
                        />
                    </Card.Section>
                )}
                <div className="person-name">{fullName}</div>
                <Text className="person-title">{title}</Text>
                {/* Removed university from card */}
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
                            src={imageUrl}
                            alt={fullName}
                            className="person-modal-image"
                        />
                    )}
                    <div className="person-modal-text">
                        <div className="person-name person-name-modal">{fullName}</div>
                        <Text className="person-title">{title}</Text>
                        <Text className="person-description">
                            {renderTextWithLinks(description || `${fullName} is a student in the Serre Lab at Brown University.`)}
                        </Text>
                    </div>
                </div>
            </Modal>
        </>
    );
}
