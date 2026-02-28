import { Link } from "react-router-dom";
import Learn from "../../components/LearnMoreAbout/Learn";
import "./Home.css";
import { Title, Text } from "@mantine/core";
import { motion } from "motion/react";
import { useState } from "react";
import { HeroBanner } from "../../components/HeroBanner/HeroBanner";

// Helper function to shorten journal names
const shortenJournalName = (journal: string): string => {
  const journalMap: { [key: string]: string } = {
    'Current Biology': 'Curr Biol',
    'Histopathology': 'Histopath',
    'Trends in Cognitive Sciences': 'TICS',
    'International Conference on Learning Representations': 'ICLR',
    'arXiv': 'arXiv',
    'Nature': 'Nature',
    'Science': 'Science',
    'Cell': 'Cell',
    'Neuron': 'Neuron',
    'Proceedings of the National Academy of Sciences': 'PNAS',
    'Journal of Neuroscience': 'J Neurosci',
    'Cerebral Cortex': 'Cereb Cortex',
    'PLOS Computational Biology': 'PLOS Comput Biol',
    'Journal of Vision': 'J Vis',
    'Vision Research': 'Vis Res',
    'Perception': 'Perception',
    'Psychological Science': 'Psychol Sci',
    'Journal of Experimental Psychology': 'J Exp Psychol',
    'Cognitive Psychology': 'Cogn Psychol',
    'Memory & Cognition': 'Mem Cogn',
    'Attention, Perception, & Psychophysics': 'Atten Percept Psychophys'
  };
  
  return journalMap[journal] || journal;
};

