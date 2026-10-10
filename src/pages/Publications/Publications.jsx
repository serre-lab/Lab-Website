import React, { useState } from "react";
import "./Publications.css";
import { Anchor, Text, Title, TextInput, Select, Group } from "@mantine/core";
import publicationsData from "../../data/publications_by_year.json";
import { resolvePublicationUrl } from "../../data/officialPublicationUrls";
import { motion } from "motion/react";
import { HeroBanner } from "../../components/HeroBanner/HeroBanner";
// import { IconSearch } from "@tabler/icons-react"; // optional icon

/** Case-insensitive substring match. No regular expressions. */
function matchesSearch(publication, normalizedQuery) {
    if (!normalizedQuery) return true;
    return [publication.title, publication.authors, publication.journal].some((field) =>
        String(field ?? "").toLowerCase().includes(normalizedQuery)
    );
}

function emptyPublicationsMessage(query, year) {
    const trimmed = query.trim();
    if (trimmed && year !== "All") {
        return `No publications match "${trimmed}" in ${year}.`;
    }
    if (trimmed) return `No publications match "${trimmed}".`;
    if (year !== "All") return `No publications for ${year}.`;
    return "No publications to show.";
}

export function Publications() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedYear, setSelectedYear] = useState("All");

    // Function to get the local PDF path (preserved for future use; pdfPath in publications_by_year.json)
    const getPdfPath = (publication) => {
        if (publication.url && publication.url.endsWith('.pdf')) return publication.url;
        if (publication.pdfPath) return publication.pdfPath;
        return null;
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleYearChange = (value) => {
        setSelectedYear(value || "All");
    };

    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filterPublications = () => {
        const filteredData = {};
        Object.entries(publicationsData).forEach(([year, publications]) => {
            if (selectedYear !== "All" && year !== selectedYear) return;

            const filteredPublications = publications.filter((publication) =>
                matchesSearch(publication, normalizedQuery)
            );

            if (filteredPublications.length > 0) {
                filteredData[year] = filteredPublications;
            }
        });
        return filteredData;
    };

    const filteredPublications = filterPublications();

    const sortedYears = Object.keys(filteredPublications).sort((a, b) => {
        if (a === "Work in progress") return -1;
        if (b === "Work in progress") return 1;
        if (a === "In press") return -1;
        if (b === "In press") return 1;
        return parseInt(b) - parseInt(a);
    });

    const resultCount = sortedYears.reduce(
        (count, year) => count + filteredPublications[year].length,
        0
    );

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.001, duration: 0.3 },
        }),
    };

    return (
        <>
            <HeroBanner 
                title="Publications" 
                subtitle="Research contributions advancing computational neuroscience, NeuroAI, and brain-inspired vision models"
                backgroundImage="/metcalf.webp"
            />
            <div className="publications-container">
                <div className="filter-section">
                    <div className="search-and-dropdown">
                        <TextInput
                            label="Search publications"
                            placeholder="Search by title, author, or journal..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="search-bar"
                            size="md"
                        />
                        <Select
                            label="Filter by year"
                            className="year-dropdown"
                            data={["All", ...Object.keys(publicationsData).sort((a, b) => {
                                if (a === "Work in progress") return -1;
                                if (b === "Work in progress") return 1;
                                if (a === "In press") return -1;
                                if (b === "In press") return 1;
                                return parseInt(b) - parseInt(a);
                            })]}
                            value={selectedYear}
                            onChange={handleYearChange}
                            placeholder="Filter by year"
                            size="md"
                            allowDeselect={false}
                        />
                    </div>
                </div>
                <div className="results-section">
                <p className="results-summary body-text" role="status" aria-live="polite" aria-atomic="true" hidden={!normalizedQuery && selectedYear === "All" && resultCount > 0}>
                    {resultCount === 0
                        ? emptyPublicationsMessage(searchQuery, selectedYear)
                        : `Showing ${resultCount} ${resultCount === 1 ? "publication" : "publications"}.`}
                </p>
                {sortedYears.map(
                    (year, i) =>
                        filteredPublications[year] && (
                            <motion.div
                                key={year}
                                className="publication-year-block"
                                custom={i}
                                initial="hidden"
                                animate="visible"
                                variants={fadeUp}
                            >
                                <Title order={2} className="year-heading">{year}</Title>
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    {filteredPublications[year].map((publication, index) => {
                                        const officialUrl = resolvePublicationUrl(publication);
                                        return (
                                        <motion.li
                                            key={index}
                                            className="publication-item"
                                            custom={index}
                                            initial="hidden"
                                            animate="visible"
                                            variants={fadeUp}
                                        >
                                            <Group align="flex-start" gap="sm">
                                                <div style={{ flex: 1 }}>
                                                    <h3 className="publication-title">
                                                        {officialUrl ? (
                                                            <Anchor
                                                                href={officialUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="publication-link"
                                                                aria-label={`${publication.title} (opens in new tab)`}
                                                            >
                                                                {publication.title}
                                                            </Anchor>
                                                        ) : (
                                                            <span className="publication-title-text">
                                                                {publication.title}
                                                            </span>
                                                        )}
                                                    </h3>
                                                    {publication.journal && (
                                                        <Text className="publication-journal">
                                                            {publication.journal}
                                                        </Text>
                                                    )}
                                                    <Text className="publication-authors">
                                                        {publication.authors}
                                                    </Text>
                                                </div>
                                                {/* PDF icons removed; pdfPath preserved in data for future use */}
                                            </Group>
                                        </motion.li>
                                        );
                                    })}
                                </ul>
                            </motion.div>
                        )
                )}
            </div>
        </div>
        </>
    );
}
