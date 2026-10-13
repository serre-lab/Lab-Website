import type { ReactNode } from "react";
import { Text, Title, Anchor, Accordion } from "@mantine/core";
import "./Research.css";
import { HeroBanner } from "../../components/HeroBanner/HeroBanner";
import researchData from "../../data/research.json";

// External link styled for research blurbs; opens in a new tab.
function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Anchor href={href} target="_blank" rel="noopener noreferrer" className="research-link">
      {children}<span className="sr-only"> (opens in new tab)</span>
    </Anchor>
  );
}

export function Research() {
  return (
    <>
      <HeroBanner 
        title="Research" 
        subtitle="Visual perception, learning, and computational models of the brain"
        backgroundImage="/metcalf.webp"
      />
      <div className="research-container">
        <div className="titleDesc-container">
        <Title order={2} className="section-title" style={{ marginTop: 0 }}>Research directions</Title>
        <div>
        <Text className="research-direction-text">
          Machine vision gives us a way to test theories of how the brain sees. A model can recognize thousands of object categories yet struggle to trace a contour, judge a relation, or imagine a scene from another viewpoint. We study these discrepancies to identify the computations that support biological vision.
        </Text>
        <Text className="research-direction-text" style={{ marginBottom: 0 }}>
          We combine behavioral and neural experiments with computational models to study recurrent visual processing and learning from experience. We also develop machine learning methods to identify the visual features and representations that AI models use to make decisions. We apply computer vision to behavioral and clinical research, where it can quantify behaviors at a scale and level of detail that would be impractical by hand.
        </Text>
        </div>

        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Human–AI visual alignment</Title>
          <Text className="research-direction-text">
          Across our comparisons of vision models, agreement with human behavior and primate neural recordings can plateau or decline as recognition accuracy improves. Our <Ext href="https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(25)00349-3">paper on vision-model alignment</Ext> reports that better performance does not necessarily produce a better model of vision.
          </Text>
          <Text className="research-direction-text">
          In our <Ext href="https://clickme.clps.brown.edu/tutorial">ClickMe game</Ext>, people mark the parts of an image that help them recognize an object. We use these human importance maps to train networks to base their decisions on the same image regions that people do, a procedure we call harmonization. This improves agreement with human vision without changing the network architecture.
          </Text>
          <div className="funding-badge">Funded by NSF (IIS-2402875) • <Ext href="https://www.nsf.gov/news/training-ai-see-more-humans">Featured by NSF</Ext></div>
        </div>

        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Visual reasoning benchmarks</Title>
          <Text className="research-direction-text">
          We design tasks that isolate specific demands on vision. The <Ext href="https://proceedings.neurips.cc/paper/2018/hash/ec8956637a99787bd197eacd77acce5e-Abstract.html">Pathfinder task</Ext> tests whether a model can trace a single contour through clutter — the same challenge as the tangled-line puzzles in children's activity books, where you follow one winding string through a jumble of crossing lines to find where it ends. Our recurrent models succeed on conditions that challenge the tested feedforward networks.
          </Text>
          <Text className="research-direction-text">
          The <Ext href="https://proceedings.neurips.cc/paper_files/paper/2022/hash/c08ee8fe3d19521f3bfa4102898329fd-Abstract-Datasets_and_Benchmarks.html">Compositional Visual Relations benchmark</Ext> tests whether learned visual concepts can be combined in new ways. The <Ext href="https://openreview.net/forum?id=UIFAJZ22ZF">3D-PC benchmark</Ext> tests visual perspective-taking: reasoning about how a scene appears from another person's viewpoint, an ability that underpins theory of mind. The <Ext href="https://serre-lab.github.io/VPT/">3D-PC project page</Ext>, <Ext href="https://github.com/serre-lab/VPT">3D-PC code</Ext>, and <Ext href="https://huggingface.co/datasets/3D-PC/3D-PC">3D-PC dataset</Ext> are available for that benchmark.
          </Text>
          <Text className="research-direction-text">
          In same–different tasks, a model must judge whether two objects match, then apply that relation to objects it has not encountered during training. Comparing people and models on these tasks helps us distinguish successful recognition from the computations needed for grouping and relational reasoning.
          </Text>
          <div className="funding-badge">Funded by ONR (N00014-24-1-2026)</div>
        </div>

        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Feedback and recurrent vision</Title>
          <Text className="research-direction-text">
          Beyond the initial feedforward sweep, visual cortex is richly recurrent: horizontal and feedback connections continually propagate signals within and between areas. We study how these interactions reshape a representation over time and what they contribute to perception.
          </Text>
          <Text className="research-direction-text">
          We build recurrent network models of these circuits and test them against behavior and neural data. Networks with <Ext href="https://proceedings.neurips.cc/paper/2018/hash/ec8956637a99787bd197eacd77acce5e-Abstract.html">horizontal recurrent connections</Ext> learn to trace long-range contours that much larger feedforward networks struggle with, and <Ext href="https://openreview.net/forum?id=H1gB4RVKvB">related circuit models</Ext> detect contours in natural images while reproducing contextual illusions such as the tilt illusion. Comparing the two kinds of recurrence shows that <Ext href="https://openreview.net/forum?id=HJxrVA4FDS">horizontal and top-down connections support different forms of perceptual grouping</Ext>. Because these models compute over time, they also yield <Ext href="https://openreview.net/forum?id=1xPsn2gCOe">reaction-time predictions</Ext> that can be compared with people's, and their <Ext href="https://arxiv.org/abs/2610.05419">dynamics track the time course of grouping in natural scenes</Ext>. Experiments on same–different judgments reveal <Ext href="https://www.eneuro.org/content/8/1/ENEURO.0267-20.2020">neural dynamics associated with relational processing</Ext>.
          </Text>
          <Text className="research-direction-text">
          In collaboration with David Sheinberg, our <Ext href="https://www.cell.com/current-biology/fulltext/S0960-9822(24)01380-0">mental-simulation paper</Ext> asks how monkeys predict where a ball will land after falling through obstacles, before seeing it move. Their behavior and eye movements are consistent with mentally tracing the ball’s path. We compare these observations with recurrent networks that learn to solve the same task.
          </Text>
          <Text className="research-direction-text">
          We also investigate whether <Ext href="https://openreview.net/forum?id=m2gVfgWYDO">synchronized neural activity helps track objects</Ext> and solve <Ext href="https://www.cell.com/trends/cognitive-sciences/abstract/S1364-6613(25)00232-3">feature binding</Ext>: keeping the color, shape, and other properties of each object associated with that object rather than mixing them with those of its neighbors. To make these mechanisms practical at larger scales, we develop <Ext href="https://proceedings.neurips.cc/paper/2020/hash/766d856ef1a6b02f93d894415e6bfa0e-Abstract.html">stable recurrent models</Ext> and convolutional state space models.
          </Text>
          <div className="funding-badge">Funded by ONR (N00014-24-1-2026) and ANITI (France 2030, ANR-23-IACL-0002)</div>
        </div>

        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Development and embodiment</Title>
          <Text className="research-direction-text">
          Harmonization imposes human-like visual strategies through direct supervision. A complementary question is whether alignment can emerge without that supervision, from the way a system learns. Animals learn to see without labels, through experience that unfolds continuously as they move through the world. We study what models can learn from that temporal structure and from acting, and how <Ext href="https://openreview.net/forum?id=KeiQNpb7sv">visual experience and learning objectives</Ext> determine whether a model comes to see the world as we do.
          </Text>
          <Text className="research-direction-text">
          We collaborate with developmental cognitive scientists to identify the learning principles that support perceptual development, including how intrinsic rewards guide exploration. Ongoing work uses a newborn chick's first-person visual experience to test whether predictive learning can support grouping and object recognition without labels.
          </Text>
          <Text className="research-direction-text">
          The failures of current models on the 3D-PC perspective-taking benchmark motivate work on agents that learn through exploration. In collaboration with Fulvio Domini, we also study the computational mechanisms of depth perception.
          </Text>
          <div className="funding-badge">Funded by the REPRISM MURI (ONR N00014-24-1-2603), ONR (N00014-24-1-2026), and the NSF AI Research Institute on Interaction for AI Assistants (ARIA; NSF Cooperative Agreement 2433429)</div>
        </div>

        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Explainable AI</Title>
          <Text className="research-direction-text">
          A model's predictions can be accurate for the wrong reasons. In our <Ext href="https://onlinelibrary.wiley.com/doi/10.1111/his.15180">histopathology paper</Ext>, models trained to predict tumor mutations from tissue images relied on correlations with tissue subtype and failed a more demanding test. Accurate predictions alone did not establish that the models measured the intended biology.
          </Text>
          <Text className="research-direction-text">
          With collaborators at ANITI, we develop methods to examine the evidence behind such predictions. <Ext href="https://openaccess.thecvf.com/content/CVPR2023/papers/Fel_CRAFT_Concept_Recursive_Activation_FacTorization_for_Explainability_CVPR_2023_paper.pdf">CRAFT</Ext> identifies concepts used by a model, and <Ext href="https://proceedings.neurips.cc/paper_files/paper/2023/hash/76d2f8e328e1081c22a77ca0fa330ca5-Abstract-Conference.html">MACO</Ext> visualizes its features. These methods are available through <Ext href="https://github.com/deel-ai/xplique">Xplique</Ext> and <Ext href="https://github.com/serre-lab/Horama">Horama</Ext> libraries.
          </Text>
          <Text className="research-direction-text">
          We test explanations with people, finding that <Ext href="https://arxiv.org/abs/2605.20337">more capable vision models are not necessarily more interpretable</Ext> and comparing <Ext href="https://openreview.net/forum?id=vb57jDotru">which representations people can understand</Ext>. Applications include identifying <Ext href="https://www.pnas.org/content/113/12/3305">plant families from leaf architecture</Ext>. <Ext href="https://serre-lab.github.io/LeafLens/">LeafLENS</Ext> and <Ext href="https://serre-lab.github.io/Lens/">ObjectLENS</Ext> let visitors explore model explanations directly.
          </Text>
          <div className="funding-badge">Funded by ANITI (France 2030, ANR-23-IACL-0002) and the NSF AI Research Institute on Interaction for AI Assistants (ARIA; NSF Cooperative Agreement 2433429)</div>
        </div>

        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Foundation models</Title>
          <Text className="research-direction-text">
          Foundation models offer increasingly powerful predictions of behavior and brain activity. Establishing what those predictions explain requires understanding how the models learn and represent information. Our <Ext href="https://www.cell.com/neuron/abstract/S0896-6273(25)00752-4">perspective on prediction and understanding</Ext> develops that distinction.
          </Text>
          <Text className="research-direction-text">
          We ask how the training objective determines which information a model retains. Contrastive learning brings representations of matched inputs closer together while separating mismatched inputs. Predictive learning trains a model to infer one representation from another. Our <Ext href="https://openreview.net/forum?id=37eNHfTSDD">spectral theory of multimodal losses</Ext> studies the relationship between these objectives and the representations they produce.
          </Text>
          <Text className="research-direction-text">
          We also study shared multimodal workspaces, failures of feature binding in vision–language models, and language-model representations that <Ext href="https://openreview.net/forum?id=Czul60ELOH">track human judgments of event plausibility</Ext>.
          </Text>
          <div className="funding-badge">Funded by the NSF AI Research Institute on Interaction for AI Assistants (ARIA; NSF Cooperative Agreement 2433429) and ONR (N00014-24-1-2026)</div>
        </div>

        <div className="research-direction-card">
          <Title order={3} className="research-direction-title">Behavioral and clinical AI</Title>
          <Text className="research-direction-text">
          Studying behavior often requires researchers to watch and label many hours of video. Our <Ext href="https://www.nature.com/articles/ncomms1064">automated home-cage phenotyping paper</Ext> describes a system that learns to recognize mouse behaviors such as eating, grooming, and resting. Researchers can then measure when these behaviors occur and how they change over time.
          </Text>
          <Text className="research-direction-text">
          We have extended video-based behavioral analysis to worms, zebrafish, and children. We have also used these measurements to characterize mouse models of amyotrophic lateral sclerosis and frontotemporal dementia (ALS-FTD).
          </Text>
          <div className="funding-badge">ALS-FTD phenotyping supported by NIH/NINDS (R21 NS112743, 2020–2022)</div>
          <Text className="research-direction-text">
          In a separate collaboration with Taylor Burke at Massachusetts General Hospital, we develop computer-vision methods to analyze photographs of self-inflicted injuries. The models measure visible signs of injury severity. We are testing whether these measurements, combined with clinical assessments, can improve prediction of future suicide attempts. This <Ext href="https://taggs.hhs.gov/Detail/AwardDetail?arg_AwardNum=R01MH140004&amp;arg_ProgOfficeCode=134">NIH-funded research</Ext> investigates a potential source of information for clinicians assessing suicide risk.
          </Text>
          <div className="funding-badge">Suicide-risk research funded by NIH/NIMH (R01 MH140004 and R01 MH143695)</div>
          <Text className="research-direction-text">
          With David Borton's group, we develop machine learning methods to personalize electrical stimulation after spinal cord injury. Our models learn how stimulation settings relate to muscle activity, helping the team find settings that produce a desired response without testing every possible combination. This work contributes to a <Ext href="https://www.nature.com/articles/s41551-026-01627-5">neuroprosthetic interface that restored muscle control and sensory feedback in three participants with spinal cord injuries</Ext>.
        </Text>
          <div className="funding-badge">Spinal-interface research supported by DARPA (D19AC00015, 2019–2024; PI: David Borton)</div>
        </div>

        {/* Grants Section */}
        <div className="grants-section" style={{ marginTop: "3rem" }}>
          <Title order={2} className="section-title">Research funding</Title>
          <Text className="research-direction-text">
            The Center for Computation and Visualization runs the <Ext href="https://carney.brown.edu/carney-condo">Carney Condo</Ext>, a shared GPU and CPU cluster for brain science research at Brown, funded by NIH Shared Instrumentation Grant S10OD036341. Publications that use the cluster should cite RRID:SCR_029056.
          </Text>
          
          {/* Current grants */}
          <div style={{ marginTop: "2rem" }}>
            <Title order={3} className="subsection-title" style={{ marginBottom: "1rem" }}>Current grants</Title>
            <Accordion variant="default">
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

          {/* Training grants */}
          <div style={{ marginTop: "2rem" }}>
            <Title order={3} className="subsection-title" style={{ marginBottom: "1rem" }}>Training grants</Title>
            <Accordion variant="default">
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

          {/* Completed grants */}
          <div style={{ marginTop: "2rem", marginBottom: "3rem" }}>
            <Title order={3} className="subsection-title" style={{ marginBottom: "1rem" }}>Completed grants</Title>
            <Accordion variant="default">
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
