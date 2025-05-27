import { Link } from "react-router-dom";
import Learn from "../../components/LearnMoreAbout/Learn";
import "./Home.css";
import { Title, Text } from "@mantine/core";
import { motion } from "motion/react";
import { FaTwitter, FaLinkedin } from "react-icons/fa6";

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
          <Title order={1} aria-label="lab title">Serre Lab</Title>
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
          <Text>
            We are proud members of the{" "}
            <Link to="https://carney.brown.edu/">Carney Institute for Brain Science</Link> and the{" "}
            <Link to="https://ccbs.carney.brown.edu/">Center for Computational Brain Science</Link>{" "}
            at Brown! We also work in close collaboration with and leverage resources from the{" "}
            <Link to="https://ccv.brown.edu/">Center for Computation and Visualization</Link>.
          </Text>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Text>
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
          <Text>
            The lab is actively recruiting! Brown undergrad and MSc students interested in research
            should email Prof. Serre with a transcript and resume/CV. Students should have completed
            a CS intro sequence and at least one ML, vision, or deep learning course.
          </Text>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Text>
            PhD applicants can apply through cognitive science, computer science, or neuroscience
            graduate programs. Prof. Serre only meets prospective students after the initial
            application review.
          </Text>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Text>
            Prospective postdocs should email Prof. Serre directly.
          </Text>
        </motion.div>

        {/* Funding Section */}
        <motion.div variants={fadeUp}>
          <Title order={2} className="section-title" style={{ marginTop: "2rem" }}>
            Funding
          </Title>
        </motion.div>
        <motion.div variants={fadeUp}>
          <Text>
            Our work is currently supported by ONR (N00014-24-1-2026 and REPRISM MURI N00014-24-1-2603), NSF (IIS-2402875 and EAR-1925481), and the ANR-3IA Artificial and Natural Intelligence Toulouse Institute (ANR-19-PI3A-0004).
            <br /><br />
            Additional support is provided by the Carney Institute for Brain Science and the Center for Computation and Visualization (CCV) (via NIH Office of the Director grant S10OD025181.) We acknowledge the Cloud TPU hardware resources that Google graciously makes available via the TensorFlow Research Cloud (TFRC) program.
          </Text>
        </motion.div>
      </motion.div>

      {/* Social Media Section */}
      <motion.div
        className="social-media-section"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ marginTop: "2rem", textAlign: "center" }}
      >
        <Title order={3} style={{ marginBottom: "1rem" }}>
          Connect with us
        </Title>
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
          <a
            href="https://twitter.com/serre_lab"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Serre Lab Twitter"
            style={{ color: "inherit" }}
          >
            <FaTwitter size={36} />
          </a>
          <a
            href="https://www.linkedin.com/company/serre-lab"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Serre Lab LinkedIn"
            style={{ color: "inherit" }}
          >
            <FaLinkedin size={36} />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
