import resourcesData from "./resources.json";
import "./Resources.css";
import { Text, Title, Anchor, List } from "@mantine/core";

export function Resources() {
    console.log(Object.entries(resourcesData)[0]);
    const [category, resources] = Object.entries(resourcesData)[0];
    console.log(category);
    console.log(Object.entries(resources));
    return (
        <div className="resources-container">
            <Title>Resources</Title>
            <div className="resources-columns">
                {Object.entries(resourcesData).map(([category, resources]) => (
                    <div key={category}>
                        <Title order={2}>{category}</Title>
                        {/* <ul> */}
                        {Object.entries(resources).map(
                            ([subCategoryName, subCategory]) => (
                                // <li key={subCategoryName}>
                                <div>
                                    <Text
                                        size="xl"
                                        style={{
                                            color: "gray",
                                        }}
                                    >
                                        {subCategoryName}
                                    </Text>
                                    <List>
                                        {subCategory.map((resource) => (
                                            <List.Item key={resource.title}>
                                                <Anchor
                                                    href={resource.url}
                                                    target="_blank"
                                                >
                                                    {resource.title ||
                                                        resource.url}
                                                </Anchor>
                                                {/* <a href={resource.url}>
                                                    {resource.title ||
                                                        resource.url}
                                                </a> */}
                                            </List.Item>
                                        ))}
                                    </List>
                                    {/* // </li> */}
                                </div>
                            )
                        )}
                        {/* </ul> */}
                    </div>
                ))}
            </div>
        </div>
    );
}
