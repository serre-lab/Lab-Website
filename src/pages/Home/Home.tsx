import { Link } from "react-router-dom";
import "./Home.css";
import { PublicationEntry } from "../../components/PublicationEntry/PublicationEntry";
import { Title, Text } from "@mantine/core";
import { useState } from "react";
import publicationsData from "../../data/publications_by_year.json";
import { HeroBanner } from "../../components/HeroBanner/HeroBanner";

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

// Recent papers and the curated selection are maintained separately.
const selectedPapers = [
  {
    "title": "From prediction to understanding: will AI foundation models transform brain science?",
    "url": "https://www.sciencedirect.com/science/article/abs/pii/S0896627325007524",
    "journal": "Neuron",
    "year": "2025",
    "authors": "T. Serre & E. Pavlick"
  },
  {
    "title": "Better artificial intelligence does not mean better models of biology",
    "url": "https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(25)00349-3",
    "journal": "Trends in Cognitive Sciences",
    "year": "2026",
    "authors": "D. Linsley, P. Feng & T. Serre"
  },
  {
    "title": "The 3D-PC: A benchmark for visual perspective taking in humans and machines",
    "url": "https://openreview.net/forum?id=UIFAJZ22ZF",
    "journal": "International Conference on Learning Representations",
    "year": "2025",
    "authors": "D. Linsley et al."
  },
  {
    "title": "Feature binding in biological and artificial vision",
    "url": "https://www.cell.com/trends/cognitive-sciences/abstract/S1364-6613(25)00232-3",
    "journal": "Trends in Cognitive Sciences",
    "year": "2026",
    "authors": "P. Roelfsema & T. Serre"
  },
  {
    "title": "Monkeys engage in visual simulation to solve complex problems",
    "url": "https://www.cell.com/current-biology/abstract/S0960-9822(24)01380-0",
    "journal": "Current Biology",
    "year": "2024",
    "authors": "A. Ahuja et al."
  },
  {
    "title": "Perilesional neuromodulation replaces lost sensorimotor function in persons with spinal cord injury",
    "url": "https://www.nature.com/articles/s41551-026-01627-5",
    "journal": "Nature Biomedical Engineering",
    "year": "2026",
    "authors": "J.S. Calvert, S.R. Parker, L.N. Govindarajan, R. Darie, E. Shaaya, R. Solinsky, L.M. Del Valle, P. Miranda, J. Jang, E. Tiwari, S. Syed, R.M. Villalobos, L.M. Aguiar, J.A. Taylor, H. Tang, S. McPherson, W. Xue, A.G. Carayannopoulos, A.A. Oyelese, Z.L. Gokaslan, A.K. Bansal, L.J. Resnik, T. Serre, J.S. Fridley & D.A. Borton"
  }
];
const recentPaperUrls = [
  "https://arxiv.org/abs/2610.05419",
  "https://openreview.net/forum?id=XYmvp2YQdC",
  "https://openreview.net/forum?id=37eNHfTSDD",
  "https://arxiv.org/abs/2606.25234",
  "https://arxiv.org/abs/2606.09653",
  "https://arxiv.org/abs/2605.20337",
];
const publicationRecords = Object.entries(publicationsData).flatMap(([year, papers]) =>
  papers.map((paper) => ({ ...paper, year }))
);
const recentPapers = recentPaperUrls
  .map((url) => publicationRecords.find((paper) => paper.url === url))
  .filter((paper) => paper !== undefined);

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
            <Text className="home-hero-line">Nancy G. Zimmerman Center for Computational Brain Science</Text>
            <Text className="home-hero-line">Robert J. and Nancy D. Carney Institute for Brain Science</Text>
            <Text className="home-hero-line">Cognitive & Psychological Sciences and Computer Science Depts</Text>
            <Text className="home-hero-line">Brown University</Text>
          </div>
        )}
        backgroundImage="/metcalf.webp"
      />

      {/* Featured talk Section */}
      <div
        className="recent-highlights-section"
      >
        <Title order={2} className="section-title">Featured talk</Title>
        <div className="highlight-card featured-talk-card">
          <Text className="highlight-journal">CVPR 2026 Keynote</Text>
          <Title order={3} className="highlight-title">
            <a href="https://www.youtube.com/watch?v=tjn2MW0d8K8&t=7185s" target="_blank" rel="noopener noreferrer">
              Scaling laws vs. neural laws: Toward more natural artificial vision
            <span className="sr-only"> (opens in new tab)</span></a>
          </Title>
          <Text className="featured-talk-text">
            Thomas Serre's keynote at CVPR 2026 gives an overview of the lab's current work: as vision models scale, they match human accuracy while drifting away from human vision, and brain-inspired learning and recurrent architectures offer a path back.
          </Text>
          <a
            href="https://www.youtube.com/watch?v=tjn2MW0d8K8&t=7185s"
            target="_blank"
            rel="noopener noreferrer"
            className="featured-button-small"
            aria-label="Watch on YouTube →: CVPR 2026 keynote (opens in new tab)"
          >
            Watch on YouTube →
          </a>
        </div>
      </div>

      {/* Prospective students Section */}
      <div
        className="home-content"
      >
        <div>
          <Title order={2} className="section-title">
            Prospective students
          </Title>
        </div>

        <div className="student-cards-container">
          <div className="student-card">
            <Title order={3} className="student-card-title">Undergraduate & MSc</Title>
            <Text className="student-card-text">
              Brown undergraduate and MSc students can begin by joining the lab’s Slack workspace, attending group meetings, and exploring project discussions. Contact Thomas Serre for onboarding information.
            </Text>
            {showUndergradDetails && (
              <div id="undergrad-requirements">
                <Text className="student-card-text" style={{ marginTop: "0.5rem" }}>
                  <strong>Requirements:</strong>
                </Text>
                <ul className="student-requirements">
                  <li>CS intro sequence</li>
                  <li>At least one ML, vision, or deep learning course</li>
                  <li>Strongly encouraged: CPSY 1291 or CPSY 1950 with Thomas Serre</li>
                  <li>Familiarity with our research and ability to articulate a specific project interest</li>
                </ul>
              </div>
            )}
            <button
              type="button"
              className="student-card-expand"
              aria-expanded={showUndergradDetails}
              aria-controls="undergrad-requirements"
              onClick={(e) => { e.stopPropagation(); setShowUndergradDetails(!showUndergradDetails); }}
            >
              {showUndergradDetails ? "Show less ▲" : "Show requirements ▼"}
            </button>
          </div>

          <div className="student-card">
            <Title order={3} className="student-card-title">PhD students</Title>
            <Text className="student-card-text">
              PhD applicants can apply through cognitive science, computer science, or neuroscience
              graduate programs.
            </Text>
            {showPhdDetails && (
              <div id="phd-requirements">
                <Text className="student-card-text" style={{ marginTop: "0.5rem" }}>
                  <strong>Requirements:</strong>
                </Text>
                <ul className="student-requirements">
                  <li>Strong quantitative skills including math and programming</li>
                  <li>Prior work in vision (required)</li>
                  <li>Prior experience in brain and cognitive science (a plus but not required)</li>
                </ul>
                <Text className="student-card-text" style={{ marginTop: "0.5rem" }}>
                  Due to the large volume of applicants, Thomas Serre can only meet with applicants after they have been invited for an interview.
                </Text>
              </div>
            )}
            <button
              type="button"
              className="student-card-expand"
              aria-expanded={showPhdDetails}
              aria-controls="phd-requirements"
              onClick={(e) => { e.stopPropagation(); setShowPhdDetails(!showPhdDetails); }}
            >
              {showPhdDetails ? "Show less ▲" : "Show requirements ▼"}
            </button>
          </div>

          <div className="student-card">
            <Title order={3} className="student-card-title">Postdocs</Title>
            <Text className="student-card-text">
              Prospective postdocs should email Thomas Serre directly with their CV, research statement, and references.
            </Text>
            {showPostdocDetails && (
              <div id="postdoc-requirements">
                <Text className="student-card-text" style={{ marginTop: "0.5rem" }}>
                  <strong>Requirements:</strong>
                </Text>
                <ul className="student-requirements">
                  <li>Graduate training in computational neuroscience or AI</li>
                  <li>Strong track record publishing at top venues including NeurIPS, ICML, ICLR, and/or CVPR</li>
                </ul>
              </div>
            )}
            <button
              type="button"
              className="student-card-expand"
              aria-expanded={showPostdocDetails}
              aria-controls="postdoc-requirements"
              onClick={(e) => { e.stopPropagation(); setShowPostdocDetails(!showPostdocDetails); }}
            >
              {showPostdocDetails ? "Show less ▲" : "Show requirements ▼"}
            </button>
          </div>
        </div>
      </div>

      {/* Featured Projects Section */}
      <div
        className="featured-projects-section"
      >
        <Title order={2} className="section-title">Tools and libraries</Title>

        <div className="featured-grid">
          {/* ClickMe Card */}
          <div className="featured-card">
            <div className="featured-content">
              <Title order={3} className="featured-project-title">ClickMe</Title>
              <Text className="featured-description">
                Mark the image regions you use to recognize objects. Your annotations help train vision models to use similar visual evidence.
              </Text>
              <a
                href="https://clickme.clps.brown.edu/tutorial" aria-label="Play now →: ClickMe (opens in new tab)"
                target="_blank"
                rel="noopener noreferrer"

                className="featured-button-small"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as Window & { gtag?: (event: string, action: string, parameters: Record<string, string | number>) => void }).gtag) {
                    (window as Window & { gtag?: (event: string, action: string, parameters: Record<string, string | number>) => void }).gtag?.('event', 'click', {
                      'event_category': 'engagement',
                      'event_label': 'clickme_play_now_grid',
                      'value': 1
                    });
                  }
                }}
              >
                Play now →
              </a>
            </div>
          </div>

          {/* Harmonization Card */}
          <div className="featured-card">
            <div className="featured-content">
              <Title order={3} className="featured-project-title">Harmonization</Title>
              <Text className="featured-description">
                Training methods that align a model’s visual evidence with human annotations from ClickMe.
              </Text>
              <a
                href="https://serre-lab.github.io/Harmonization/" aria-label="View demo →: Harmonization (opens in new tab)"
                target="_blank"
                rel="noopener noreferrer"

                className="featured-button-small"
              >
                View demo →
              </a>
            </div>
          </div>

          {/* ObjectLENS Card */}
          <div className="featured-card">
            <div className="featured-content">
              <Title order={3} className="featured-project-title">ObjectLENS</Title>
              <Text className="featured-description">
                Explore the visual features and image regions that contribute to an ImageNet model’s predictions.
              </Text>
              <a
                href="https://serre-lab.github.io/Lens/" aria-label="Explore tool →: ObjectLENS (opens in new tab)"
                target="_blank"
                rel="noopener noreferrer"

                className="featured-button-small"
              >
                Explore tool →
              </a>
            </div>
          </div>

          {/* LeafLENS Card */}
          <div className="featured-card">
            <div className="featured-content">
              <Title order={3} className="featured-project-title">LeafLENS</Title>
              <Text className="featured-description">
                Explore how vision models identify plant families from leaf structure and which features inform their predictions.
              </Text>
              <a
                href="https://serre-lab.github.io/LeafLens/" aria-label="Explore tool →: LeafLENS (opens in new tab)"
                target="_blank"
                rel="noopener noreferrer"

                className="featured-button-small"
              >
                Explore tool →
              </a>
            </div>
          </div>

          {/* Xplique Card */}
          <div className="featured-card">
            <div className="featured-content">
              <Title order={3} className="featured-project-title">Xplique</Title>
              <Text className="featured-description">
                An open-source toolbox for explaining deep learning predictions through feature attribution and concept analysis.
              </Text>
              <a
                href="https://github.com/deel-ai/xplique" aria-label="View on GitHub →: Xplique (opens in new tab)"
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
                Python/PyTorch library for feature visualization with MACO, Fourier methods, and feature accentuation.
              </Text>
              <a
                href="https://github.com/serre-lab/Horama" aria-label="View on GitHub →: Horama (opens in new tab)"
                target="_blank"
                rel="noopener noreferrer"

                className="featured-button-small"
              >
                View on GitHub →
              </a>
            </div>
          </div>
        </div>
      </div>

      <section className="recent-papers-section" aria-labelledby="recent-papers-heading">
        <Title order={2} id="recent-papers-heading" className="section-title">Recent papers and preprints</Title>
        <ul className="publication-list home-publication-list">
          {recentPapers.map((paper) => (
            <li key={paper.url} className="publication-item">
              <PublicationEntry {...paper} authors={abbreviateAuthors(paper.authors)} journal={paper.journal === "arXiv" ? "arXiv preprint" : paper.journal} year={paper.journal === "arXiv" ? "2026" : paper.year} />
            </li>
          ))}
        </ul>
      </section>

      {/* Selected Publications Section */}
      <div
        className="recent-highlights-section"
      >
        <Title order={2} className="section-title">Selected publications</Title>
        <ul className="publication-list home-publication-list selected-publications-list">
          {selectedPapers.map((paper) => (
            <li key={paper.url} className="publication-item">
              <PublicationEntry {...paper} authors={abbreviateAuthors(paper.authors)} />
            </li>
          ))}
        </ul>
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Link to="/publications" className="body-text" style={{ color: "var(--color-primary)", textDecoration: "none", fontWeight: 600 }}>
            View all publications →
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="home-content"
      >
        <div>
          <Text>
            We are based in the{" "}
            <a href="https://carney.brown.edu/" target="_blank" rel="noopener noreferrer">Carney Institute for Brain Science<span className="sr-only"> (opens in new tab)</span></a> and the{" "}
            <a href="https://ccbs.carney.brown.edu/" target="_blank" rel="noopener noreferrer">Nancy G. Zimmerman Center for Computational Brain Science<span className="sr-only"> (opens in new tab)</span></a>{" "}
            at Brown University, and collaborate with the{" "}
            <a href="https://ccv.brown.edu/" target="_blank" rel="noopener noreferrer">Center for Computation and Visualization<span className="sr-only"> (opens in new tab)</span></a>.
          </Text>
        </div>

        {/* Funding Section */}
        <div>
          <Title order={2} className="section-title" style={{ marginTop: "2rem" }}>
            Funding
          </Title>
        </div>
        <div>
          <Text>
            Our work is currently supported by ONR (N00014-24-1-2026, N00014-22-1-2795, and REPRISM MURI N00014-24-1-2603), NSF (IIS-2402875), NIH/NIMH (R01 MH140004, R01 MH143695, and T32 MH126388), DOE (DE-SC0023191), the NSF AI Research Institute on Interaction for AI Assistants (ARIA), supported by the U.S. National Science Foundation (NSF) under Cooperative Agreement 2433429, and the Artificial and Natural Intelligence Toulouse Institute (ANITI), funded by the France 2030 program (ANR-23-IACL-0002).
            </Text>
          <Text mt="md">
            Additional support is provided by the Carney Institute for Brain Science and the Center for Computation and Visualization (via NIH S10OD036341). We gratefully acknowledge Cloud TPU hardware resources made available by Google through the TPU Research Cloud (TRC) program.
          </Text>
        </div>
      </div>

      <section className="recent-papers-section" aria-labelledby="lab-members-heading">
        <Title order={2} id="lab-members-heading" className="section-title">For lab members</Title>
        <Text className="body-text">
          The{" "}
          <a href="https://psychic-adventure-y8eo2zo.pages.github.io/" target="_blank" rel="noopener noreferrer" aria-label="Lab handbook (opens in new tab)">
            lab handbook
          </a>{" "}
          has project information, lab procedures, and shared resources for current members.
        </Text>
      </section>

    </div>
  );
}
