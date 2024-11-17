import researchData from "../../data/research.json";
import ResearchProject from "../../components/ResearchProject/ResearchProject";
import { Text, Title } from "@mantine/core";
import "./Research.css";

interface Project {
    // project: {
    title: string;
    years: string;
    fundingSource: string;
    description: string[];
    // }
}
export function Research() {
    return (
        <div className="research-container">
            <div className="titleDesc-container">
                <Title>Research</Title>
                <div className="research-description">
                    <Text size="lg">
                        There is little doubt that even a partial solution to
                        the question of which computations are carried out by
                        the visual cortex would be a major breakthrough: It
                        would begin to explain one of our most amazing
                        abilities, vision; and it would open doors to other
                        aspects of intelligence such as language, planning or
                        reasoning. It would also help connect neurobiology and
                        mathematics, making it possible to develop computer
                        algorithms that follow the information-processing
                        principles used by biological organisms and honed by
                        natural evolution.
                    </Text>
                </div>
            </div>
            {researchData.researchProjects.map(
                (project: Project, index: number) => (
                    <div>
                        <ResearchProject
                            key={index}
                            title={project.title}
                            years={project.years}
                            fundingSource={project.fundingSource}
                            description={project.description}
                        />
                    </div>
                )
            )}
        </div>
    );
}
