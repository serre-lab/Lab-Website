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
                        <Title order={3} className="resource-category">
                            {category}
                        </Title>
                        <Divider my="sm" />
                        {Object.entries(resources).map(
                            ([subCategoryName, subCategory]) => (
                                <div key={subCategoryName} className="sub-category-block">
                                    <Text size="lg" fw={600} className="sub-category-title">
                                        {subCategoryName}
                                    </Text>
                                    <List spacing="xs" size="sm" withPadding>
                                        {subCategory.map((resource) => (
                                            <List.Item key={resource.title}>
                                                <Anchor
                                                    href={resource.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {resource.title || resource.url}
                                                </Anchor>
                                            </List.Item>
                                        ))}
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
