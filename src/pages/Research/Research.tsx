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
          Even a partial solution to the computations of the visual cortex would be a breakthrough:
          it would help explain vision, unlock understanding of intelligence, and build a bridge
          between neurobiology and algorithms shaped by evolution.
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
