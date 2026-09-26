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
          Our work follows a single program: identify the neural computations that support visual perception, use the failures of machine vision to locate them, translate the circuits responsible into trainable models, and deploy those models where measurement was previously manual, brittle, or impossible. Neuroscience and AI are a two-way street in this program—better AI once gave us better models of the brain; now the brain must supply AI with its next design principles.
        </Text>

        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Human-AI Alignment in Vision</Title>
          <Text className="research-direction-text">
            We develop methods to quantify and improve the alignment between deep neural networks and human visual processing. Our <Ext href="https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(25)00349-3">recent work</Ext> reveals an alignment paradox: as vision models approach and exceed human accuracy, their alignment with human behavior and primate neural recordings plateaus and then declines—scale is not alignment. Our <Ext href="https://clickme.clps.brown.edu/tutorial">ClickMe</Ext> platform collects human visual strategies at ImageNet scale, and our harmonization procedure shows that alignment can be dramatically improved without changing network architectures, which suggests that the misalignment stems from how these models are trained rather than from their structure. This insight has led us to adopt a <Ext href="https://openreview.net/forum?id=KeiQNpb7sv">developmental psychology approach</Ext> that asks which training diets and objectives shape human vision—including work showing that <Ext href="https://openreview.net/forum?id=XYmvp2YQdC">human alignment peaks between generative and discriminative learning</Ext>. Read more about this work in the <Ext href="https://www.nsf.gov/news/training-ai-see-more-humans">NSF feature article</Ext>.
          </Text>
          <div className="funding-badge">Funded by NSF (IIS-2402875) • <Ext href="https://www.nsf.gov/news/training-ai-see-more-humans">Featured by NSF</Ext></div>
        </div>

        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Cognitive Benchmarks for AI Visual Reasoning</Title>
          <Text className="research-direction-text">
            We develop rigorous cognitive-psychology-inspired tests to evaluate fundamental gaps between human and machine vision. These benchmarks are diagnostic instruments rather than leaderboards: each failure points to a missing computation. The <Ext href="https://proceedings.neurips.cc/paper/2018/hash/ec8956637a99787bd197eacd77acce5e-Abstract.html">Pathfinder challenge</Ext> shows feedforward networks fail at contour integration that humans solve effortlessly—a test later adopted by Google DeepMind, who confirmed that even state-of-the-art transformers fail while our brain-inspired recurrent models succeed. Our <Ext href="https://proceedings.neurips.cc/paper_files/paper/2022/hash/c08ee8fe3d19521f3bfa4102898329fd-Abstract-Datasets_and_Benchmarks.html">compositional reasoning benchmark</Ext> reveals AI's inability to flexibly combine visual concepts, while the <Ext href="https://openreview.net/forum?id=UIFAJZ22ZF">3D-PC benchmark</Ext> demonstrates failure at visual perspective-taking—a key signature of theory of mind. Even seemingly simple same-different judgments expose how neural networks struggle with basic visual relationships—work that also helps identify brain mechanisms underlying relational processing.
          </Text>
          <div className="funding-badge">Funded by ONR (N00014-24-1-2026)</div>
        </div>

        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Cortical Feedback and Recurrent Vision</Title>
          <Text className="research-direction-text">
            We are reverse-engineering how feedback and horizontal connections in the brain enable complex visual reasoning and mental simulation. The cortex is shallow—a handful of processing stages—and builds effective depth through recurrence rather than by stacking layers. Our cognitive benchmarks reveal systematic failures of feedforward networks—from contour integration to relational judgments—suggesting precisely which computations require recurrent processing. These insights guide our experimental design: our neurophysiology work shows that same-different tasks that strain feedforward AI engage <Ext href="https://www.eneuro.org/content/8/1/ENEURO.0267-20.2020">distinct neural dynamics</Ext> in primates, while our <Ext href="https://www.cell.com/current-biology/fulltext/S0960-9822(24)01380-0">recent studies</Ext> reveal that both monkeys and recurrent neural networks use internal "mental simulations" to solve challenging visual tasks. We also study how <Ext href="https://openreview.net/forum?id=m2gVfgWYDO">neural synchrony</Ext> supports <Ext href="https://www.cell.com/trends/cognitive-sciences/abstract/S1364-6613(25)00232-3">feature binding</Ext>. On the engineering side, we are scaling these circuits: our <Ext href="https://proceedings.neurips.cc/paper/2020/hash/766d856ef1a6b02f93d894415e6bfa0e-Abstract.html">stable recurrent vision models</Ext> and, more recently, convolutional state space models turn biologically-inspired recurrence into a parallelizable, compute-efficient alternative to attention.
          </Text>
          <div className="funding-badge">Funded by ONR (N00014-24-1-2026) and ANITI (France 2030, ANR-23-IACL-0002)</div>
        </div>

        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Learning From Dynamics: Development and Embodiment</Title>
          <Text className="research-direction-text">
            If the training diet, rather than the architecture, drives misalignment, then we should study the diet. Newborn animals learn to see from limited, self-generated, temporally structured experience, not from millions of labeled images. We model this developmental process—for instance, showing how predictive learning from a newborn chick's first-person visual experience can give rise to perceptual grouping and object recognition without labels. Yet passive video is not enough: even models trained to be perceptually aligned remain near chance on <Ext href="https://openreview.net/forum?id=UIFAJZ22ZF">visual perspective-taking</Ext>. We are therefore building embodied agents that learn world models through active exploration in simulation, and asking how an agent can flexibly re-represent a problem in order to solve it.
          </Text>
          <div className="funding-badge">Funded by the REPRISM MURI (ONR N00014-24-1-2603) and ONR (N00014-24-1-2026)</div>
        </div>

        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Explainable AI for Scientific Discovery</Title>
          <Text className="research-direction-text">
            In collaboration with the Artificial and Natural Intelligence Toulouse Institute, we're creating tools to understand and interpret deep learning models. Our <Ext href="https://openaccess.thecvf.com/content/CVPR2023/papers/Fel_CRAFT_Concept_Recursive_Activation_FacTorization_for_Explainability_CVPR_2023_paper.pdf">CRAFT framework</Ext> and <Ext href="https://proceedings.neurips.cc/paper_files/paper/2023/hash/76d2f8e328e1081c22a77ca0fa330ca5-Abstract-Conference.html">MACO approach</Ext> help researchers peek inside the "black box" of AI. CRAFT provides concept-based explanations that reveal both "what" and "where" models look, while MACO unlocks feature visualization for state-of-the-art deep networks. These methods are implemented in our open-source <Ext href="https://github.com/deel-ai/xplique">Xplique toolbox</Ext>, making explainability accessible to the broader research community. Critically, our explainability tools reveal when AI learns deceptive strategies—as we demonstrated in <Ext href="https://onlinelibrary.wiley.com/doi/10.1111/his.15180">histopathology</Ext>, where models claiming superhuman cancer diagnosis actually relied on spurious correlations rather than meaningful biological features. We also test explanations with people: our psychophysics shows that <Ext href="https://arxiv.org/abs/2605.20337">more capable vision foundation models are not more interpretable</Ext>, and helps identify <Ext href="https://openreview.net/forum?id=vb57jDotru">which representational basis humans find most interpretable</Ext>. See these tools in action: <Ext href="https://serre-lab.github.io/Lens/">ObjectLENS explains what ImageNet models really see</Ext>, and <Ext href="https://serre-lab.github.io/LeafLens/">LeafLENS reveals how AI identifies plant species from cleared leaves</Ext>.
          </Text>
          <div className="funding-badge">Funded by ANITI (France 2030, ANR-23-IACL-0002), the NSF AI Research Institute on Interaction for AI Assistants (ARIA; NSF Cooperative Agreement 2433429), and NIH/NIMH (R01 MH140004 and R01 MH143695)</div>
        </div>

        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Foundation Models and Multimodal Reasoning</Title>
          <Text className="research-direction-text">
            We ask what AI foundation models are good for as scientific instruments, and under what conditions a model that predicts the brain also explains it—an argument laid out in our <Ext href="https://www.cell.com/neuron/abstract/S0896-6273(25)00752-4">perspective on moving from prediction to understanding</Ext> in brain science. Answering this question requires understanding the mechanisms that these models learn. We have developed a <Ext href="https://openreview.net/forum?id=37eNHfTSDD">unified spectral theory of multimodal losses</Ext> that explains how contrastive and predictive objectives shape learned representations, and we study what shared multimodal workspaces learn and where vision-language models break down on visual reasoning. We also use language model representations to probe human cognition, showing that they <Ext href="https://openreview.net/forum?id=Czul60ELOH">reflect human judgments of event plausibility</Ext>.
          </Text>
          <div className="funding-badge">Funded by the NSF AI Research Institute on Interaction for AI Assistants (ARIA; NSF Cooperative Agreement 2433429) and ONR (N00014-24-1-2026)</div>
        </div>

        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">AI for Behavioral and Clinical Science</Title>
          <Text className="research-direction-text">
            The same methods that let us model vision also let us automate measurements that were previously hand-scored. Since our <Ext href="https://www.nature.com/articles/ncomms1064">automated home-cage phenotyping system for mice</Ext>, we have developed computer vision tools for behavioral analysis in rodents, worms, zebrafish, and children, and we are now applying them to mouse models of ALS-FTD and to the clinical assessment of suicide risk in adolescents. The circuit-modeling approach we use for vision also extends to neurotechnology: with David Borton's group, we develop neural network models of spinal circuits for neuromodulation interfaces that <Ext href="https://www.nature.com/articles/s41551-026-01627-5">restore sensorimotor function after spinal cord injury</Ext>. Other collaborations apply computer vision to histopathology and to paleobotany, where our models <Ext href="https://www.pnas.org/content/113/12/3305">identify plant families from leaf architecture</Ext>.
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
