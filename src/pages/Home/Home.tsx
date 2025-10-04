import { Link } from "react-router-dom";
import Learn from "../../components/LearnMoreAbout/Learn";
import "./Home.css";
import { Title, Text } from "@mantine/core";
import { motion } from "motion/react";
import { FaTwitter, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa6";
import { useState } from "react";

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
  const [showUndergradDetails, setShowUndergradDetails] = useState(false);
  const [showPhdDetails, setShowPhdDetails] = useState(false);
  const [showPostdocDetails, setShowPostdocDetails] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

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
          <Text className="hero-affiliation" size="lg">
            Carney Center for Computational Brain Science
          </Text>
          <Text aria-label="lab one-liner" size="xl">
            Visual Cognition and AI
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

      {/* Featured Projects Section */}
      <motion.div
        className="featured-projects-section"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Title order={2} className="featured-title">Explore Our Interactive Tools</Title>
        <Text className="featured-subtitle">
          Try our research tools, games, and open-source software to advance vision science
        </Text>
        
        <div className="featured-grid">
          {/* ClickMe Card */}
          <div className="featured-card">
            <div className="featured-content">
              <Title order={3} className="featured-project-title">ClickMe</Title>
              <Text className="featured-description">
                Join 2,000+ players contributing 6.5M+ annotations. Play our game, win weekly cash prizes, and help AI see like humans. Featured on NBC 10.
              </Text>
              <a
                href="http://clickme.clps.brown.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="featured-button-small"
              >
                Play Now →
              </a>
            </div>
          </div>

          {/* Neural Harmonizer Card */}
          <div className="featured-card">
            <div className="featured-content">
              <Title order={3} className="featured-project-title">Neural Harmonizer</Title>
              <Text className="featured-description">
                Align AI models with human vision. Explore our harmonization techniques that make neural networks see more like humans do.
              </Text>
              <a
                href="https://serre-lab.github.io/Harmonization/"
                target="_blank"
                rel="noopener noreferrer"
                className="featured-button-small"
              >
                View Demo →
              </a>
            </div>
          </div>

          {/* ObjectLens Card */}
          <div className="featured-card">
            <div className="featured-content">
              <Title order={3} className="featured-project-title">ObjectLens</Title>
              <Text className="featured-description">
                Explore what ImageNet models really see. Interactive explainability tool for object recognition revealing how AI vision models make decisions.
              </Text>
              <a
                href="https://lens.visualize.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="featured-button-small"
              >
                Explore Tool →
              </a>
            </div>
          </div>

          {/* LeafLens Card */}
          <div className="featured-card">
            <div className="featured-content">
              <Title order={3} className="featured-project-title">LeafLens</Title>
              <Text className="featured-description">
                Discover how AI identifies plant species from cleared leaves. Visualize model attention and decision-making processes.
              </Text>
              <a
                href="https://leaf-lens.visualize.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="featured-button-small"
              >
                Explore Tool →
              </a>
            </div>
          </div>

          {/* Xplique Card */}
          <div className="featured-card">
            <div className="featured-content">
              <Title order={3} className="featured-project-title">Xplique</Title>
              <Text className="featured-description">
                Open-source deep learning explainability toolbox. Understand and interpret neural network decisions with state-of-the-art attribution methods.
              </Text>
              <a
                href="https://github.com/deel-ai/xplique"
                target="_blank"
                rel="noopener noreferrer"
                className="featured-button-small"
              >
                View on GitHub →
              </a>
            </div>
          </div>

          {/* Horama Card */}
          <div className="featured-card">
            <div className="featured-content">
              <Title order={3} className="featured-project-title">Horama</Title>
              <Text className="featured-description">
                Interactive visualization tool for exploring neural network representations and understanding feature hierarchies in deep learning models.
              </Text>
              <a
                href="https://github.com/serre-lab/Horama"
                target="_blank"
                rel="noopener noreferrer"
                className="featured-button-small"
              >
                View on GitHub →
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recent Highlights Section */}
      <motion.div
        className="recent-highlights-section"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Title order={2} className="highlights-title">Selected Recent Publications</Title>
        <div className="highlights-grid">
          <div className="highlight-card">
            <Text className="highlight-journal">Trends in Cognitive Sciences (2025)</Text>
            <Title order={4} className="highlight-title">
              <a href="https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(24)00301-5" target="_blank" rel="noopener noreferrer">
                Feature binding in biological and artificial vision
              </a>
            </Title>
            <Text className="highlight-authors">P. Roelfsema & T. Serre</Text>
          </div>

          <div className="highlight-card">
            <Text className="highlight-journal">ICLR (2025)</Text>
            <Title order={4} className="highlight-title">
              <a href="https://openreview.net/forum?id=WUQSbz2kna" target="_blank" rel="noopener noreferrer">
                The 3D-PC: A benchmark for visual perspective taking in humans and machines
              </a>
            </Title>
            <Text className="highlight-authors">D. Linsley et al.</Text>
          </div>

          <div className="highlight-card">
            <Text className="highlight-journal">arXiv preprint (2025)</Text>
            <Title order={4} className="highlight-title">
              <a href="https://arxiv.org/abs/2504.16940" target="_blank" rel="noopener noreferrer">
                From Prediction to Understanding: Will AI Foundation Models Transform Brain Science?
              </a>
            </Title>
            <Text className="highlight-authors">T. Serre & E. Pavlick</Text>
          </div>

          <div className="highlight-card">
            <Text className="highlight-journal">Current Biology (2024)</Text>
            <Title order={4} className="highlight-title">
              <a href="https://authors.elsevier.com/c/1k6Fc3QW8S6Gde" target="_blank" rel="noopener noreferrer">
                Monkeys engage in visual simulation to solve complex problems
              </a>
            </Title>
            <Text className="highlight-authors">A. Ahuja et al.</Text>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Link to="/publications" style={{ color: "#3498db", textDecoration: "none", fontWeight: 600 }}>
            View All Publications →
          </Link>
        </div>
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
            Our research investigates the computational principles of biological vision to understand how the brain works and to build more human-like AI systems. We work at the intersection of neuroscience, cognitive science, and artificial intelligence.
          </Text>
        </motion.div>

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
          <Title order={2} className="section-title">
            Prospective Students
          </Title>
        </motion.div>

        <motion.div variants={fadeUp} className="student-cards-container">
          <div className="student-card" onClick={() => setShowUndergradDetails(!showUndergradDetails)} style={{ cursor: "pointer" }}>
            <Title order={3} className="student-card-title">🎓 Undergraduate & MSc Students</Title>
            <Text className="student-card-text">
              Brown undergrad and MSc students interested in research
              should email Prof. Serre with a transcript and resume/CV.
            </Text>
            {showUndergradDetails && (
              <>
                <Text className="student-card-text" style={{ marginTop: "0.5rem" }}>
                  <strong>Requirements:</strong>
                </Text>
                <ul className="student-requirements">
                  <li>CS intro sequence</li>
                  <li>At least one ML, vision, or deep learning course</li>
                  <li>Strongly encouraged: CPSY 1291 or CPSY 1950 with Prof. Serre</li>
                  <li>Familiarity with our research and ability to articulate a specific project interest</li>
                </ul>
              </>
            )}
            <Text className="student-card-expand" style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "#3498db", fontWeight: 500 }}>
              {showUndergradDetails ? "Click to show less ▲" : "Click to see requirements ▼"}
            </Text>
          </div>

          <div className="student-card" onClick={() => setShowPhdDetails(!showPhdDetails)} style={{ cursor: "pointer" }}>
            <Title order={3} className="student-card-title">📚 PhD Students</Title>
            <Text className="student-card-text">
              PhD applicants can apply through cognitive science, computer science, or neuroscience
              graduate programs.
            </Text>
            {showPhdDetails && (
              <>
                <Text className="student-card-text" style={{ marginTop: "0.5rem" }}>
                  <strong>Requirements:</strong>
                </Text>
                <ul className="student-requirements">
                  <li>Strong quantitative skills including math and programming</li>
                  <li>Prior work in vision (required)</li>
                  <li>Prior experience in brain and cognitive science (a plus but not required)</li>
                </ul>
                <Text className="student-card-text" style={{ marginTop: "0.5rem" }}>
                  Due to the large volume of applicants, Prof. Serre can only meet with applicants after they have been invited for an interview.
                </Text>
              </>
            )}
            <Text className="student-card-expand" style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "#3498db", fontWeight: 500 }}>
              {showPhdDetails ? "Click to show less ▲" : "Click to see requirements ▼"}
            </Text>
          </div>

          <div className="student-card" onClick={() => setShowPostdocDetails(!showPostdocDetails)} style={{ cursor: "pointer" }}>
            <Title order={3} className="student-card-title">🔬 Postdoctoral Researchers</Title>
            <Text className="student-card-text">
              Prospective postdocs should email Prof. Serre directly with their CV, research statement, and references.
            </Text>
            {showPostdocDetails && (
              <>
                <Text className="student-card-text" style={{ marginTop: "0.5rem" }}>
                  <strong>Requirements:</strong>
                </Text>
                <ul className="student-requirements">
                  <li>Graduate training in computational neuroscience or AI</li>
                  <li>Strong track record publishing at top venues including NeurIPS, ICML, ICLR, and/or CVPR</li>
                </ul>
              </>
            )}
            <Text className="student-card-expand" style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "#3498db", fontWeight: 500 }}>
              {showPostdocDetails ? "Click to show less ▲" : "Click to see requirements ▼"}
            </Text>
          </div>
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
            Additional support is provided by the Carney Institute for Brain Science and the Center for Computation and Visualization (CCV) (via NIH S10OD036341 to TS.) We acknowledge the Cloud TPU hardware resources that Google graciously makes available via the TensorFlow Research Cloud (TFRC) program.
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
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem", alignItems: "center", flexWrap: "wrap" }}>
          <a
            href="https://twitter.com/serre_lab"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Serre Lab Twitter"
            style={{ color: "inherit", transition: "color 0.3s ease" }}
            className="social-icon"
          >
            <FaTwitter size={36} />
          </a>
          <a
            href="https://www.linkedin.com/company/serre-lab"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Serre Lab LinkedIn"
            style={{ color: "inherit", transition: "color 0.3s ease" }}
            className="social-icon"
          >
            <FaLinkedin size={36} />
          </a>
          <a
            href="https://github.com/serre-lab"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Serre Lab GitHub"
            style={{ color: "inherit", transition: "color 0.3s ease" }}
            className="social-icon"
          >
            <FaGithub size={36} />
          </a>
          {!showEmail ? (
            <button
              onClick={() => setShowEmail(true)}
              aria-label="Reveal email address"
              className="email-icon-button"
            >
              <FaEnvelope size={36} />
            </button>
          ) : (
            <a
              href="mailto:thomas_serre@brown.edu"
              aria-label="Email Prof. Serre"
              style={{ color: "inherit", transition: "color 0.3s ease" }}
              className="social-icon"
            >
              <FaEnvelope size={36} />
            </a>
          )}
        </div>
        {showEmail && (
          <Text size="sm" style={{ marginTop: "1rem", color: "#666" }}>
            thomas_serre@brown.edu
          </Text>
        )}
      </motion.div>
    </div>
  );
}
