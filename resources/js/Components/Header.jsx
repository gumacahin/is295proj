import { createStyles, Header, Autocomplete, Group, Burger, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { IconHelp, IconHome, IconBell } from '@tabler/icons-react';
import { Link } from '@inertiajs/react';
import UserMenu from '@/Components/UserMenu';

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: rem(56),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  search: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
}));


export default function AppHeader({ user, toggle, opened, height, ...props}) {
  const { classes } = useStyles();

  return (
    <Header height={height} className={classes.header} mb={120}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" />
          <Link href={route('home')}>
            <IconHome />
          </Link>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            icon={<IconSearch size="1rem" stroke={1.5} />}
            data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
          />
        </Group>

        <Group ml={50} spacing={'lg'} className={classes.links}>
          <Link href={'#'}>
            <IconHelp />
          </Link>
          <Link href={'#'}>
            <IconBell />
          </Link>
          <UserMenu user={user} />
        </Group>
      </div>
    </Header>
  );
}
