import { Link } from "react-router-dom";
import "./Home.css";
import { PublicationEntry } from "../../components/PublicationEntry/PublicationEntry";
import { Title, Text } from "@mantine/core";
import { useState } from "react";
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

// Curated research selected by Thomas; independent of publication date.
const selectedPapers = [
  {
    "title": "Better artificial intelligence does not mean better models of biology",
    "url": "https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(25)00349-3",
    "journal": "Trends in Cognitive Sciences",
    "year": "2026",
    "authors": "D. Linsley, P. Feng & T. Serre"
  },
  {
    "title": "From prediction to understanding: Will AI foundation models transform brain science?",
    "url": "https://www.sciencedirect.com/science/article/abs/pii/S0896627325007524",
    "journal": "Neuron",
    "year": "2025",
    "authors": "T. Serre & E. Pavlick"
  },
  {
    "title": "Feature binding in biological and artificial vision",
    "url": "https://www.cell.com/trends/cognitive-sciences/abstract/S1364-6613(25)00232-3",
    "journal": "Trends in Cognitive Sciences",
    "year": "2026",
    "authors": "P. Roelfsema & T. Serre"
  },
  {
    "title": "The 3D-PC: A benchmark for visual perspective taking in humans and machines",
    "url": "https://openreview.net/forum?id=UIFAJZ22ZF",
    "journal": "International Conference on Learning Representations",
    "year": "2025",
    "authors": "D. Linsley et al."
  }
];

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
          <Text className="highlight-journal">CVPR 2026 keynote</Text>
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

      {/* Join the lab section */}
      <div
        className="home-content"
      >
        <div>
          <Title order={2} className="section-title">
            Join the lab
          </Title>
        </div>

        <div className="student-cards-container">
          <div className="student-card">
            <Title order={3} className="student-card-title">Brown students</Title>
            <Text className="student-card-text">
              Current Brown undergraduate and master’s students: we encourage you to take CPSY 1291 and/or CPSY 1950. Most Brown students in the lab have taken at least one of these courses, if not both. Tell us about your relevant coursework, prior projects, research interests, and availability in the research interest form below. Include your CV, unofficial transcript, and a code sample.
            </Text>
            {showUndergradDetails && (
              <div id="undergrad-requirements">
                <Text className="student-card-text" style={{ marginTop: "0.5rem" }}>
                  <strong>Recommended preparation:</strong>
                </Text>
                <ul className="student-requirements">
                  <li>If you have not taken CPSY 1291 or CPSY 1950, you should have rigorous quantitative coursework, including mathematics and at least some machine learning and/or deep learning.</li>
                  <li>Ideally, you will also have coursework in neuroscience, cognitive science, and/or vision.</li>
                  <li>List relevant courses and briefly describe prior course, independent, or research projects, including your own contribution and the methods or tools you used.</li>
                  <li>Tell us which research questions or projects in the lab interest you.</li>
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
              {showUndergradDetails ? "Show less ▲" : "Show recommended preparation ▼"}
            </button>
          </div>

          <div className="student-card">
            <Title order={3} className="student-card-title">PhD applicants</Title>
            <Text className="student-card-text">
              PhD applicants can apply through cognitive science, computer science, or neuroscience
              graduate programs. Use the research interest form below to introduce your background and interests; it does not replace the formal application.
            </Text>
            {showPhdDetails && (
              <div id="phd-requirements">
                <Text className="student-card-text" style={{ marginTop: "0.5rem" }}>
                  <strong>Requirements:</strong>
                </Text>
                <ul className="student-requirements">
                  <li>Strong quantitative skills including math and programming</li>
                  <li>Research experience in NeuroAI, computational neuroscience, vision, or a closely related area</li>
                  <li>An interest in connecting computation with brain function or cognition; prior vision experience is not required</li>
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
              We welcome prospective postdocs with backgrounds in NeuroAI, computational neuroscience, AI, or related fields. Prior vision experience is not required. Use the research interest form below to share your CV, strongest research contributions, a code sample, and potential start date.
            </Text>
            {showPostdocDetails && (
              <div id="postdoc-requirements">
                <Text className="student-card-text" style={{ marginTop: "0.5rem" }}>
                  <strong>Requirements:</strong>
                </Text>
                <ul className="student-requirements">
                  <li>Graduate training in NeuroAI, computational neuroscience, AI, or a related field</li>
                  <li>A strong research record, assessed through the substance of your contributions and publications in your field</li>
                  <li>Expertise relevant to our research, including neural dynamics, recurrent networks, learning, cognition, or vision</li>
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
        <Text className="body-text" mt="lg">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScyuMwWkJRcb2mr-8VzCihIHCeZ3md4p_z6weIAYeWXWqHFng/viewform" target="_blank" rel="noopener noreferrer" aria-label="Research interest form (opens in new tab)">Research interest form →</a>{" "}
          About 5–10 minutes, with questions tailored to your application.
        </Text>
      </div>

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
            Additional support is provided by the Carney Institute for Brain Science. The Center for Computation and Visualization runs the{" "}
            <a href="https://carney.brown.edu/carney-condo" target="_blank" rel="noopener noreferrer">Carney Condo<span className="sr-only"> (opens in new tab)</span></a>
            {" "}(RRID:SCR_029056), a shared GPU and CPU cluster for brain science research funded by NIH S10OD036341. We gratefully acknowledge Cloud TPU hardware resources made available by Google through the TPU Research Cloud (TRC) program.
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
          has project information and lab procedures. Use <Link to="/lab-links">Lab links</Link> for the shared Drive, onboarding, monitoring, and other lab platforms.
        </Text>
      </section>

    </div>
  );
}
