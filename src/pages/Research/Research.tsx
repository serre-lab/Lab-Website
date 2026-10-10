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
          Machine vision gives us a way to test theories of how the brain sees. A model can recognize thousands of object categories yet struggle to trace a contour, judge a relation, or imagine a scene from another viewpoint. We study these discrepancies to identify the computations that support biological vision. Our work connects recurrent neural circuits, learning from visual experience, and methods for examining what a model has learned. We also apply computer vision to behavioral and clinical research, where it can make measurements that would be impractical to collect by hand.
        </Text>

        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Human-AI Alignment in Vision</Title>
          <Text className="research-direction-text">
          Across our comparisons of vision models, agreement with human behavior and primate neural recordings can plateau or decline as recognition accuracy improves: <Ext href="https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(25)00349-3">better performance does not necessarily produce a better model of vision</Ext>. In our <Ext href="https://clickme.clps.brown.edu/tutorial">ClickMe</Ext> game, people mark the parts of an image that help them recognize an object. We use those annotations to train networks to rely on similar visual evidence, a procedure we call harmonization. This improves agreement with human vision without changing the network architecture. This gives us a way to investigate how <Ext href="https://openreview.net/forum?id=KeiQNpb7sv">visual experience and learning objectives</Ext> shape a model's behavior. In work on joint energy-based models of vision (JEM), with Victor Boutin, Jorge Chang, and Bastien Le Lan, we compare models trained to classify images with models that also learn the distribution of images themselves. We find that <Ext href="https://openreview.net/forum?id=XYmvp2YQdC">combining these discriminative and generative objectives can produce better agreement with human vision than either objective alone</Ext>.
        </Text>
          <div className="funding-badge">Funded by NSF (IIS-2402875) • <Ext href="https://www.nsf.gov/news/training-ai-see-more-humans">Featured by NSF</Ext></div>
        </div>

        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Cognitive Benchmarks for Visual Reasoning</Title>
          <Text className="research-direction-text">
          We design tasks that isolate specific demands on vision. <Ext href="https://proceedings.neurips.cc/paper/2018/hash/ec8956637a99787bd197eacd77acce5e-Abstract.html">Pathfinder</Ext> tests whether a model can follow a contour through clutter; our recurrent models succeed on conditions that challenge the tested feedforward networks. The <Ext href="https://proceedings.neurips.cc/paper_files/paper/2022/hash/c08ee8fe3d19521f3bfa4102898329fd-Abstract-Datasets_and_Benchmarks.html">Compositional Visual Relations benchmark</Ext> tests whether learned visual concepts can be combined in new ways, while <Ext href="https://openreview.net/forum?id=UIFAJZ22ZF">3D-PC</Ext> asks models to reason about how a scene appears from another viewpoint. In same–different tasks, a model must judge whether two objects match, then apply that relation to objects it has not encountered during training. Comparing people and models on these tasks helps us distinguish successful recognition from the computations needed for grouping and relational reasoning.
        </Text>
          <div className="funding-badge">Funded by ONR (N00014-24-1-2026)</div>
        </div>

        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Cortical Feedback and Recurrent Vision</Title>
          <Text className="research-direction-text">
          Visual cortex repeatedly exchanges signals through horizontal and feedback connections. We study how these interactions change a representation over time and what they contribute to perception. Our <Ext href="https://arxiv.org/abs/2610.05419">perceptual-grouping work</Ext> links recurrent network dynamics to the time course of grouping in natural scenes. Experiments on same–different judgments reveal <Ext href="https://www.eneuro.org/content/8/1/ENEURO.0267-20.2020">neural dynamics associated with relational processing</Ext>, and our <Ext href="https://www.cell.com/current-biology/fulltext/S0960-9822(24)01380-0">mental-simulation work</Ext> asks how monkeys predict where a ball will land after falling through obstacles, before seeing it move. Their behavior and eye movements are consistent with mentally tracing the ball’s path. We compare these observations with recurrent networks that learn to solve the same task. Current work on mental simulation involves Sanskriti Manoharan, David Sheinberg, Christopher Cueva, and Alekh Karkada Ashok. We also investigate whether <Ext href="https://openreview.net/forum?id=m2gVfgWYDO">synchronized neural activity helps track objects</Ext> and solve <Ext href="https://www.cell.com/trends/cognitive-sciences/abstract/S1364-6613(25)00232-3">feature binding</Ext>: keeping the color, shape, and other properties of each object associated with that object rather than mixing them with those of its neighbors. To make these mechanisms practical at larger scales, we develop <Ext href="https://proceedings.neurips.cc/paper/2020/hash/766d856ef1a6b02f93d894415e6bfa0e-Abstract.html">stable recurrent models</Ext> and convolutional state space models.
        </Text>
          <div className="funding-badge">Funded by ONR (N00014-24-1-2026) and ANITI (France 2030, ANR-23-IACL-0002)</div>
        </div>

        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Development and Embodiment</Title>
          <Text className="research-direction-text">
          Animals learn to see through experience that unfolds continuously as they move through the world. We study what models can learn from that temporal structure, and what additional information comes from acting. Ongoing work uses a newborn chick's first-person visual experience to test whether predictive learning can support grouping and object recognition without labels. Our <Ext href="https://openreview.net/forum?id=UIFAJZ22ZF">visual perspective-taking experiments</Ext> expose limitations of the tested models, motivating work on agents that learn through exploration. Related projects address computational mechanisms of depth perception with Fulvio Domini and Jorge Chang; visual perspective taking and robotics with Alekh Karkada Ashok and Madeleine Fenner; and embodiment and motion with Jorge Chang and Bastien Le Lan.
        </Text>
          <div className="funding-badge">Funded by the REPRISM MURI (ONR N00014-24-1-2603) and ONR (N00014-24-1-2026)</div>
        </div>

        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Explainable AI for Scientific Discovery</Title>
          <Text className="research-direction-text">
          A model's predictions can be accurate for the wrong reasons. In <Ext href="https://onlinelibrary.wiley.com/doi/10.1111/his.15180">histopathology</Ext>, we found that models with apparently superhuman diagnostic performance relied on image cues that correlated with the diagnosis but did not reflect the biological process the model was supposed to measure. With collaborators at ANITI, we develop methods to examine the evidence behind such predictions: <Ext href="https://openaccess.thecvf.com/content/CVPR2023/papers/Fel_CRAFT_Concept_Recursive_Activation_FacTorization_for_Explainability_CVPR_2023_paper.pdf">CRAFT</Ext> identifies concepts used by a model, and <Ext href="https://proceedings.neurips.cc/paper_files/paper/2023/hash/76d2f8e328e1081c22a77ca0fa330ca5-Abstract-Conference.html">MACO</Ext> visualizes its features. These methods are available through <Ext href="https://github.com/deel-ai/xplique">Xplique</Ext> and <Ext href="https://github.com/serre-lab/Horama">Horama</Ext>. We test explanations with people, finding that <Ext href="https://arxiv.org/abs/2605.20337">more capable vision models are not necessarily more interpretable</Ext> and comparing <Ext href="https://openreview.net/forum?id=vb57jDotru">which representations people can understand</Ext>. Applications include identifying <Ext href="https://www.pnas.org/content/113/12/3305">plant families from leaf architecture</Ext>; <Ext href="https://serre-lab.github.io/LeafLens/">LeafLENS</Ext> and <Ext href="https://serre-lab.github.io/Lens/">ObjectLENS</Ext> let visitors explore model explanations directly.
        </Text>
          <div className="funding-badge">Funded by ANITI (France 2030, ANR-23-IACL-0002), the NSF AI Research Institute on Interaction for AI Assistants (ARIA; NSF Cooperative Agreement 2433429), and NIH/NIMH (R01 MH140004 and R01 MH143695)</div>
        </div>

        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Foundation Models and Multimodal Reasoning</Title>
          <Text className="research-direction-text">
          Foundation models offer increasingly powerful predictions of behavior and brain activity. Establishing what those predictions explain requires understanding how the models learn and represent information—a distinction developed in our <Ext href="https://www.cell.com/neuron/abstract/S0896-6273(25)00752-4">perspective on prediction and understanding</Ext>. We ask how the training objective determines which information a model retains. Contrastive learning brings representations of matched inputs closer together while separating mismatched inputs; predictive learning trains a model to infer one representation from another. Our <Ext href="https://openreview.net/forum?id=37eNHfTSDD">spectral theory of multimodal losses</Ext> studies the relationship between these objectives and the representations they produce. We also study shared multimodal workspaces, failures of feature binding in vision–language models, and language-model representations that <Ext href="https://openreview.net/forum?id=Czul60ELOH">track human judgments of event plausibility</Ext>. In <Ext href="https://joshattih.github.io/episelect-site/">EpiSelect: Truthful Evidence Selection for Trustworthy AI</Ext>, Eunice Yiu, Sixuan Chen, and Joshua Attih investigate evidence selection for AI reasoning.
        </Text>
          <div className="funding-badge">Funded by the NSF AI Research Institute on Interaction for AI Assistants (ARIA; NSF Cooperative Agreement 2433429) and ONR (N00014-24-1-2026)</div>
        </div>

        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">AI for Behavioral and Clinical Science</Title>
          <Text className="research-direction-text">
          Studying behavior often requires researchers to watch and label many hours of video. Our <Ext href="https://www.nature.com/articles/ncomms1064">automated home-cage phenotyping system</Ext> learns to recognize mouse behaviors such as eating, grooming, and resting, allowing researchers to measure when these behaviors occur and how they change over time. We have extended video-based behavioral analysis to worms, zebrafish, and children. Current work uses these measurements to characterize mouse models of amyotrophic lateral sclerosis and frontotemporal dementia (ALS-FTD).
          </Text>
          <Text className="research-direction-text">
          In a separate collaboration with Taylor Burke at Massachusetts General Hospital, we develop computer-vision methods to analyze photographs of self-inflicted injuries. The models measure visible signs of injury severity. We are testing whether these measurements, combined with clinical assessments, can improve prediction of future suicide attempts. This <Ext href="https://taggs.hhs.gov/Detail/AwardDetail?arg_AwardNum=R01MH140004&amp;arg_ProgOfficeCode=134">NIH-funded research</Ext> investigates a potential source of information for clinicians assessing suicide risk.
          </Text>
          <Text className="research-direction-text">
          With David Borton's group, we develop machine learning methods to personalize electrical stimulation after spinal cord injury. Our models learn how stimulation settings relate to muscle activity, helping the team find settings that produce a desired response without testing every possible combination. This work contributes to a <Ext href="https://www.nature.com/articles/s41551-026-01627-5">neuroprosthetic interface that restored muscle control and sensory feedback in three participants with spinal cord injuries</Ext>.
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
