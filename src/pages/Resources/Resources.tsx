import resourcesData from "../../data/resources.json";
import "./Resources.css";
import { Text, Title, Anchor, List, Paper, Divider, Card, Image, Group } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconVideo } from '@tabler/icons-react';

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
            padding="sm" 
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
                    <Image
                        src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                        height={180}
                        alt={resource.title}
                    />
                ) : isCBMM ? (
                    <div className="video-placeholder">
                        <IconVideo size={48} />
                        <Text size="sm" c="dimmed">CBMM Video</Text>
                    </div>
                ) : null}
            </Card.Section>
            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500} size="sm" lineClamp={2}>
                    {resource.title}
                </Text>
            </Group>
        </Card>
    );
};

export function Resources() {
    return (
        <div className="resources-container">
            <Title order={1} className="resources-title">
                Resources
            </Title>

            <div className="resources-columns">
                {Object.entries(resourcesData).map(([category, resources]) => (
                    <Paper
                        key={category}
                        shadow="xs"
                        radius="md"
                        p="md"
                        className="resource-card"
                    >
                        <Title order={2} className="resource-category">
                            {category}
                        </Title>
                        <Divider my="sm" />
                        {Object.entries(resources).map(
                            ([subCategoryName, subCategory]) => (
                                <div key={subCategoryName} className="sub-category-block">
                                    <Text size="lg" className="sub-category-title">
                                        {subCategoryName}
                                    </Text>
                                    {subCategoryName === "Videos & Talks" ? (
                                        <div className="video-grid">
                                            {subCategory.map((resource) => (
                                                <VideoCard key={resource.title} resource={resource} />
                                            ))}
                                        </div>
                                    ) : (
                                        <List spacing="xs" size="sm" withPadding>
                                            {subCategory.map((resource) => (
                                                <List.Item key={resource.title}>
                                                    <Anchor
                                                        component={Link}
                                                        to={resource.url}
                                                        target={resource.url.startsWith("http") ? "_blank" : undefined}
                                                        rel={resource.url.startsWith("http") ? "noopener noreferrer" : undefined}
                                                    >
                                                        <Text>
                                                        {resource.title || resource.url}
                                                        </Text>
                                                    </Anchor>
                                                </List.Item>
                                            ))}
                                        </List>
                                    )}
                                </div>
                            )
                        )}
                    </Paper>
                ))}
            </div>
        </div>
    );
}
