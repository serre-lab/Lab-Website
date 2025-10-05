import resourcesData from "../../data/resources.json";
import "./Resources.css";
import { Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";


// Helper function to check if URL is a video
const isVideoUrl = (url: string): boolean => {
    return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('cbmm.mit.edu/video');
};

// Helper function to get description based on resource type and title
const getResourceDescription = (title: string, url: string): string => {
    const titleLower = title.toLowerCase();
    
    // Dataset descriptions
    if (titleLower.includes('clickme')) return "Dataset for evaluating the alignment between AI models and humans using ImageNet images";
    if (titleLower.includes('hmdb')) return "Large video database with 6,849 clips across 51 action categories";
    if (titleLower.includes('breakfast')) return "Video dataset of breakfast preparation activities: 52 individuals, 18 kitchens, ~77 hours of video, >4 million frames";
    if (titleLower.includes('multi-cue')) return "Boundary detection dataset with multiple visual cues using color stereo video sequences";
    if (titleLower.includes('neural harmonizer')) return "Dataset for harmonizing neural network representations with human visual processing";
    
    // Demo descriptions
    if (titleLower.includes('objectlens')) return "Interactive tool for exploring what ImageNet models see";
    if (titleLower.includes('leaflens')) return "Interactive tool for exploring plant species identification from cleared leaves";
    if (titleLower.includes('hgru')) return "Tutorials and demos for hierarchical Gated Recurrent Units";
    if (titleLower.includes('panoptic')) return "Colab notebook demonstrating panoptic segmentation with hGRU";
    
    // Tool descriptions
    if (titleLower.includes('harmonization')) return "Techniques for aligning AI models with human vision";
    if (titleLower.includes('xplique')) return "Open-source explainability toolbox for deep learning";
    if (titleLower.includes('horama')) return "Interactive visualization tool for neural network representations";
    if (titleLower.includes('neuroscience')) return "PyTorch library for neuroscience-inspired models";
    
    // Video descriptions
    if (titleLower.includes('vision beyond imagenet')) return "Understanding brain mechanisms underlying visual recognition";
    if (titleLower.includes('aligning deep networks')) return "Novel neural architectures for human-like vision";
    if (titleLower.includes('primate vision')) return "Self-supervised learning approaches for visual alignment";
    if (titleLower.includes('feedforward and feedback')) return "Visual reasoning processes in biological and artificial systems";
    
    return "Explore this resource";
};

// Helper function to get button text based on category
const getButtonText = (category: string, title: string): string => {
    const titleLower = title.toLowerCase();
    
    switch (category.toLowerCase()) {
        case 'datasets':
            return "Download Dataset →";
        case 'demos and tutorials':
            if (titleLower.includes('hgru')) return "View Tutorials →";
            if (titleLower.includes('panoptic')) return "Open Colab →";
            return "Try Demo →";
        case 'tools & software':
            if (titleLower.includes('github')) return "View on GitHub →";
            return "Use Tool →";
        case 'cognitive benchmark tests':
            return "Take Test →";
        case 'videos & talks':
            return "Watch Video →";
        default:
            return "Access Resource →";
    }
};


// Component for resource cards (exactly like featured projects)
const ResourceCard = ({ resource, category }: { resource: { title: string; url: string }, category: string }) => {
    const isExternal = resource.url.startsWith("http") || resource.url.endsWith(".html");
    const description = getResourceDescription(resource.title, resource.url);
    const buttonText = getButtonText(category, resource.title);

    const cardContent = (
        <div className="featured-card">
            <div className="featured-content">
                <Title order={3} className="featured-project-title">{resource.title}</Title>
                <Text className="featured-description">{description}</Text>
                {isExternal ? (
                    <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="featured-button-small"
                    >
                        {buttonText}
                    </a>
                ) : (
                    <Link
                        to={resource.url}
                        className="featured-button-small"
                    >
                        {buttonText}
                    </Link>
                )}
            </div>
        </div>
    );

    return cardContent;
};

// Component for video preview cards (exactly like featured projects)
const VideoCard = ({ resource }: { resource: { title: string; url: string } }) => {
    const description = getResourceDescription(resource.title, resource.url);
    const buttonText = getButtonText("Videos & Talks", resource.title);
    
    return (
        <div className="featured-card">
            <div className="featured-content">
                <Title order={3} className="featured-project-title">{resource.title}</Title>
                <Text className="featured-description">{description}</Text>
                <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="featured-button-small"
                >
                    {buttonText}
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
                                    <Title order={2} className="section-title">
                                        {subCategoryName}
                                    </Title>
                                    {subCategoryName === "Videos & Talks" ? (
                                        <div className="featured-grid">
                                            {subCategory.map((resource) => (
                                                <VideoCard key={resource.title} resource={resource} />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="featured-grid">
                                            {subCategory.map((resource) => (
                                                <ResourceCard key={resource.title} resource={resource} category={subCategoryName} />
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
