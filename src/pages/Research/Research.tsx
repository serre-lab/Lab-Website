import type { ReactNode } from "react";
import { Text, Title, Anchor, Accordion } from "@mantine/core";
import "./Research.css";
import { HeroBanner } from "../../components/HeroBanner/HeroBanner";
import researchData from "../../data/research.json";

// External link styled for research blurbs; opens in a new tab.
function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Anchor href={href} target="_blank" rel="noopener noreferrer" title="Opens in new tab" className="research-link">
      {children}
    </Anchor>
  );
}

export function Research() {
  return (
    <>
      <HeroBanner 
        title="Research" 
        subtitle="Advancing computational neuroscience and NeuroAI through research in vision and brain-inspired artificial intelligence"
        backgroundImage="/metcalf.webp"
      />
      <div className="research-container">
        <div className="titleDesc-container">
        <Title order={2} className="section-title" style={{ marginTop: 0 }}>Research Directions</Title>
        <Text className="research-direction-text">
          We study the computations that underlie biological vision and use them to build more human-like AI. Where machine vision fails, we look for the neural mechanisms it is missing; we turn those mechanisms into trainable models; and we apply the models to problems where measurement was previously manual or impossible. The exchange runs both ways: AI once gave neuroscience its best models of vision, and neuroscience is now a source of design principles for AI.
        </Text>

        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Human-AI Alignment in Vision</Title>
          <Text className="research-direction-text">
            As vision models approach and surpass human accuracy, their agreement with human behavior and primate neural recordings levels off and then declines: <Ext href="https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(25)00349-3">scale does not buy alignment</Ext>. Using human data from our <Ext href="https://clickme.clps.brown.edu/tutorial">ClickMe</Ext> game, our harmonization procedure substantially improves alignment without changing network architectures. This points to how models are trained, rather than how they are built, as the source of the gap, and motivates our <Ext href="https://openreview.net/forum?id=KeiQNpb7sv">developmental approach</Ext>: which training data and objectives produce human-like vision? For example, we find that <Ext href="https://openreview.net/forum?id=XYmvp2YQdC">alignment peaks between generative and discriminative learning</Ext>. See the <Ext href="https://www.nsf.gov/news/training-ai-see-more-humans">NSF feature article</Ext> for an overview.
          </Text>
          <div className="funding-badge">Funded by NSF (IIS-2402875) • <Ext href="https://www.nsf.gov/news/training-ai-see-more-humans">Featured by NSF</Ext></div>
        </div>

        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Cognitive Benchmarks for Visual Reasoning</Title>
          <Text className="research-direction-text">
            We borrow tasks from cognitive psychology to find where machine vision breaks down, and treat each failure as a clue to a missing computation. In the <Ext href="https://proceedings.neurips.cc/paper/2018/hash/ec8956637a99787bd197eacd77acce5e-Abstract.html">Pathfinder challenge</Ext>, feedforward networks fail at a contour-integration task that humans find easy; researchers at Google later confirmed that transformers fail too, while our brain-inspired recurrent models succeed. Our <Ext href="https://proceedings.neurips.cc/paper_files/paper/2022/hash/c08ee8fe3d19521f3bfa4102898329fd-Abstract-Datasets_and_Benchmarks.html">compositional reasoning benchmark</Ext> shows that models struggle to combine visual concepts flexibly, and <Ext href="https://openreview.net/forum?id=UIFAJZ22ZF">3D-PC</Ext> shows that they fail at visual perspective taking. Even simple same–different judgments remain hard for neural networks, and they help us identify the brain mechanisms of relational processing.
          </Text>
          <div className="funding-badge">Funded by ONR (N00014-24-1-2026)</div>
        </div>

        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Cortical Feedback and Recurrent Vision</Title>
          <Text className="research-direction-text">
            The cortex has only a handful of processing stages; it gains depth over time through feedback and horizontal connections rather than by stacking layers. We study what these recurrent circuits compute. In primates, same–different tasks that challenge feedforward networks evoke <Ext href="https://www.eneuro.org/content/8/1/ENEURO.0267-20.2020">distinct neural dynamics</Ext>, and both monkeys and recurrent networks solve hard visual problems through <Ext href="https://www.cell.com/current-biology/fulltext/S0960-9822(24)01380-0">mental simulation</Ext>. We also study how <Ext href="https://openreview.net/forum?id=m2gVfgWYDO">neural synchrony</Ext> supports <Ext href="https://www.cell.com/trends/cognitive-sciences/abstract/S1364-6613(25)00232-3">feature binding</Ext>. To scale these circuits, we developed <Ext href="https://proceedings.neurips.cc/paper/2020/hash/766d856ef1a6b02f93d894415e6bfa0e-Abstract.html">stable recurrent vision models</Ext> and, more recently, convolutional state space models, which make recurrence parallelizable and a compute-efficient alternative to attention.
          </Text>
          <div className="funding-badge">Funded by ONR (N00014-24-1-2026) and ANITI (France 2030, ANR-23-IACL-0002)</div>
        </div>

        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Development and Embodiment</Title>
          <Text className="research-direction-text">
            If training, rather than architecture, limits alignment, then the data and objectives matter. Newborn animals learn to see from limited, self-generated, temporally continuous experience, not from millions of labeled images. We model this process: for example, predictive learning from a newborn chick's first-person visual experience gives rise to perceptual grouping and object recognition without labels. Passive video has limits, however, and models trained on it still perform near chance on <Ext href="https://openreview.net/forum?id=UIFAJZ22ZF">visual perspective taking</Ext>. We are therefore building embodied agents that learn world models by exploring simulated environments, and studying how an agent can re-represent a problem in order to solve it.
          </Text>
          <div className="funding-badge">Funded by the REPRISM MURI (ONR N00014-24-1-2603) and ONR (N00014-24-1-2026)</div>
        </div>

        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Explainable AI for Scientific Discovery</Title>
          <Text className="research-direction-text">
            With the Artificial and Natural Intelligence Toulouse Institute (ANITI), we develop methods that explain what deep networks have learned. <Ext href="https://openaccess.thecvf.com/content/CVPR2023/papers/Fel_CRAFT_Concept_Recursive_Activation_FacTorization_for_Explainability_CVPR_2023_paper.pdf">CRAFT</Ext> identifies the concepts a model relies on and where it finds them in an image, and <Ext href="https://proceedings.neurips.cc/paper_files/paper/2023/hash/76d2f8e328e1081c22a77ca0fa330ca5-Abstract-Conference.html">MACO</Ext> makes feature visualization work for modern architectures; both are available in our open-source <Ext href="https://github.com/deel-ai/xplique">Xplique toolbox</Ext>. These tools can expose shortcuts: in <Ext href="https://onlinelibrary.wiley.com/doi/10.1111/his.15180">histopathology</Ext>, models with apparently superhuman cancer diagnosis turned out to rely on spurious correlations. They can also reveal what a model has learned: in paleobotany, our models <Ext href="https://www.pnas.org/content/113/12/3305">identify plant families from leaf architecture</Ext>, and their explanations point to the leaf features that distinguish those families. We also test explanations with people, finding that <Ext href="https://arxiv.org/abs/2605.20337">more capable vision foundation models are not more interpretable</Ext> and asking <Ext href="https://openreview.net/forum?id=vb57jDotru">which representations humans find easiest to interpret</Ext>. Try <Ext href="https://serre-lab.github.io/Lens/">ObjectLENS</Ext>, which shows what ImageNet models see, and <Ext href="https://serre-lab.github.io/LeafLens/">LeafLENS</Ext>, which shows how models classify plants from cleared leaves.
          </Text>
          <div className="funding-badge">Funded by ANITI (France 2030, ANR-23-IACL-0002), the NSF AI Research Institute on Interaction for AI Assistants (ARIA; NSF Cooperative Agreement 2433429), and NIH/NIMH (R01 MH140004 and R01 MH143695)</div>
        </div>

        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Foundation Models and Multimodal Reasoning</Title>
          <Text className="research-direction-text">
            We ask when AI foundation models can serve as scientific instruments, and when a model that predicts brain data also explains it—questions we take up in a <Ext href="https://www.cell.com/neuron/abstract/S0896-6273(25)00752-4">perspective on moving from prediction to understanding</Ext>. Answering them requires knowing what these models learn. We developed a <Ext href="https://openreview.net/forum?id=37eNHfTSDD">unified spectral theory of multimodal losses</Ext> that explains how contrastive and predictive objectives shape learned representations, and we study what shared multimodal workspaces learn and where vision–language models fail at visual reasoning. We also use language models to probe human cognition: their internal representations <Ext href="https://openreview.net/forum?id=Czul60ELOH">track human judgments of event plausibility</Ext>.
          </Text>
          <div className="funding-badge">Funded by the NSF AI Research Institute on Interaction for AI Assistants (ARIA; NSF Cooperative Agreement 2433429) and ONR (N00014-24-1-2026)</div>
        </div>

        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">AI for Behavioral and Clinical Science</Title>
          <Text className="research-direction-text">
            Computer vision can automate behavioral measurements that are otherwise scored by hand. Building on our <Ext href="https://www.nature.com/articles/ncomms1064">automated home-cage phenotyping system for mice</Ext>, we have developed tools that analyze the behavior of rodents, worms, zebrafish, and children, and we now apply them to mouse models of ALS-FTD and to assessing suicide risk in adolescents. Our circuit-modeling approach also extends to neurotechnology: with David Borton's group, we model spinal circuits for neuromodulation interfaces that <Ext href="https://www.nature.com/articles/s41551-026-01627-5">restore sensorimotor function after spinal cord injury</Ext>. Other collaborations apply computer vision to histopathology.
          </Text>
          <div className="funding-badge">Funded by NIH/NIMH (R01 MH140004, R01 MH143695, and T32 MH126388)</div>
        </div>

        {/* Grants Section */}
        <div className="grants-section" style={{ marginTop: "3rem" }}>
          <Title order={2} className="section-title">Research Funding</Title>
          
          {/* Current Grants */}
          <div style={{ marginTop: "2rem" }}>
            <Title order={3} style={{ marginBottom: "1rem", color: "var(--color-primary)" }}>Current Grants</Title>
            <Accordion variant="separated">
              {researchData.currentGrants.map((grant, index) => (
                <Accordion.Item key={index} value={`current-${index}`}>
                  <Accordion.Control>
                    <div>
                      <Text fw={600} size="md">{grant.title}</Text>
                      <Text size="sm" style={{ color: 'var(--color-text-secondary)' }}>
                        {grant.agency} • {grant.grantNumber} • {grant.years}
                      </Text>
                    </div>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm" style={{ marginBottom: "0.5rem" }}>
                      <strong>Role:</strong> {grant.role}
                    </Text>
                    <Text size="sm">{grant.description}</Text>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>

          {/* Training Grants */}
          <div style={{ marginTop: "2rem" }}>
            <Title order={3} style={{ marginBottom: "1rem", color: "var(--color-primary)" }}>Training Grants</Title>
            <Accordion variant="separated">
              {researchData.trainingGrants.map((grant, index) => (
                <Accordion.Item key={index} value={`training-${index}`}>
                  <Accordion.Control>
                    <div>
                      <Text fw={600} size="md">{grant.title}</Text>
                      <Text size="sm" style={{ color: 'var(--color-text-secondary)' }}>
                        {grant.agency} • {grant.grantNumber} • {grant.years}
                      </Text>
                    </div>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm" style={{ marginBottom: "0.5rem" }}>
                      <strong>Role:</strong> {grant.role}
                    </Text>
                    <Text size="sm">{grant.description}</Text>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>

          {/* Completed Grants */}
          <div style={{ marginTop: "2rem", marginBottom: "3rem" }}>
            <Title order={3} style={{ marginBottom: "1rem", color: "var(--color-primary)" }}>Completed Grants</Title>
            <Accordion variant="separated">
              {researchData.completedGrants.map((grant, index) => (
                <Accordion.Item key={index} value={`completed-${index}`}>
                  <Accordion.Control>
                    <div>
                      <Text fw={600} size="md">{grant.title}</Text>
                      <Text size="sm" style={{ color: 'var(--color-text-secondary)' }}>
                        {grant.agency} {grant.grantNumber ? `• ${grant.grantNumber}` : ''} • {grant.years}
                      </Text>
                    </div>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm" style={{ marginBottom: "0.5rem" }}>
                      <strong>Role:</strong> {grant.role}
                    </Text>
                    <Text size="sm">{grant.description}</Text>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
