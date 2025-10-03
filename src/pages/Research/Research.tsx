import { Text, Title, Anchor } from "@mantine/core";
import "./Research.css";

export function Research() {
  return (
    <div className="research-container">
      <div className="titleDesc-container">
        <Title order={1} className="page-title">Research</Title>
        <Text className="research-description">
          Our research investigates the computational principles of biological vision to understand how the brain works and to build more human-like AI systems. We work at the intersection of neuroscience, cognitive science, and artificial intelligence.
        </Text>
        
        <Title order={2} className="research-subtitle">Current Research Directions</Title>
        
        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Human-AI Alignment in Vision</Title>
          <Text className="research-direction-text">
            We are developing methods to quantify and improve the alignment between deep neural networks and human visual processing. Our recent work reveals that despite impressive performance, current vision models process information fundamentally differently from humans—a gap crucial to understanding both for building more robust AI systems and for revealing brain mechanisms that support human vision. Our harmonization procedure demonstrates that alignment can be dramatically improved without changing network architectures, suggesting the misalignment stems not from structural limitations but from how these models are trained. This insight has led us to adopt a developmental psychology approach, identifying the learning principles and developmental trajectories that shape human vision—principles we can incorporate into AI training to create models that not only perform well but genuinely see the world as humans do.
          </Text>
          <div className="funding-badge">Funded by NSF</div>
        </div>
        
        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Cognitive Benchmarks for AI Visual Reasoning</Title>
          <Text className="research-direction-text">
            We develop rigorous cognitive-psychology-inspired tests to evaluate fundamental gaps between human and machine vision. Our benchmarks reveal systematic failures in modern AI: the Pathfinder challenge shows feedforward networks fail at contour integration that humans solve effortlessly—a test later adopted by Google DeepMind, who confirmed that even state-of-the-art transformers fail while our brain-inspired recurrent models succeed. Our compositional reasoning benchmark reveals AI's inability to flexibly combine visual concepts, while the 3D-PC benchmark demonstrates failure at visual perspective-taking—a key signature of theory of mind. Even seemingly simple same-different judgments expose how neural networks struggle with basic visual relationships—work that also helps identify brain mechanisms underlying relational processing.
          </Text>
          <div className="funding-badge">Funded by ONR</div>
        </div>
        
        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Cortical Feedback and Visual Reasoning</Title>
          <Text className="research-direction-text">
            We are reverse-engineering how feedback connections in the brain enable complex visual reasoning and mental simulation. Our cognitive benchmarks reveal systematic failures of feedforward networks—from contour integration to relational judgments—suggesting precisely which computations require recurrent processing. These insights guide our experimental design: our neurophysiology work shows that same-different tasks that strain feedforward AI engage distinct neural dynamics in primates, while our recent studies reveal that both monkeys and recurrent neural networks use internal "mental simulations" to solve challenging visual tasks. By identifying where feedforward processing fails, we can pinpoint the computational role of cortical feedback—work that is reshaping our understanding of how biological vision achieves robust reasoning through recurrence.
          </Text>
          <div className="funding-badge">Funded by ONR</div>
        </div>
        
        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Explainable AI for Scientific Discovery</Title>
          <Text className="research-direction-text">
            In collaboration with the Artificial and Natural Intelligence Toulouse Institute, we're creating tools to understand and interpret deep learning models. Our CRAFT framework (Fel et al., CVPR 2023) and MACO approach (Fel et al., NeurIPS 2023) help researchers peek inside the "black box" of AI. CRAFT provides concept-based explanations that reveal both "what" and "where" models look, while MACO unlocks feature visualization for state-of-the-art deep networks. These methods are implemented in our open-source Xplique toolbox, making explainability accessible to the broader research community. Critically, our explainability tools reveal when AI learns deceptive strategies—as we demonstrated in histopathology, where models claiming superhuman cancer diagnosis actually relied on spurious correlations rather than meaningful biological features. See these tools in action: <Anchor href="https://lens.visualize.ai/" target="_blank" className="research-link">LENS explains what ImageNet models really see</Anchor>, and <Anchor href="https://leaf-lens.visualize.ai/" target="_blank" className="research-link">LeafLens reveals how AI identifies plant species from cleared leaves</Anchor>. We're now developing methods to identify the computational mechanisms learned by foundation models—work outlined in our perspective on moving from prediction to understanding in brain science.
          </Text>
          <div className="funding-badge">Funded by ANR and NSF</div>
        </div>
      </div>

      {/* Grant details removed - see research.json.backup to restore */}
    </div>
  );
}
