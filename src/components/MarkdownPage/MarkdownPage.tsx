// @ts-nocheck
import { Title, Text, Anchor, List } from "@mantine/core";
import React from "react";
import ReactMarkdown from "react-markdown";
import "./MarkdownPage.css";
import { HeroBanner } from "../HeroBanner/HeroBanner";

interface MarkdownPageProps {
    content: string;
}

// Extract title from markdown content (first h1)
const extractTitle = (content: string): string => {
    const lines = content.split('\n');
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('# ')) {
            return trimmed.substring(2).trim();
        }
    }
    return 'Resource';
};

// Extract subtitle from markdown content (first paragraph after title)
const extractSubtitle = (content: string): string | null => {
    const lines = content.split('\n');
    let foundTitle = false;
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('# ')) {
            foundTitle = true;
            continue;
        }
        if (foundTitle && trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('[') && !trimmed.startsWith('!')) {
            // Return first meaningful paragraph (limit length)
            const subtitle = trimmed.length > 150 ? trimmed.substring(0, 150) + '...' : trimmed;
            return subtitle;
        }
    }
    return null;
};

const MarkdownPage: React.FC<MarkdownPageProps> = ({ content }) => {
    const title = extractTitle(content);
    const subtitle = extractSubtitle(content);
    
    // Remove the first h1 from content since it's shown in the hero banner
    const contentWithoutFirstH1 = content.replace(/^#\s+.*$/m, '').trim();
    
    return (
        <>
            <HeroBanner 
                title={title}
                subtitle={subtitle || "Resource page from the Serre Lab"}
                backgroundImage="/metcalf.png"
                blur={true}
            />
            <div className="markdown-container">
                <ReactMarkdown
                    components={{
                        h1: ({ node, ...props }) => <Title order={1} {...props} />,
                        h2: ({ node, ...props }) => <Title order={2} {...props} />,
                        p: ({ node, ...props }) => <Text {...props} />,
                        a: ({ node, ...props }) => <Anchor {...props} />,
                        ul: ({ node, ...props }) => <List {...props} />,
                        // Add more mappings as needed
                    }}
                >
                    {contentWithoutFirstH1}
                </ReactMarkdown>
            </div>
        </>
    );
};

export default MarkdownPage;
