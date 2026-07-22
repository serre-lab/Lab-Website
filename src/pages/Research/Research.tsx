import { Text, Title, Anchor, Accordion } from "@mantine/core";
import "./Research.css";
import { HeroBanner } from "../../components/HeroBanner/HeroBanner";
import researchData from "../../data/research.json";

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
        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Human-AI Alignment in Vision</Title>
          <Text className="research-direction-text">
            We are developing methods to quantify and improve the alignment between deep neural networks and human visual processing. Our <Anchor href="https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(25)00349-3" target="_blank"
              rel="noopener noreferrer"
              title="Opens in new tab" className="research-link">recent work</Anchor> reveals that despite impressive performance, current vision models process information fundamentally differently from humans—a gap crucial to understanding both for building more robust AI systems and for revealing brain mechanisms that support human vision. Our harmonization procedure demonstrates that alignment can be dramatically improved without changing network architectures, suggesting the misalignment stems not from structural limitations but from how these models are trained. This insight has led us to adopt a <Anchor href="https://openreview.net/forum?id=KeiQNpb7sv" target="_blank"
              rel="noopener noreferrer"
              title="Opens in new tab" className="research-link">developmental psychology approach</Anchor>, identifying the learning principles and developmental trajectories that shape human vision—principles we can incorporate into AI training to create models that not only perform well but genuinely see the world as humans do. Read more about this work in the <Anchor href="https://www.nsf.gov/news/training-ai-see-more-humans" target="_blank"
              rel="noopener noreferrer"
              title="Opens in new tab" className="research-link">NSF feature article</Anchor>.
          </Text>
          <div className="funding-badge">Funded by NSF (IIS-2402875) • <Anchor href="https://www.nsf.gov/news/training-ai-see-more-humans" target="_blank"
              rel="noopener noreferrer"
              title="Opens in new tab" className="research-link">Featured by NSF</Anchor></div>
        </div>
        
        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Cognitive Benchmarks for AI Visual Reasoning</Title>
          <Text className="research-direction-text">
            We develop rigorous cognitive-psychology-inspired tests to evaluate fundamental gaps between human and machine vision. Our benchmarks reveal systematic failures in modern AI: the <Anchor href="https://proceedings.neurips.cc/paper/2018/hash/ec8956637a99787bd197eacd77acce5e-Abstract.html" target="_blank"
              rel="noopener noreferrer"
              title="Opens in new tab" className="research-link">Pathfinder challenge</Anchor> shows feedforward networks fail at contour integration that humans solve effortlessly—a test later adopted by Google DeepMind, who confirmed that even state-of-the-art transformers fail while our brain-inspired recurrent models succeed. Our <Anchor href="https://proceedings.neurips.cc/paper_files/paper/2022/hash/c08ee8fe3d19521f3bfa4102898329fd-Abstract-Datasets_and_Benchmarks.html" target="_blank"
              rel="noopener noreferrer"
              title="Opens in new tab" className="research-link">compositional reasoning benchmark</Anchor> reveals AI's inability to flexibly combine visual concepts, while the <Anchor href="https://openreview.net/forum?id=UIFAJZ22ZF" target="_blank"
              rel="noopener noreferrer"
              title="Opens in new tab" className="research-link">3D-PC benchmark</Anchor> demonstrates failure at visual perspective-taking—a key signature of theory of mind. Even seemingly simple same-different judgments expose how neural networks struggle with basic visual relationships—work that also helps identify brain mechanisms underlying relational processing.
          </Text>
          <div className="funding-badge">Funded by ONR (N00014-24-1-2026)</div>
        </div>
        
        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Cortical Feedback and Visual Reasoning</Title>
          <Text className="research-direction-text">
            We are reverse-engineering how feedback connections in the brain enable complex visual reasoning and mental simulation. Our cognitive benchmarks reveal systematic failures of feedforward networks—from contour integration to relational judgments—suggesting precisely which computations require recurrent processing. These insights guide our experimental design: our neurophysiology work shows that same-different tasks that strain feedforward AI engage <Anchor href="https://www.eneuro.org/content/8/1/ENEURO.0267-20.2020" target="_blank"
              rel="noopener noreferrer"
              title="Opens in new tab" className="research-link">distinct neural dynamics</Anchor> in primates, while our <Anchor href="https://www.cell.com/current-biology/fulltext/S0960-9822(24)01380-0" target="_blank"
              rel="noopener noreferrer"
              title="Opens in new tab" className="research-link">recent studies</Anchor> reveal that both monkeys and recurrent neural networks use internal "mental simulations" to solve challenging visual tasks. By identifying where feedforward processing fails, we can pinpoint the computational role of cortical feedback—work that is reshaping our understanding of how biological vision achieves robust reasoning through recurrence.
          </Text>
          <div className="funding-badge">Funded by ONR (N00014-24-1-2026) and REPRISM MURI (N00014-24-1-2603)</div>
        </div>
        
        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Explainable AI for Scientific Discovery</Title>
          <Text className="research-direction-text">
            In collaboration with the Artificial and Natural Intelligence Toulouse Institute, we're creating tools to understand and interpret deep learning models. Our <Anchor href="https://openaccess.thecvf.com/content/CVPR2023/papers/Fel_CRAFT_Concept_Recursive_Activation_FacTorization_for_Explainability_CVPR_2023_paper.pdf" target="_blank"
              rel="noopener noreferrer"
              title="Opens in new tab" className="research-link">CRAFT framework</Anchor> and <Anchor href="https://proceedings.neurips.cc/paper_files/paper/2023/hash/76d2f8e328e1081c22a77ca0fa330ca5-Abstract-Conference.html" target="_blank"
              rel="noopener noreferrer"
              title="Opens in new tab" className="research-link">MACO approach</Anchor> help researchers peek inside the "black box" of AI. CRAFT provides concept-based explanations that reveal both "what" and "where" models look, while MACO unlocks feature visualization for state-of-the-art deep networks. These methods are implemented in our open-source <Anchor href="https://github.com/deel-ai/xplique" target="_blank"
              rel="noopener noreferrer"
              title="Opens in new tab" className="research-link">Xplique toolbox</Anchor>, making explainability accessible to the broader research community. Critically, our explainability tools reveal when AI learns deceptive strategies—as we demonstrated in <Anchor href="https://onlinelibrary.wiley.com/doi/10.1111/his.15180" target="_blank"
              rel="noopener noreferrer"
              title="Opens in new tab" className="research-link">histopathology</Anchor>, where models claiming superhuman cancer diagnosis actually relied on spurious correlations rather than meaningful biological features. See these tools in action: <Anchor href="https://serre-lab.github.io/Lens/" target="_blank"
              rel="noopener noreferrer"
              title="Opens in new tab" className="research-link">ObjectLENS explains what ImageNet models really see</Anchor>, and <Anchor href="https://serre-lab.github.io/LeafLens/" target="_blank"
              rel="noopener noreferrer"
              title="Opens in new tab" className="research-link">LeafLENS reveals how AI identifies plant species from cleared leaves</Anchor>. We're now developing methods to identify the computational mechanisms learned by foundation models—work outlined in our <Anchor href="https://arxiv.org/abs/2509.17280" target="_blank"
              rel="noopener noreferrer"
              title="Opens in new tab" className="research-link">perspective on moving from prediction to understanding</Anchor> in brain science.
          </Text>
          <div className="funding-badge">Funded by ANR-3IA (ANR-19-PI3A-0004), the NSF AI Research Institute on Interaction for AI Assistants (ARIA; NSF Cooperative Agreement No. 2433429), and NIH/NIMH (R01 MH140004 and R01 MH143695)</div>
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
