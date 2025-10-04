import resourcesData from "../../data/resources.json";
import "./Resources.css";
import { Text, Title, Anchor, Card, Image, Group } from "@mantine/core";
import { IconVideo } from '@tabler/icons-react';
import { Link } from "react-router-dom";

// Helper function to get YouTube video ID from URL
const getYouTubeId = (url: string): string | null => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? match[1] : null;
};

// Helper function to check if URL is a video
const isVideoUrl = (url: string): boolean => {
    return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('cbmm.mit.edu/video');
};

// Component for video preview cards
const VideoCard = ({ resource }: { resource: { title: string; url: string } }) => {
    const youtubeId = getYouTubeId(resource.url);
    const isCBMM = resource.url.includes('cbmm.mit.edu/video');
    
    return (
        <Card 
            shadow="sm" 
            padding="xs" 
            radius="md" 
            withBorder 
            className="video-card"
            component="a"
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
        >
            <Card.Section>
                {youtubeId ? (
                    <div className="video-thumbnail-wrapper">
                        <Image
                            src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`}
                            alt={resource.title}
                            fit="cover"
                        />
                    </div>
                ) : isCBMM ? (
                    <div className="video-placeholder">
                        <IconVideo size={32} />
                        <Text size="xs" c="dimmed">CBMM Video</Text>
                    </div>
                ) : null}
            </Card.Section>
            <Group justify="space-between" mt="xs" mb="xs">
                <Text fw={500} size="xs" lineClamp={2}>
                    {resource.title}
                </Text>
            </Group>
        </Card>
    );
};

export function Resources() {
    return (
        <div className="resources-container">
            <div className="titleDesc-container">
                <Title order={1} className="page-title">
                    Resources
                </Title>

                {Object.entries(resourcesData).map(([category, resources]) => (
                    <div key={category}>
                        {Object.entries(resources).map(
                            ([subCategoryName, subCategory]) => (
                                <div key={subCategoryName} className="resource-section">
                                    <Title order={3} className="resource-section-title">
                                        {subCategoryName}
                                    </Title>
                                    {subCategoryName === "Videos & Talks" ? (
                                        <div className="video-grid">
                                            {subCategory.map((resource) => (
                                                <VideoCard key={resource.title} resource={resource} />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="resource-list">
                                            {subCategory.map((resource) => (
                                                resource.url.startsWith("http") ? (
                                                    <Anchor
                                                        key={resource.title}
                                                        href={resource.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="resource-link"
                                                    >
                                                        {resource.title || resource.url}
                                                    </Anchor>
                                                ) : (
                                                    <Anchor
                                                        key={resource.title}
                                                        component={Link}
                                                        to={resource.url}
                                                        className="resource-link"
                                                    >
                                                        {resource.title || resource.url}
                                                    </Anchor>
                                                )
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
