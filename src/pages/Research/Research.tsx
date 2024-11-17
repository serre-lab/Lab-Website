import researchData from "../../data/research.json";
import ResearchProject from "../../components/ResearchProject/ResearchProject";

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
        <div>
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
