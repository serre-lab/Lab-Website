import { Card, Image, Text, Modal, Anchor } from "@mantine/core";
import { useState, useRef, useId } from "react";
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
                <Anchor key={index} href={part} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>
                    {part}<span className="sr-only"> (opens in new tab)</span>
                </Anchor>
            );
        }
        return part;
    });
}

export default function Person({ fullName, title, imagePath, description }: PersonProps) {
    const [opened, setOpened] = useState(false);
    const roleLabel = title === "PostDoc" ? "Postdoctoral researcher" : title;
    const cardRef = useRef<HTMLDivElement>(null);
    const profileId = useId();

    // Ensure image path starts with /
    const imageUrl = imagePath?.startsWith('/') ? imagePath : `/${imagePath}`;

    return (
        <>
            <Card
                ref={cardRef}
                padding="lg"
                radius="md"
                className="person-card"
                onClick={() => setOpened(true)}
                withBorder
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-labelledby={`${profileId}-name ${profileId}-role`}
                aria-describedby={`${profileId}-action`}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setOpened(true);
                    }
                }}
            >
                {imagePath ? (
                    <Card.Section>
                        <Image
                            src={imageUrl}
                            alt={fullName}
                            className="person-image"
                            radius="sm"
                            loading="lazy"
                            w="100%"
                            h={220}
                        />
                    </Card.Section>
                ) : (
                    <Card.Section className="person-portrait-placeholder" aria-hidden="true">
                        {fullName.split(" ").map(part => part[0]).join("")}
                    </Card.Section>
                )}
                <div className="person-name" id={`${profileId}-name`}>{fullName}</div>{" "}
                <Text className="person-title" id={`${profileId}-role`}>{roleLabel}</Text>
                <span id={`${profileId}-action`} className="sr-only">Open biography</span>
                {/* Removed university from card */}
            </Card>

            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                returnFocus={false}
                transitionProps={{ onExited: () => cardRef.current?.focus() }}
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 4,
                }}
                // Visually hidden title gives the dialog an accessible name (aria-labelledby)
                title={<span className="sr-only">{fullName}</span>}
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
                        <Text className="person-title">{roleLabel}</Text>
                        <Text className="person-description">
                            {renderTextWithLinks(description || `${fullName} is a student in the Serre Lab at Brown University.`)}
                        </Text>
                    </div>
                </div>
            </Modal>
        </>
    );
}
