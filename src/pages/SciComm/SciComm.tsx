import { Title, Anchor, Text, TextInput, Card, Image, Button, Group } from "@mantine/core";
import { useState } from "react";
import scicommData from "../../data/scicomm.json";
import talksData from "../../data/talks.json";
import "./SciComm.css";
import { HeroBanner } from "../../components/HeroBanner/HeroBanner";

// Add type for scicommData items to include image
type SciCommItem = {
    title: string;
    blurb: string;
    link: string;
    image?: string;
};

type Talk = {
    title?: string;
    venue: string;
    location: string;
    date: string;
    link?: string;
    upcoming?: boolean;
};

/** Case-insensitive substring match. No regular expressions. */
function matchesMediaSearch(item: SciCommItem, normalizedQuery: string) {
    if (!normalizedQuery) return true;
    return [item.title, item.blurb].some((field) =>
        String(field ?? "").toLowerCase().includes(normalizedQuery)
    );
}

export function SciComm() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const normalizedQuery = searchQuery.trim().toLowerCase();
    const filteredData = (scicommData as SciCommItem[]).filter((item) =>
        matchesMediaSearch(item, normalizedQuery)
    );
    const trimmedQuery = searchQuery.trim();

    return (
        <>
            <HeroBanner 
                title="Media" 
                subtitle="News coverage, talks, and science communication from the Serre Lab"
                backgroundImage="/metcalf.webp"
            />
            <div className="scicomm-container">
                <section className="talks-section" aria-labelledby="talks-heading">
                    <Title order={2} className="section-title" id="talks-heading">Recent &amp; Upcoming Talks</Title>
                    <ul className="talks-list">
                        {(talksData as Talk[]).map((talk, idx) => (
                            <li key={idx} className="talk-item">
                                <span className="talk-date">{talk.date}{talk.upcoming ? " · upcoming" : ""}</span>
                                <div>
                                    {talk.title && (
                                        <div className="talk-title">
                                            {talk.link ? (
                                                <Anchor href={talk.link} target="_blank" rel="noopener noreferrer" title="Opens in new tab">
                                                    {talk.title}
                                                </Anchor>
                                            ) : talk.title}
                                        </div>
                                    )}
                                    <Text size="sm" className="talk-venue">
                                        {!talk.title && talk.link ? (
                                            <Anchor href={talk.link} target="_blank" rel="noopener noreferrer" title="Opens in new tab">{talk.venue}</Anchor>
                                        ) : talk.venue}, {talk.location}
                                    </Text>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
                <div className="filter-section">
                    <div className="search-and-dropdown">
                        <TextInput
                            label="Search media"
                            placeholder="Search by title or content..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="search-bar"
                            size="md"
                        />
                    </div>
                </div>
                <div className="results-section">
                <Title order={2} className="section-title">Media Coverage</Title>
                <p className="results-summary" role="status" aria-live="polite" aria-atomic="true">
                    {filteredData.length === 0
                        ? (trimmedQuery
                            ? `No media coverage matches "${trimmedQuery}".`
                            : "No media coverage to show.")
                        : `Showing ${filteredData.length} ${filteredData.length === 1 ? "item" : "items"}.`}
                </p>
                <div className="media-grid">
                {filteredData.map((item, idx) => (
                    <Card
                        key={idx}
                        shadow="sm"
                        padding="lg"
                        radius="md"
                        withBorder
                        className="media-card"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            minHeight: 430,
                            transition: "transform 0.18s, box-shadow 0.18s",
                        }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px) scale(1.025)";
                            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px 0 rgba(0,0,0,0.15)";
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLDivElement).style.transform = "";
                            (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                        }}
                    >
                        {item.image && (
                            <Card.Section>
                                <Image
                                    src={item.image.replace(/-\d+x\d+\.(jpg|png)$/, '.$1')} // try to use original image if possible
                                    alt={item.title}
                                    height={180}
                                    fit="cover"
                                    style={{ objectFit: "cover", objectPosition: "center top" }}
                                />
                            </Card.Section>
                        )}
                        <Group justify="space-between" mt="md" mb="xs">
                            <Anchor href={item.link} target="_blank" rel="noopener noreferrer" title="Opens in new tab" aria-label={`${item.title} (opens in new tab)`} style={{ textDecoration: "none" }}>
                                <Title order={3}>{item.title}</Title>
                            </Anchor>
                        </Group>
                        <Text size="sm" lineClamp={4} style={{ flexGrow: 1, color: 'var(--color-text-secondary)' }}>
                            {item.blurb}
                        </Text>
                        <Button
                            component="a"
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Opens in new tab"
                            aria-label={`Continue reading: ${item.title} (opens in new tab)`}
                            variant="filled"
                            color="blue.8"
                            fullWidth
                            mt="md"
                            style={{ marginTop: "auto" }}
                        >
                            Continue reading
                        </Button>
                    </Card>
                ))}
                </div>
            </div>
        </div>
        </>
    );
}