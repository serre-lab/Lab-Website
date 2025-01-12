import React from "react";
import ReactMarkdown from "react-markdown";
import "./MarkdownPage.css";

import data from "../../content/test.md?raw";

interface MarkdownPageProps {
    content: string;
}

const MarkdownPage: React.FC<MarkdownPageProps> = ({ content }) => {
    return (
        <div className="markdown-container">
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
};

export default MarkdownPage;
