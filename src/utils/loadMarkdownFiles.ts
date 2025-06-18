/**
 * Loads the content of all Markdown files dynamically and generates routes.
 * @returns A promise that resolves to an array of routes with paths and content.
 */
export const loadMarkdownFiles = async (): Promise<
    { path: string; content: string }[]
> => {
    const markdownFiles = import.meta.glob("/src/markdown-pages/**/*.md", {
        query: "?raw",
        import: "default",
    });

    // For hash routing, paths should NOT start with "#/"
    const base = "/";

    const routes = await Promise.all(
        Object.entries(markdownFiles).map(async ([filePath, loadContent]) => {
            const content = (await loadContent()) as string;
            // Get the path relative to /src/markdown-pages/
            const relPath = filePath
                .replace(/^\/src\/markdown-pages\//, "")
                .replace(/\.md$/, "");
            return {
                path: `${base}${relPath}`,
                content,
            };
        })
    );

    return routes;
};
