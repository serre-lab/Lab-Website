'use client';

import { Anchor, Group, ActionIcon, rem, Button } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './FooterCentered.module.css';
import Link from 'next/link';
import { redirect, RedirectType, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const links = [
  { link: '#', label: 'Contact' },
  { link: '#', label: 'Privacy' },
  { link: '#', label: 'Blog' },
  { link: '#', label: 'Store' },
  { link: '#', label: 'Careers' },
];

export function FooterCentered() {
  // const { push } = useRouter();

  // useEffect(() => {
  //    push('https://www.instagram.com/serrelab/');
  // }, []);
  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      lh={1}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <MantineLogo size={28} />

        <Group className={classes.links}>{items}</Group>
        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <Link href="https://twitter.com/serre_lab" passHref>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} 
              />
          </ActionIcon>
          </Link>

          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>

          <Link href="https://www.instagram.com/serrelab/" passHref>
            <ActionIcon size="lg" variant="default" radius="xl">
              <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          </Link>
        </Group>
        {/* <Link href="https://www.instagram.com/serrelab/" passHref>
              <Button>insta</Button>
        </Link> */}
      </div>
    </div>
  );
}
