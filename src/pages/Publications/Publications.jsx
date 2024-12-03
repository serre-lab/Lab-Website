import React, { useState } from "react";
import "./Publications.css";
import { Anchor, Text, Title } from "@mantine/core";
import publicationsData from "../../data/publications_by_year.json";

export function Publications() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedYear, setSelectedYear] = useState("All");

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const handleYearClick = (year) => {
        setSelectedYear(year);
    };

    const filterPublications = () => {
        const filteredData = {};
        Object.entries(publicationsData).forEach(([year, publications]) => {
            if (selectedYear !== "All" && year !== selectedYear) return;

            const filteredPublications = publications.filter(
                (publication) =>
                    publication.title.toLowerCase().includes(searchQuery) ||
                    publication.authors.toLowerCase().includes(searchQuery)
            );

            if (filteredPublications.length > 0) {
                filteredData[year] = filteredPublications;
            }
        });
        return filteredData;
    };

    const filteredPublications = filterPublications();

    // Sort years with "Work in progress" first, then descending numerical order
    const sortedYears = Object.keys(publicationsData).sort((a, b) => {
        if (a === "Work in progress") return -1; // Keep "Work in progress" at the top
        if (b === "Work in progress") return 1;
        return parseInt(b) - parseInt(a); // Sort numerically for other years
    });

    return (
        <div className="publications-container">
            <div className="filter-section">
                <Title order={2}>Filter Publications</Title>
                <input
                    type="text"
                    placeholder="Search by title or author..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <div className="year-filter">
                    <span
                        onClick={() => handleYearClick("All")}
                        className={selectedYear === "All" ? "active" : ""}
                    >
                        All Years
                    </span>
                    {sortedYears.map((year) => (
                        <span
                            key={year}
                            onClick={() => handleYearClick(year)}
                            className={selectedYear === year ? "active" : ""}
                        >
                            {year}
                        </span>
                    ))}
                </div>
            </div>
            <div className="results-section">
                {sortedYears.map(
                    (year) =>
                        filteredPublications[year] && (
                            <div key={year}>
                                <Title>{year}</Title>
                                {filteredPublications[year].map(
                                    (publication, index) => (
                                        <div
                                            key={index}
                                            className="publication-item"
                                        >
                                            <Anchor
                                                href={publication.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="publication-title"
                                            >
                                                <Text size="xl">
                                                    {publication.title}
                                                </Text>
                                            </Anchor>
                                            <Text className="publication-authors">
                                                {publication.authors}
                                            </Text>
                                            <span className="journal-tag">
                                                {publication.journal}
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        )
                )}
            </div>
        </div>
    );
}
