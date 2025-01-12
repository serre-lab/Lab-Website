/**
 * Loads the content of all Markdown files dynamically and generates routes.
 * @returns A promise that resolves to an array of routes with paths and content.
 */
export const loadMarkdownFiles = async (): Promise<
    { path: string; content: string }[]
> => {
    const markdownFiles = import.meta.glob("/src/content/**/*.md", {
        query: "?raw",
        import: "default",
    });

    const routes = await Promise.all(
        Object.entries(markdownFiles).map(async ([filePath, loadContent]) => {
            const content = (await loadContent()) as string;
            console.log("path: ", filePath);
            console.log("content: ", content);
            return {
                path: filePath.replace("/src/content", "").replace(".md", ""), // Generate route path
                content: content, // Access raw Markdown content
            };
        })
    );

    return routes;
};
