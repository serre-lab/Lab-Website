import resourcesData from "../../data/resources.json";
import "./Resources.css";
import { Text, Title, Anchor, List, Paper, Divider } from "@mantine/core";

export function Resources() {
    return (
        <div className="resources-container">
            <Title order={1} className="resources-title">
                Resources
            </Title>

            <div className="resources-columns">
                {Object.entries(resourcesData).map(([category, resources]) => (
                    <Paper
                        key={category}
                        shadow="xs"
                        radius="md"
                        p="md"
                        className="resource-card"
                    >
                        <Title order={2} className="resource-category">
                            {category}
                        </Title>
                        <Divider my="sm" />
                        {Object.entries(resources).map(
                            ([subCategoryName, subCategory]) => (
                                <div key={subCategoryName} className="sub-category-block">
                                    <Text size="lg" className="sub-category-title">
                                        {subCategoryName}
                                    </Text>
                                    <List spacing="xs" size="sm" withPadding>
                                        {subCategory.map((resource) => (
                                            <List.Item key={resource.title}>
                                                <Anchor
                                                    href={resource.url}
                                                    target={resource.url.startsWith("http") ? "_blank" : undefined}
                                                    rel={resource.url.startsWith("http") ? "noopener noreferrer" : undefined}
                                                >
                                                    <Text>
                                                    {resource.title || resource.url}
                                                    </Text>
                                                </Anchor>
                                            </List.Item>
                                        ))}
                                        {/* Example markdown page link */}
                                        {category === "Teaching" && subCategoryName === "Projects" && (
                                            <List.Item key="example-md">
                                                <Anchor href="/resources/test">
                                                    <Text>Example Markdown Resource Page</Text>
                                                </Anchor>
                                            </List.Item>
                                        )}
                                    </List>
                                </div>
                            )
                        )}
                    </Paper>
                ))}
            </div>
        </div>
    );
}
