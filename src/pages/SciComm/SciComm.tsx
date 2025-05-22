import { Title, Anchor, Text } from "@mantine/core";
import scicommData from "../../data/scicomm.json";

export function SciComm() {
    return (
        <div>
            <ul style={{ listStyle: "none",}}>
                            <Title>Science Communication</Title>
                {scicommData.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: "2rem" }}>
                        <Title order={1}>
                            <Anchor href={item.link} target="_blank" rel="noopener noreferrer">
                                {item.title}
                            </Anchor>
                        </Title>
                        <Text>{item.blurb}</Text>
                    </li>
                ))}
            </ul>
        </div>
    );
}