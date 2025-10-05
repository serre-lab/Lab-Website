import { Title, Anchor, Text, TextInput, Card, Image, Button, Group } from "@mantine/core";
import { useState } from "react";
import scicommData from "../../data/scicomm.json";
import "./SciComm.css";

// Add type for scicommData items to include image
type SciCommItem = {
    title: string;
    blurb: string;
    link: string;
    image?: string;
};

export function SciComm() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const filterMedia = () => {
        if (!searchQuery.trim()) {
            return scicommData as SciCommItem[];
        }

        // Create word boundary regex for exact word matching
        const searchRegex = new RegExp(`\\b${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        
        return (scicommData as SciCommItem[]).filter(
            (item) =>
                searchRegex.test(item.title) ||
                searchRegex.test(item.blurb)
        );
    };

    const filteredData = filterMedia();

    return (
        <div className="scicomm-container">
            <Title order={1} className="page-title">Media</Title>
            <div className="filter-section">
                <div className="search-and-dropdown">
                    <TextInput
                        placeholder="Search by title or content..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="search-bar"
                        size="md"
                    />
                </div>
            </div>
            <div className="results-section">
                <div className="media-grid">
                {filteredData.map((item, idx) => (
                    <Card
                        key={idx}
                        shadow="sm"
                        padding="lg"
                        radius="md"
                        withBorder
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            height: 430,
                            minHeight: 430,
                            transition: "transform 0.18s, box-shadow 0.18s",
                            cursor: "pointer",
                        }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px) scale(1.025)";
                            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px 0 rgba(0,0,0,0.15)";
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLDivElement).style.transform = "";
                            (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                        }}
                        onClick={() => window.open(item.link, "_blank", "noopener,noreferrer")}
                        tabIndex={0}
                        role="button"
                        aria-label={`Open news: ${item.title}`}
                        onKeyDown={e => {
                            if (e.key === "Enter" || e.key === " ") {
                                window.open(item.link, "_blank", "noopener,noreferrer");
                            }
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
                            <Anchor href={item.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                                <Title order={3}>{item.title}</Title>
                            </Anchor>
                        </Group>
                        <Text size="sm" color="dimmed" lineClamp={4} style={{ flexGrow: 1 }}>
                            {item.blurb}
                        </Text>
                        <Button
                            component="a"
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="light"
                            color="blue"
                            fullWidth
                            mt="md"
                            style={{ marginTop: "auto" }}
                            onClick={e => e.stopPropagation()}
                        >
                            Continue reading
                        </Button>
                    </Card>
                ))}
                </div>
            </div>

            {/* --- Previous list-based rendering version ---
            // Uncomment below if you prefer the old list style instead of cards:

            <ul style={{ listStyle: "none",}}>
                <Title>Science Communication</Title>
                {filteredData.map((item, idx) => (
                    <li key={idx}>
                        // image property is now available for future use
                        // Example: <img src={item.image} alt={item.title} />
                        <Title order={1}>
                            <Anchor href={item.link} target="_blank" rel="noopener noreferrer">
                                {item.title}
                            </Anchor>
                        </Title>
                        <Text>{item.blurb}</Text>
                    </li>
                ))}
            </ul>
            */ }
        </div>
    );
}