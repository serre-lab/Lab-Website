import React from "react";
import ReactMarkdown from "react-markdown";
import "./MarkdownPage.css";

import data from "../../content/test.md?raw";

interface MarkdownPageProps {
    content: string; // Preloaded Markdown content
}

const MarkdownPage: React.FC<MarkdownPageProps> = ({ content }) => {
    // console.log("mkdn page content: ", content);
    return (
        <div className="markdown-container">
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
};

export default MarkdownPage;
