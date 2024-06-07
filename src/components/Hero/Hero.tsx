'use client'
import { Container, Text, Button, Group } from '@mantine/core';
import { GithubIcon } from '@mantinex/dev-icons';
import classes from './Hero.module.css';
import splitStringUsingRegex from "../../utils/splitSprinUsingRegex"
import {motion, Variants } from 'framer-motion'
import useIntro from "../../hooks/useIntro"
import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';


export function Hero() {
  const description = `There is little doubt that even a partial solution to the question of which computations are carried out by the visual cortex would be a major breakthrough: It would begin to explain one of our most amazing abilities, vision; and it would open doors to other aspects of intelligence such as language, planning or reasoning. It would also help connect neurobiology and mathematics, making it possible to develop computer algorithms that follow the information processing principles used by biological organisms and honed by natural evolution.`
  // const headingChars = splitStringUsingRegex();
  const textChars = splitStringUsingRegex(description);

  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  }
  
  
  const [ref, inView] = useInView({
    triggerOnce: true, // This will ensure the animation only plays once
  });
  return (
    <div className={classes.wrapper}>
      <Container size={800} className={classes.inner}>
        <h1 className={classes.title}>
          Understanding the{' '}
          <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
            neural computations
          </Text>{' '}
          supporting visual perception
        </h1>
      </Container>
      <Container size={1000} className={classes.secondContainer}>
      <motion.p ref={ref} className={classes.description} color="dimmed" 
        initial="hidden" animate={inView ? 'reveal' : 'hidden'}
        transition={{staggerChildren: .02}}>
        {textChars.map((char) => {
          return(
          <motion.span key={char}
            transition={{ duration: 0.5 }}
            variants={charVariants}
            >
            {char}
          </motion.span>
                )})}
              </motion.p>
        {/* <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
          >
            Get started
          </Button>

          <Button
            component="a"
            href="https://github.com/mantinedev/mantine"
            size="xl"
            variant="default"
            className={classes.control}
            leftSection={<GithubIcon size={20} />}
          >
            GitHub
          </Button>
        </Group> */}
      </Container>
    </div>
  );
}




// 'use client';
// import { Container, Title, Text, Button } from '@mantine/core';
// import classes from './Hero.module.css';

// export function Hero() {
//   return (
//     <div className={classes.root}>
//       <Container size="lg">
//         <div className={classes.inner}>
//           <div className={classes.content}>
//             <Title className={classes.title}>
//               Understanding the{' '}
//               <Text
//                 component="span"
//                 inherit
//                 variant="gradient"
//                 gradient={{ from: 'pink', to: 'yellow' }}
//               >
//                 neural computations
//               </Text>{' '}
//               supporting visual perception
//             </Title>
//             <Text className={classes.description} mt={30}>
//             There is little doubt that even a partial solution to the question of which computations are carried out by the visual cortex would be a major breakthrough: It would begin to explain one of our most amazing abilities, vision; and it would open doors to other aspects of intelligence such as language, planning or reasoning. It would also help connect neurobiology and mathematics, making it possible to develop computer algorithms that follow the information processing principles used by biological organisms and honed by natural evolution.

//             </Text>
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// }
