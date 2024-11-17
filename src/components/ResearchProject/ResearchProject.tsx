import { Title, Text } from "@mantine/core";

interface ResearchProjectProps {
    title: string;
    years: string;
    fundingSource: string;
    description: string[];
}

export default function ResearchProject(props: ResearchProjectProps) {
    return (
        <div>
            <Title order={3}>{props.title}</Title>
            <Text>{props.years}</Text>
            <Text>{props.fundingSource}</Text>
            {props.description.map((sentence, index) => (
                <Text key={index} component="p">
                    {sentence}
                </Text>
            ))}
        </div>
    );
}
