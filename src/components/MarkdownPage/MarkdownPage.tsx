import { Title, Text, Anchor } from "@mantine/core";
import React, { useState } from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import "./MarkdownPage.css";
import { HeroBanner } from "../HeroBanner/HeroBanner";

interface MarkdownPageProps {
    content: string;
}

// Optional YAML-style front matter. Only `subtitle:` is read; when present, it
// replaces the subtitle otherwise inferred from the first paragraph.
const splitFrontMatter = (content: string): { meta: Record<string, string>; body: string } => {
    const match = content.match(/^---\n([\s\S]*?)\n---\n?/);
    if (!match) return { meta: {}, body: content };
    const meta: Record<string, string> = {};
    for (const line of match[1].split('\n')) {
        const i = line.indexOf(':');
        if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '');
    }
    return { meta, body: content.slice(match[0].length) };
};

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

function AnimationFigure({ src, alt }: { src: string; alt: string }) {
    const [playing, setPlaying] = useState(false);
    return <span className="animation-figure">
        <img src={playing ? src : src.replace(/\.gif$/, "-still.png")} alt={alt} />
        <button type="button" aria-pressed={playing} onClick={() => setPlaying(!playing)}>
            {playing ? "Pause" : "Play"} animation: {alt}
        </button>
    </span>;
}

const MarkdownPage: React.FC<MarkdownPageProps> = ({ content: raw }) => {
    const { meta, body: content } = splitFrontMatter(raw);
    const title = extractTitle(content);
    const subtitle = meta.subtitle || extractSubtitle(content);
    
    // Remove the first h1 from content since it's shown in the hero banner
    const contentWithoutFirstH1 = content.replace(/^#\s+.*$/m, '').trim();
    
    return (
        <>
            <HeroBanner 
                title={title}
                subtitle={subtitle || "Resource page from the Serre Lab"}
                backgroundImage="/metcalf.webp"
            />
            <div className="markdown-container">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        table: ({ children }) => <div className="table-scroll" role="region" aria-label="Research data table" tabIndex={0}><table>{children}</table></div>,
                        th: ({ children }) => <th scope="col">{children}</th>,
                        img: ({ src, alt }) => src?.endsWith(".gif") ? <AnimationFigure src={src} alt={alt || "Crowd motion demonstration"} /> : <img src={src} alt={alt || ""} loading="lazy" />,
                        h1: ({ children, id }) => <Title order={2} id={id}>{children}</Title>,
                        h2: ({ children, id }) => <Title order={2} id={id}>{children}</Title>,
                        p: ({ children }) => <Text>{children}</Text>,
                        // Site-internal page paths go through the hash router; static files and external URLs stay plain links.
                        a: ({ href, children, title }) =>
                            href?.endsWith(".gif") ? <>{children}</> :
                            href?.startsWith("/") && !/\.[a-z0-9]+$/i.test(href)
                                ? <Anchor component={Link} to={href} title={title}>{children}</Anchor>
                                : <Anchor href={href} title={title}>{children}</Anchor>,
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
