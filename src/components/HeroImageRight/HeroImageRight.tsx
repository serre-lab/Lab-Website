'use client';
import { Container, Title, Text, Button } from '@mantine/core';
import classes from './HeroImageRight.module.css';

export function HeroImageRight() {
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Understanding the{' '}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: 'pink', to: 'yellow' }}
              >
                neural computations
              </Text>{' '}
              supporting visual perception
            </Title>

            <Text className={classes.description} mt={30}>
            There is little doubt that even a partial solution to the question of which computations are carried out by the visual cortex would be a major breakthrough: It would begin to explain one of our most amazing abilities, vision; and it would open doors to other aspects of intelligence such as language, planning or reasoning. It would also help connect neurobiology and mathematics, making it possible to develop computer algorithms that follow the information processing principles used by biological organisms and honed by natural evolution.

            </Text>

            <Button
              variant="gradient"
              gradient={{ from: 'pink', to: 'yellow' }}
              size="xl"
              className={classes.control}
              mt={40}
            >
              Get started
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
