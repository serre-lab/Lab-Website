import type { ReactNode } from "react";
import { Text, Title, Anchor, Accordion } from "@mantine/core";
import "./Research.css";
import { HeroBanner } from "../../components/HeroBanner/HeroBanner";
import researchData from "../../data/research.json";

// External link styled for research blurbs; opens in a new tab.
function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Anchor href={href} target="_blank" rel="noopener noreferrer" title="Opens in new tab" aria-label={`${children} (opens in new tab)`} className="research-link">
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
        <Title order={2} className="section-title" style={{ marginTop: 0 }}>Research directions</Title>
        <Text className="research-direction-text">We study the computations that underlie biological vision and use them to build more human-like AI. Experiments constrain our models, models generate hypotheses, and new measurement tools let us test those hypotheses in richer settings.</Text>
        <figure className="research-methods body-text">
          <div className="research-methods-grid">
            <div><strong>Experiments</strong><span>Measure perception, behavior, and neural activity.</span></div>
            <div><strong>Computational models</strong><span>Test mechanisms of learning, recurrence, and reasoning.</span></div>
            <div><strong>Scientific measurement</strong><span>Use benchmarks and explainability to evaluate what models capture.</span></div>
          </div>
          <figcaption>Each method informs the others: observations constrain models, and model predictions guide new experiments.</figcaption>
        </figure>

        <section className="research-direction-card" aria-labelledby="theme-0">
          <Title order={3} id="theme-0" className="research-direction-title">Human–AI alignment in vision</Title>
          <Text className="research-question" fw={600}>What makes a model see more like a person?</Text>
          <Text className="research-direction-text">Across the models we study, gains in recognition accuracy do not reliably translate into better agreement with human behavior and primate neural recordings. Harmonization uses ClickMe human attention data to improve alignment without changing the network architecture. This shows that training data and objectives contribute to the alignment gap; it does not rule out a role for architecture.</Text>
          <Text className="research-direction-text">We study developmental learning and the balance between discriminative and generative objectives, including joint energy-based models of vision (JEM).</Text>
          <ul className="research-reading body-text"><li><Ext href="https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(25)00349-3">Alignment review</Ext></li><li><Ext href="https://serre-lab.github.io/Harmonization/">ClickMe and Harmonization</Ext></li><li><Ext href="https://openreview.net/forum?id=XYmvp2YQdC">Generative–discriminative learning</Ext></li></ul>
          <div className="funding-badge">Funded by NSF (IIS-2402875) • <Ext href="https://www.nsf.gov/news/training-ai-see-more-humans">Featured by NSF</Ext></div>
        </section>

        <section className="research-direction-card" aria-labelledby="theme-1">
          <Title order={3} id="theme-1" className="research-direction-title">Cognitive benchmarks for visual reasoning</Title>
          <Text className="research-question" fw={600}>Which computations support flexible visual reasoning?</Text>
          <Text className="research-direction-text">Pathfinder, Compositional Visual Relations, and 3D-PC test contour integration, compositional reasoning, and visual perspective taking. They reveal gaps between people and the models evaluated under the training and test conditions in each study. Same–different tasks offer a further probe of relational processing and generalization.</Text>
          <Text className="research-direction-text">We use these gaps to motivate computational mechanisms, rather than treating performance on one benchmark as a universal limit of an architecture.</Text>
          <ul className="research-reading body-text"><li><Ext href="https://proceedings.neurips.cc/paper/2018/hash/ec8956637a99787bd197eacd77acce5e-Abstract.html">Pathfinder paper</Ext></li><li><Ext href="https://github.com/serre-lab/CVR">CVR code and data</Ext></li><li><Ext href="https://openreview.net/forum?id=UIFAJZ22ZF">3D-PC paper</Ext></li></ul>
          <div className="funding-badge">Funded by ONR (N00014-24-1-2026)</div>
        </section>

        <section className="research-direction-card" aria-labelledby="theme-2">
          <Title order={3} id="theme-2" className="research-direction-title">Cortical feedback and recurrent vision</Title>
          <Text className="research-question" fw={600}>What does the brain compute through recurrent interactions?</Text>
          <Text className="research-direction-text">Recurrent and feedback connections allow visual representations to evolve over time. Our models investigate contour integration, perceptual grouping, and feature binding. A recent preprint links recurrent network dynamics to the time course of perceptual grouping in natural scenes.</Text>
          <Text className="research-direction-text">Our mental simulation work involves Sanskriti Manoharan, David Sheinberg, Christopher Cueva, and Alekh Karkada Ashok. We also develop stable recurrent and convolutional state space models to study visual dynamics at larger scales.</Text>
          <ul className="research-reading body-text"><li><Ext href="https://arxiv.org/abs/2610.05419">Grouping preprint (2026)</Ext></li><li><Ext href="https://www.cell.com/current-biology/fulltext/S0960-9822(24)01380-0">Mental simulation study</Ext></li><li><Ext href="https://proceedings.neurips.cc/paper/2020/hash/766d856ef1a6b02f93d894415e6bfa0e-Abstract.html">Stable recurrent models</Ext></li></ul>
          <div className="funding-badge">Funded by ONR (N00014-24-1-2026) and ANITI (France 2030, ANR-23-IACL-0002)</div>
        </section>

        <section className="research-direction-card" aria-labelledby="theme-3">
          <Title order={3} id="theme-3" className="research-direction-title">Development and embodiment</Title>
          <Text className="research-question" fw={600}>How does experience shape the computations of vision?</Text>
          <Text className="research-direction-text">Animals learn from limited, temporally continuous experience. We investigate how predictive learning and active exploration can support grouping, object recognition, and visual reasoning. Our 3D-PC benchmark documents a gap between human visual perspective taking and the tested machine-vision models.</Text>
          <Text className="research-direction-text">Current projects include computational mechanisms of depth perception with Fulvio Domini and Jorge Chang, visual perspective taking and robotics with Alekh Karkada Ashok and Madeleine Fenner, and embodiment and motion with Jorge Chang and Bastien Le Lan.</Text>
          <ul className="research-reading body-text"><li><Ext href="https://openreview.net/forum?id=KeiQNpb7sv">Developmental learning</Ext></li><li><Ext href="https://openreview.net/forum?id=UIFAJZ22ZF">Visual perspective taking</Ext></li></ul>
          <div className="funding-badge">Funded by the REPRISM MURI (ONR N00014-24-1-2603) and ONR (N00014-24-1-2026)</div>
        </section>

        <section className="research-direction-card" aria-labelledby="theme-4">
          <Title order={3} id="theme-4" className="research-direction-title">Explainable AI for scientific discovery</Title>
          <Text className="research-question" fw={600}>How can we identify what a model has learned?</Text>
          <Text className="research-direction-text">CRAFT identifies concepts used by a model, while MACO supports feature visualization in modern networks. Explanations can reveal both useful features and shortcuts: our histopathology work found spurious correlations in models with strong diagnostic performance.</Text>
          <Text className="research-direction-text">With ANITI collaborators, we develop open tools and test which representations people can interpret. Applications range from medical images to leaf architecture.</Text>
          <ul className="research-reading body-text"><li><Ext href="https://github.com/deel-ai/xplique">Xplique toolbox</Ext></li><li><Ext href="https://github.com/serre-lab/Horama">Horama feature visualization</Ext></li><li><Ext href="https://openreview.net/forum?id=vb57jDotru">Human interpretability study</Ext></li></ul>
          <div className="funding-badge">Funded by ANITI (France 2030, ANR-23-IACL-0002), the NSF AI Research Institute on Interaction for AI Assistants (ARIA; NSF Cooperative Agreement 2433429), and NIH/NIMH (R01 MH140004 and R01 MH143695)</div>
        </section>

        <section className="research-direction-card" aria-labelledby="theme-5">
          <Title order={3} id="theme-5" className="research-direction-title">Foundation models and multimodal reasoning</Title>
          <Text className="research-question" fw={600}>When does prediction become scientific understanding?</Text>
          <Text className="research-direction-text">We study what foundation models learn and when their representations can explain cognition. Our spectral theory of multimodal losses connects contrastive and predictive objectives to the representations they produce. Other work examines shared multimodal workspaces and visual reasoning.</Text>
          <Text className="research-direction-text">EpiSelect—Truthful Evidence Selection for Trustworthy AI—is a project by Eunice Yiu, Sixuan Chen, and Joshua Attih that studies evidence selection for AI reasoning.</Text>
          <ul className="research-reading body-text"><li><Ext href="https://www.cell.com/neuron/abstract/S0896-6273(25)00752-4">Prediction and understanding</Ext></li><li><Ext href="https://openreview.net/forum?id=37eNHfTSDD">Multimodal learning theory</Ext></li><li><Ext href="https://joshattih.github.io/episelect-site/">EpiSelect project</Ext></li></ul>
          <div className="funding-badge">Funded by the NSF AI Research Institute on Interaction for AI Assistants (ARIA; NSF Cooperative Agreement 2433429) and ONR (N00014-24-1-2026)</div>
        </section>

        <section className="research-direction-card" aria-labelledby="theme-6">
          <Title order={3} id="theme-6" className="research-direction-title">AI for behavioral and clinical science</Title>
          <Text className="research-question" fw={600}>How can computer vision improve scientific measurement?</Text>
          <Text className="research-direction-text">Our automated home-cage phenotyping system established a foundation for measuring behavior from video. Subsequent work studies rodents, worms, zebrafish, and children, including applications to mouse models of ALS–FTD.</Text>
          <Text className="research-direction-text">A separate collaboration uses clinical images to support research on risk assessment. Other collaborations study histopathology and, with David Borton’s group, spinal circuits for neuromodulation interfaces that restore sensorimotor function after spinal cord injury.</Text>
          <ul className="research-reading body-text"><li><Ext href="https://www.nature.com/articles/ncomms1064">Behavioral phenotyping</Ext></li><li><Ext href="https://onlinelibrary.wiley.com/doi/10.1111/his.15180">Histopathology study</Ext></li><li><Ext href="https://www.nature.com/articles/s41551-026-01627-5">Spinal circuit modeling</Ext></li></ul>
          <div className="funding-badge">Funded by NIH/NIMH (R01 MH140004, R01 MH143695, and T32 MH126388)</div>
        </section>

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
