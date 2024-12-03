import React, { useState } from "react";
import "./Publications.css";
import { Title } from "@mantine/core";
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
                    <button
                        onClick={() => handleYearClick("All")}
                        className={selectedYear === "All" ? "active" : ""}
                    >
                        All Years
                    </button>
                    {Object.keys(publicationsData).map((year) => (
                        <button
                            key={year}
                            onClick={() => handleYearClick(year)}
                            className={selectedYear === year ? "active" : ""}
                        >
                            {year}
                        </button>
                    ))}
                </div>
            </div>
            <div className="results-section">
                {Object.entries(filteredPublications).map(
                    ([year, publications]) => (
                        <div key={year}>
                            <h2>{year}</h2>
                            <ul>
                                {publications.map((publication, index) => (
                                    <li key={index}>
                                        <a
                                            href={publication.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {publication.title}
                                        </a>
                                        <p>
                                            <strong>Journal:</strong>{" "}
                                            {publication.journal}
                                        </p>
                                        <p>
                                            <strong>Authors:</strong>{" "}
                                            {publication.authors}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
