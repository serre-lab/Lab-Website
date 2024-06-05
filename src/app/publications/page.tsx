'use client'
import { Timeline, Text } from '@mantine/core';
import { IconGitBranch, IconGitPullRequest, IconGitCommit, IconMessageDots } from '@tabler/icons-react';

export default function page() {
  return (
    <div>
      <Timeline active={1} bulletSize={24} lineWidth={2}>
        <Timeline.Item bullet={<IconGitBranch size={12} />} title="Monkeys engage in visual simulation to solve complex problems">
          <Text c="dimmed" size="sm">bioRxiv</Text>
          <Text size="xs" mt={4}>A. Ahuja, N.Y. Rodriguez, A.K. Ashok, T. Serre, T. Desrochers, D. Sheinberg</Text>
        </Timeline.Item>

        <Timeline.Item bullet={<IconGitCommit size={12} />} title="Uncovering intermediate variables in transformers using circuit probing">
          <Text c="dimmed" size="sm">arXiv</Text>
          <Text size="xs" mt={4}>MA. Lepori, T. Serre & E. Pavlick</Text>
        </Timeline.Item>

        <Timeline.Item title="Adversarial alignment: Breaking the trade-off between the strength of an attack and its relevance to human perception"
         bullet={<IconGitPullRequest size={12} />} lineVariant="dashed">
          <Text c="dimmed" size="sm">arXiv</Text>
          <Text size="xs" mt={4}>D. Linsley, P. Feng, T. Boissin, A.K. Ashok, T. Fel, S. Olaiya, T. Serre</Text>
        </Timeline.Item>

        <Timeline.Item title="Gradient strikes back: How filtering out high frequencies improves explanations" bullet={<IconMessageDots size={12} />}>
          <Text c="dimmed" size="sm">International Conference on Machine Learning</Text>
          <Text size="xs" mt={4}>S. Muzellec, T. Fel, V. Boutin, L. Andeol, R. VanRullen & T. Serre</Text>
        </Timeline.Item>
      </Timeline>
    </div>
  );
}
