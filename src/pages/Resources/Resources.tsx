import resourcesData from "../../data/resources.json";
import "./Resources.css";
import { Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { HeroBanner } from "../../components/HeroBanner/HeroBanner";

type Resource = {
    title: string;
    displayTitle?: string;
    url: string;
    description: string;
    action: string;
};

function ResourceEntry({ resource }: { resource: Resource }) {
    const title = resource.displayTitle ?? resource.title;
    const isExternal = resource.url.startsWith("http");
    const isStandalone = resource.url.endsWith(".html");
    return (
        <li className="resource-entry">
            <Title order={3} className="resource-title">{title}</Title>
            <div className="resource-details">
                <Text className="secondary-text">{resource.description}</Text>
                {isExternal || isStandalone ? (
                    <a href={resource.url} className="resource-link"
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        aria-label={`${resource.action}: ${title}${isExternal ? " (opens in new tab)" : ""}`}>
                        {resource.action} →
                    </a>
                ) : (
                    <Link to={resource.url} className="resource-link" aria-label={`${resource.action}: ${title}`}>
                        {resource.action} →
                    </Link>
                )}
            </div>
        </li>
    );
}

export function Resources() {
    return (
        <>
            <HeroBanner title="Resources" subtitle="Datasets, tools, demos, and tutorials" backgroundImage="/metcalf.webp" />
            <div className="resources-container">
                {Object.entries(resourcesData.Resources).map(([category, resources]) => (
                    <section key={category} className="resource-section" aria-labelledby={`resources-${category.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
                        <Title order={2} className="section-title" id={`resources-${category.toLowerCase().replace(/[^a-z]+/g, "-")}`}>{category}</Title>
                        <ul className="resource-list">
                            {resources.map(resource => <ResourceEntry key={resource.url} resource={resource} />)}
                        </ul>
                    </section>
                ))}
            </div>
        </>
    );
}
