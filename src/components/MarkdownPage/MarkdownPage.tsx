// @ts-nocheck
import { Title, Text, Anchor, List } from "@mantine/core";
import React from "react";
import ReactMarkdown from "react-markdown";
import "./MarkdownPage.css";

interface MarkdownPageProps {
    content: string;
}


const MarkdownPage: React.FC<MarkdownPageProps> = ({ content }) => {
    return (
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
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownPage;
