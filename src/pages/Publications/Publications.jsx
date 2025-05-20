import React, { useState } from "react";
import "./Publications.css";
import { Anchor, Text, Title, TextInput, Select } from "@mantine/core";
import publicationsData from "../../data/publications_by_year.json";
import { motion } from "framer-motion";
import { FaMicrophone } from "react-icons/fa";
// import { IconSearch } from "@tabler/icons-react"; // optional icon

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

    const sortedYears = Object.keys(publicationsData).sort((a, b) => {
        if (a === "Work in progress") return -1;
        if (b === "Work in progress") return 1;
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
           <div className="filter-section">
  <div className="search-and-dropdown">
    <TextInput
      placeholder="Search by title or author..."
      icon={<FaMicrophone size={48} />}
      value={searchQuery}
      onChange={handleSearchChange}
      className="search-bar"
    />
    <Select
      className="year-dropdown"
      data={["All", ...sortedYears]}
      value={selectedYear}
      onChange={(val) => setSelectedYear(val || "All")}
      withinPortal
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
                                {filteredPublications[year].map((publication, index) => (
                                        <motion.div
                                        key={index}
                                        className="publication-item"
                                        custom={index}
                                        initial="hidden"
                                        animate="visible"
                                        variants={fadeUp}
                                    >                                  
                                        <Anchor
                                            href={publication.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="publication-title"
                                        >
                                            <Title order={4} >
                                                {publication.title}
                                            </Title>
                                        </Anchor>
                                        <Text className="publication-authors">
                                            {publication.authors}
                                        </Text>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )
                )}
            </div>
        </div>
    );
}
