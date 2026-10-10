import { Title, Text } from "@mantine/core";
import { HeroBanner } from "../../components/HeroBanner/HeroBanner";
import "../Resources/Resources.css";

const links = [
    { title: "Handbook", url: "https://psychic-adventure-y8eo2zo.pages.github.io/", description: "Lab policies, projects, meetings, and computing guides. Sign in with the GitHub account that has access to the handbook." },
    { title: "Google Drive", url: "https://drive.google.com/drive/folders/0ANfoTPEI1yC0Uk9PVA", description: "Shared lab documents and files. Use your Brown Google account; access is managed through the lab mailing list." },
    { title: "Onboarding", url: "https://psychic-adventure-y8eo2zo.pages.github.io/joining/", description: "Setup instructions for new lab members, including the joining form and first-week checklist. Requires handbook access." },
    { title: "Lab monitor", url: "http://serrez3.clps.brown.edu:8766", description: "GPU availability, machine status, and storage use. Connect through the Brown campus network or VPN." },
    { title: "Slack", url: "https://serrelab.slack.com/", description: "Lab announcements, questions, and project discussions. Sign in with your lab workspace account." },
    { title: "GitHub", url: "https://github.com/serre-lab", description: "Lab code and shared software. Public repositories are open to everyone; private repositories require organization and repository access." },
    { title: "Hugging Face", url: "https://huggingface.co/Serrelab", description: "The lab’s models, datasets, and interactive demos. Public resources are open to everyone; contributing requires the appropriate organization access." },
];

export function LabLinks() {
    return <>
        <HeroBanner title="Lab links" backgroundImage="/metcalf.webp" />
        <div className="resources-container">
            <Text className="body-text" mb="xl">These links are for people working in the lab. Some require membership in the appropriate lab group or access to Brown’s network. If you work in the lab and cannot access a resource, message Thomas Serre.</Text>
            <section className="resource-section" aria-labelledby="lab-links-heading">
                <Title order={2} className="section-title" id="lab-links-heading">For lab members</Title>
                <ul className="resource-list">
                    {links.map(link => <li className="resource-entry" key={link.url}>
                        <Title order={3} className="resource-title">{link.title}</Title>
                        <div className="resource-details">
                            <Text className="secondary-text">{link.description}</Text>
                            <a className="resource-link" href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${link.title} (opens in new tab)`}>Open {link.title} →</a>
                        </div>
                    </li>)}
                </ul>
            </section>
        </div>
    </>;
}
