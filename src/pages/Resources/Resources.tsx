import resourcesData from "../../data/resources.json";
import "./Resources.css";
import { Text, Title, Anchor, Card, Image, Group } from "@mantine/core";
import { IconVideo, IconExternalLink } from '@tabler/icons-react';
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

// Component for resource cards (similar to featured projects)
const ResourceCard = ({ resource }: { resource: { title: string; url: string } }) => {
    const youtubeId = getYouTubeId(resource.url);
    const isCBMM = resource.url.includes('cbmm.mit.edu/video');
    const isExternal = resource.url.startsWith("http");
    
    const cardContent = (
        <div className="resource-card">
            <div className="resource-content">
                <Title order={3} className="resource-title">{resource.title}</Title>
                <Text className="resource-description">
                    {isExternal ? "External Resource" : "Internal Resource"}
                </Text>
                <div className="resource-button">
                    <IconExternalLink size={16} />
                    <span>Access Resource</span>
                </div>
            </div>
        </div>
    );

    if (isExternal) {
        return (
            <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-link"
            >
                {cardContent}
            </a>
        );
    } else {
        return (
            <Link to={resource.url} className="resource-link">
                {cardContent}
            </Link>
        );
    }
};

// Component for video preview cards
const VideoCard = ({ resource }: { resource: { title: string; url: string } }) => {
    const youtubeId = getYouTubeId(resource.url);
    const isCBMM = resource.url.includes('cbmm.mit.edu/video');
    
    return (
        <div className="video-card">
            <div className="video-content">
                <Title order={3} className="video-title">{resource.title}</Title>
                <Text className="video-description">
                    {youtubeId ? "YouTube Video" : isCBMM ? "CBMM Video" : "Video"}
                </Text>
                <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="video-button"
                >
                    <IconVideo size={16} />
                    <span>Watch Video</span>
                </a>
            </div>
        </div>
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
                                    <Title order={2} className="resource-section-title">
                                        {subCategoryName}
                                    </Title>
                                    {subCategoryName === "Videos & Talks" ? (
                                        <div className="video-grid">
                                            {subCategory.map((resource) => (
                                                <VideoCard key={resource.title} resource={resource} />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="resource-grid">
                                            {subCategory.map((resource) => (
                                                <ResourceCard key={resource.title} resource={resource} />
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
