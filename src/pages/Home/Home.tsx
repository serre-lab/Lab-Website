import { Link } from "react-router-dom";
import Learn from "../../components/LearnMoreAbout/Learn";
import "./Home.css";
import { Title, Text } from "@mantine/core";
import { motion } from "motion/react";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeZoom = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <motion.div
  className="image-wrapper"
  variants={fadeZoom}
  initial="hidden"
  animate="visible"
>
        <div className="hero-text">
          <Title aria-label="lab title">Serre Lab</Title>
          <Text aria-label="lab one-liner" size="xl">
            Understanding the neural computations supporting visual perception
          </Text>
        </div>
      </motion.div>

      {/* Learn More Section */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Learn />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="home-content"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={fadeUp}>
          <Text size="lg">
            We are proud members of the{" "}
            <Link to="https://carney.brown.edu/">Carney Institute for Brain Science</Link> and the{" "}
            <Link to="https://ccbs.carney.brown.edu/">Center for Computational Brain Science</Link>{" "}
            at Brown! We also work in close collaboration with and leverage resources from the{" "}
            <Link to="https://ccv.brown.edu/">Center for Computation and Visualization</Link>.
          </Text>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Text size="lg">
            Even a partial solution to the computations of the visual cortex would be a breakthrough:
            it would help explain one of our most profound abilities—vision—and open the door to
            understanding language, reasoning, and planning. It also bridges neurobiology and
            mathematics, guiding the development of biologically inspired algorithms.
          </Text>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Title order={2} className="section-title">
            Prospective Students
          </Title>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Text size="lg">
            The lab is actively recruiting! Brown undergrad and MSc students interested in research
            should email Prof. Serre with a transcript and resume/CV. Students should have completed
            a CS intro sequence and at least one ML, vision, or deep learning course.
          </Text>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Text size="lg">
            PhD applicants can apply through cognitive science, computer science, or neuroscience
            graduate programs. Prof. Serre only meets prospective students after the initial
            application review.
          </Text>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Text size="lg">
            Prospective postdocs should email Prof. Serre directly.
          </Text>
        </motion.div>
      </motion.div>
    </div>
  );
}
