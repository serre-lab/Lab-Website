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

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
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
                <div className="search-and-dropdown">
                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />

                    {/* Year Dropdown */}
                    <select
                        value={selectedYear}
                        onChange={handleYearChange}
                        className="year-dropdown"
                    >
                        <option value="All">All Years</option>
                        {sortedYears.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
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
                                            {/* Title */}
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

                                            {/* Journal */}
                                            <Text className="publication-journal">
                                                {publication.journal}
                                            </Text>

                                            {/* Authors */}
                                            <Text className="publication-authors">
                                                {publication.authors}
                                            </Text>
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
