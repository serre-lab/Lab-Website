import researchData from "../../data/research.json";
import ResearchProject from "../../components/ResearchProject/ResearchProject";
import { Text, Title } from "@mantine/core";
import "./Research.css";
import { motion } from "framer-motion";

interface Project {
  title: string;
  years: string;
  fundingSource: string;
  description: string[];
}

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.001, duration: 0.35 }, // ⬅ faster
    }),
  };

export function Research() {
  return (
    <div className="research-container">
      <div className="titleDesc-container">
        <Title order={1} className="page-title">Research</Title>
        <Text size="lg" className="research-description">
        There is little doubt that even a partial solution to the question of which computations are carried out by the visual cortex would be a breakthrough: It would begin to explain one of our most amazing abilities, vision; and it would open doors to other aspects of intelligence such as language, planning or reasoning. It would also help connect neurobiology and mathematics, making it possible to develop computer algorithms that follow the information-processing principles used by biological organisms and honed by natural evolution.
        </Text>
      </div>

      {researchData.researchProjects.map((project: Project, index: number) => (
        <motion.div
          key={index}
          custom={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <ResearchProject
            title={project.title}
            years={project.years}
            fundingSource={project.fundingSource}
            description={project.description}
          />
        </motion.div>
      ))}
    </div>
  );
}
