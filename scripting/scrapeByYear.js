import playwright from "playwright";
import fs from "fs";
import path from "path";

const BASE_URL = "https://serre-lab.clps.brown.edu/publications/";

const scrapePublications = async (page) => {
    return page.$$eval("ol.publication_list", (publicationLists) => {
        const publicationsByYear = {};

        publicationLists.forEach((list) => {
            const yearElement = list.querySelector("h1.publication_year");
            const year = yearElement ? yearElement.innerText.trim() : "Unknown";

            const publications = Array.from(
                list.querySelectorAll("li.publication")
            ).map((pub) => {
                const titleElement = pub.querySelector("a.publication_title");
                const journalElement = pub.querySelector("h2.journal");
                const authorsElement = pub.querySelector("h2.authors");

                const formatText = (element) =>
                    element && element.innerText.trim();

                return {
                    title: formatText(titleElement),
                    url: titleElement ? titleElement.href : null,
                    journal: formatText(journalElement),
                    authors: formatText(authorsElement),
                };
            });

            if (!publicationsByYear[year]) {
                publicationsByYear[year] = [];
            }
            publicationsByYear[year].push(...publications);
        });

        return publicationsByYear;
    });
};

const saveDataToFile = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log("Data saved to:", filePath);
};

const main = async () => {
    try {
        const browser = await playwright.chromium.launch({ headless: true });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(BASE_URL);

        const publicationsByYear = await scrapePublications(page);

        console.log("Publications by Year:", publicationsByYear);

        const filePath = path.join("./", "publications_by_year.json");
        saveDataToFile(filePath, publicationsByYear);

        await browser.close();
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

main();