// Helper function to abbreviate author lists
const abbreviateAuthors = (authors: string, maxAuthors: number = 2): string => {
  // Handle "et al." format - just remove initials from the first author
  if (authors.includes(' et al.')) {
    const firstAuthor = authors.replace(' et al.', '').trim();
    const parts = firstAuthor.split(/\s+/);
    const lastName = parts[parts.length - 1];
    return `${lastName} et al.`;
  }
  
  // Handle both comma and ampersand separators
  const authorList = authors.split(/,\s*|\s*&\s*/).filter(author => author.trim() !== '');
  
  // Extract last name from author (remove initials)
  const getLastName = (author: string) => {
    const parts = author.trim().split(/\s+/);
    return parts[parts.length - 1]; // Get the last part (last name)
  };
  
  if (authorList.length <= maxAuthors) {
    // For 2 or fewer authors, remove initials but keep all names
    return authorList.map(getLastName).join(' & ');
  }
  
  // Find the first author that contains "Serre" or "T. Serre"
  const serreIndex = authorList.findIndex(author => 
    author.toLowerCase().includes('serre') || author.toLowerCase().includes('t. serre')
  );
  
  if (serreIndex === 0) {
    // Serre is first author
    return `${getLastName(authorList[0])} et al.`;
  } else {
    // Serre is not first author or not found, just show first author + et al.
    return `${getLastName(authorList[0])} et al.`;
  }
};

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
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

  return (
    <div className="home-container">
      <HeroBanner
        title="Serre Lab"
        subtitle={(
          <div className="home-hero-subtitle">
            <Text className="home-hero-line">Center for Computational Brain Science</Text>
            <Text className="home-hero-line">Robert J. and Nancy D. Carney Institute for Brain Science</Text>
            <Text className="home-hero-line">Cognitive & Psychological Sciences and Computer Science Depts</Text>
            <Text className="home-hero-line">Brown University</Text>
          </div>
        )}
        backgroundImage="/metcalf.png"
      />

      {/* Learn More Section */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Learn />
      </motion.div>

      {/* Prospective Students Section */}
      <motion.div
        className="home-content"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
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
            <Text className="student-card-expand">
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
            <Text className="student-card-expand">
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
            <Text className="student-card-expand">
              {showPostdocDetails ? "Click to show less ▲" : "Click to see requirements ▼"}
            </Text>
          </div>
        </motion.div>
      </motion.div>

      {/* Featured Projects Section */}
      <motion.div
        className="featured-projects-section"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Title order={2} className="section-title">Explore Interactive Tools and XAI Libraries</Title>
        <Text className="body-text featured-subtitle">
          Try our research tools, interactive demos, and open-source software to advance vision science
        </Text>
        
        <div className="featured-grid">
          {/* ClickMe Card */}
          <div className="featured-card clickme-grid-card">
            <span className="featured-badge-small">Featured</span>
            <div className="featured-content">
              <Title order={3} className="featured-project-title">🎮 ClickMe</Title>
              <Text className="featured-description">
                Play our game, compete for weekly cash prizes, and help AI learn to see like humans. Featured by NSF and NBC 10.
              </Text>
              <a
                href="https://clickme.clps.brown.edu/tutorial"
                target="_blank"
                rel="noopener noreferrer"
                title="Opens in new tab"
                className="featured-button-small"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'click', {
                      'event_category': 'engagement',
                      'event_label': 'clickme_play_now_grid',
                      'value': 1
                    });
                  }
                }}
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
                Align AI models with human vision. Explore our harmonization techniques that train neural networks to see more like humans do.
              </Text>
              <a
                href="https://serre-lab.github.io/Harmonization/"
                target="_blank"
                rel="noopener noreferrer"
                title="Opens in new tab"
                className="featured-button-small"
              >
                View Demo →
              </a>
            </div>
          </div>

          {/* ObjectLENS Card */}
          <div className="featured-card">
            <div className="featured-content">
              <Title order={3} className="featured-project-title">ObjectLENS</Title>
              <Text className="featured-description">
                Explore what ImageNet models actually see. Interactive explainability tool revealing how AI vision models make object recognition decisions.
              </Text>
              <a
                href="https://serre-lab.github.io/Lens/"
                target="_blank"
                rel="noopener noreferrer"
                title="Opens in new tab"
                className="featured-button-small"
              >
                Explore Tool →
              </a>
            </div>
          </div>

          {/* LeafLENS Card */}
          <div className="featured-card">
            <div className="featured-content">
              <Title order={3} className="featured-project-title">LeafLENS</Title>
              <Text className="featured-description">
                Discover how AI identifies plant species from cleared leaves. Visualize model attention patterns and decision-making processes.
              </Text>
              <a
                href="https://serre-lab.github.io/LeafLens/"
                target="_blank"
                rel="noopener noreferrer"
                title="Opens in new tab"
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
                Open-source explainability toolbox for deep learning. Understand and interpret neural network decisions using state-of-the-art attribution methods.
              </Text>
              <a
                href="https://github.com/deel-ai/xplique"
                target="_blank"
                rel="noopener noreferrer"
                title="Opens in new tab"
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
                title="Opens in new tab"
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
        <Title order={2} className="section-title">Selected Recent Publications</Title>
        <div className="highlights-grid">
          <div className="highlight-card">
            <Text className="highlight-journal">Neuron (2025)</Text>
            <Title order={3} className="highlight-title">
              <a href="https://www.sciencedirect.com/science/article/abs/pii/S0896627325007524" target="_blank" rel="noopener noreferrer" title="Opens in new tab">
                From prediction to understanding: will AI foundation models transform brain science?
              </a>
            </Title>
            <Text className="highlight-authors">{abbreviateAuthors("T. Serre & E. Pavlick")}</Text>
          </div>

          <div className="highlight-card">
            <Text className="highlight-journal">TICS (2025)</Text>
            <Title order={3} className="highlight-title">
              <a href="https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(25)00349-3" target="_blank" rel="noopener noreferrer" title="Opens in new tab">
                Better artificial intelligence does not mean better models of biology
              </a>
            </Title>
            <Text className="highlight-authors">{abbreviateAuthors("D. Linsley, P. Feng & T. Serre")}</Text>
          </div>

          <div className="highlight-card">
            <Text className="highlight-journal">ICLR (2025)</Text>
            <Title order={3} className="highlight-title">
              <a href="https://openreview.net/forum?id=UIFAJZ22ZF" target="_blank" rel="noopener noreferrer" title="Opens in new tab">
                The 3D-PC: A benchmark for visual perspective taking in humans and machines
              </a>
            </Title>
            <Text className="highlight-authors">{abbreviateAuthors("D. Linsley et al.")}</Text>
          </div>

          <div className="highlight-card">
            <Text className="highlight-journal">TICS (2025)</Text>
            <Title order={3} className="highlight-title">
              <a href="https://www.cell.com/trends/cognitive-sciences/abstract/S1364-6613(25)00232-3" target="_blank" rel="noopener noreferrer" title="Opens in new tab">
                Feature binding in biological and artificial vision
              </a>
            </Title>
            <Text className="highlight-authors">{abbreviateAuthors("P. Roelfsema & T. Serre")}</Text>
          </div>

          <div className="highlight-card">
            <Text className="highlight-journal">{shortenJournalName("Current Biology")} (2024)</Text>
            <Title order={3} className="highlight-title">
              <a href="https://www.cell.com/current-biology/abstract/S0960-9822(24)01380-0" target="_blank" rel="noopener noreferrer" title="Opens in new tab">
                Monkeys engage in visual simulation to solve complex problems
              </a>
            </Title>
            <Text className="highlight-authors">{abbreviateAuthors("A. Ahuja et al.")}</Text>
          </div>

          <div className="highlight-card">
            <Text className="highlight-journal">{shortenJournalName("Histopathology")} (2024)</Text>
            <Title order={3} className="highlight-title">
              <a href="https://onlinelibrary.wiley.com/doi/10.1111/his.15180" target="_blank" rel="noopener noreferrer" title="Opens in new tab">
                Deceptive learning in histopathology
              </a>
            </Title>
            <Text className="highlight-authors">{abbreviateAuthors("S. Shahamatdar, D. Saeed-Vafa, D. Linsley, F. Khalil, K. Lovinger, L. Li, H. McLeod, S. Ramachandran, T. Serre")}</Text>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Link to="/publications" style={{ color: "var(--color-primary)", textDecoration: "none", fontWeight: 600 }}>
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
            Our research investigates the computational principles of biological vision—both to understand how the brain works and to build more human-like AI systems. Working at the intersection of neuroscience, cognitive science, and artificial intelligence, we tackle a fundamental question: How can we bridge the gap between biological and artificial vision to advance both brain science and AI?
          </Text>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Text>
            We are proud members of the{" "}
            <a href="https://carney.brown.edu/" target="_blank" rel="noopener noreferrer" title="Opens in new tab">Carney Institute for Brain Science</a> and the{" "}
            <a href="https://ccbs.carney.brown.edu/" target="_blank" rel="noopener noreferrer" title="Opens in new tab">Center for Computational Brain Science</a>{" "}
            at Brown! We also work in close collaboration with and leverage resources from the{" "}
            <a href="https://ccv.brown.edu/" target="_blank" rel="noopener noreferrer" title="Opens in new tab">Center for Computation and Visualization</a>.
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
            Additional support is provided by the Carney Institute for Brain Science and the Center for Computation and Visualization (via NIH S10OD036341). We gratefully acknowledge Cloud TPU hardware resources made available by Google through the TensorFlow Research Cloud (TFRC) program.
          </Text>
        </motion.div>
      </motion.div>
    </div>
  );
}
