import React, { useState } from "react";
import "./Publications.css";
import { Anchor, Text, Title, TextInput, Select, Group } from "@mantine/core";
import publicationsData from "../../data/publications_by_year.json";
import { getOfficialPublicationUrl } from "../../data/officialPublicationUrls";
import { motion } from "framer-motion";
import { FaMicrophone, FaFilePdf } from "react-icons/fa";
// import { IconSearch } from "@tabler/icons-react"; // optional icon

export function Publications() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedYear, setSelectedYear] = useState("All");

    // Function to get the official publication URL (journal/conference/OpenReview)
    const getOfficialUrl = (publication) => {
        // First try to get from our mapping
        const mappedUrl = getOfficialPublicationUrl(publication.title);
        if (mappedUrl) {
            return mappedUrl;
        }
        
        // If URL is not a PDF and not our internal publications page, use it as official URL
        if (publication.url && 
            !publication.url.endsWith('.pdf') && 
            !publication.url.includes('/papers/') &&
            publication.url !== '/publications') {
            return publication.url;
        }
        
        return null;
    };

    // Function to get the local PDF path
    const getPdfPath = (publication) => {
        // If the URL is a PDF path, use it
        if (publication.url && publication.url.endsWith('.pdf')) {
            return publication.url;
        }
        
        // Check if there's a separate PDF path
        if (publication.pdfPath) {
            return publication.pdfPath;
        }
        
        return null;
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const handleYearChange = (value) => {
        setSelectedYear(value || "All");
    };

    const filterPublications = () => {
        const filteredData = {};
        Object.entries(publicationsData).forEach(([year, publications]) => {
            if (selectedYear !== "All" && year !== selectedYear) return;

            const filteredPublications = publications.filter(
                (publication) => {
                    // Create word boundary regex for exact word matching
                    const searchRegex = new RegExp(`\\b${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
                    
                    return (
                        searchRegex.test(publication.title) ||
                        searchRegex.test(publication.authors) ||
                        (publication.journal && searchRegex.test(publication.journal))
                    );
                }
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

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.001, duration: 0.3 },
        }),
    };

    return (
        <div className="publications-container">
            <Title order={1} className="page-title">Publications</Title>
            <div className="filter-section">
                <div className="search-and-dropdown">
                    <TextInput
                        placeholder="Search by title, author, or journal..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="search-bar"
                        size="md"
                    />
                    <Select
                        className="year-dropdown"
                        data={["All", ...Object.keys(publicationsData).sort((a, b) => {
                            if (a === "Work in progress") return -1;
                            if (b === "Work in progress") return 1;
                            return parseInt(b) - parseInt(a);
                        })]}
                        value={selectedYear}
                        onChange={handleYearChange}
                        placeholder="Filter by year"
                        size="md"
                    />
                </div>
            </div>
            <div className="results-section">
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
                                <Title className="year-heading">{year}</Title>
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    {filteredPublications[year].map((publication, index) => (
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
                                                    <Title order={1} className="publication-title">
                                                        {getOfficialUrl(publication) ? (
                                                            <Anchor
                                                                href={getOfficialUrl(publication)}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="publication-link"
                                                            >
                                                                {publication.title}
                                                            </Anchor>
                                                        ) : (
                                                            <span className="publication-title-text">
                                                                {publication.title}
                                                            </span>
                                                        )}
                                                    </Title>
                                                    {publication.journal && (
                                                        <Text className="publication-journal">
                                                            {publication.journal}
                                                        </Text>
                                                    )}
                                                    <Text className="publication-authors">
                                                        {publication.authors}
                                                    </Text>
                                                </div>
                                                {getPdfPath(publication) && (
                                                    <Anchor
                                                        href={getPdfPath(publication)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="pdf-icon-link"
                                                        title="Download PDF"
                                                    >
                                                        <FaFilePdf size={20} color="#e74c3c" />
                                                    </Anchor>
                                                )}
                                            </Group>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        )
                )}
            </div>
        </div>
    );
}
