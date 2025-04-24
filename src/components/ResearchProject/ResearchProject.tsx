import { Title, Text } from "@mantine/core";
import "./ResearchProject.css";

interface ResearchProjectProps {
  title: string;
  years: string;
  fundingSource: string;
  description: string[];
}

export default function ResearchProject(props: ResearchProjectProps) {
  return (
    <div className="research-project-container">
      <Title order={3} className="research-project-title">{props.title}</Title>
      <Text className="research-meta">{props.years} | {props.fundingSource}</Text>
      {props.description.map((sentence, index) => (
        <Text key={index} component="p" className="research-description-paragraph">
          {sentence}
        </Text>
      ))}
    </div>
  );
}
