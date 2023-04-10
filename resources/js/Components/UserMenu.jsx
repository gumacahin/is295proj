import { IconSettings, IconLogout, IconPhoto, IconMessageCircle, IconTrash, IconArrowsLeftRight } from '@tabler/icons-react';
import {
  UnstyledButton,
  Group,
  Avatar,
  Menu,
  Text,
  createStyles,
} from '@mantine/core';
import { Link } from '@inertiajs/react';

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    // width: '100%',
    padding: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
  },
}));


export function UserButton({ image, name, email, ...others }) {
  const { classes } = useStyles();

  return (
    <Group>
      <Avatar src={image} radius="xl" />

      <div style={{ flex: 1 }}>
      <Text size="sm" weight={500}>
          {name}
      </Text>

      <Text color="dimmed" size="xs">
          {email}
      </Text>
      </div>
    </Group>
  );
}


export default function UserMenu({ user }) {
  return (
    <Menu shadow="md">
      <Menu.Target>
        <UnstyledButton>
          <Avatar radius="xl" />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>
            <UserButton name={user.name} email={user.email} image={user.image}/>
        </Menu.Label>
        <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>

        <Menu.Divider />

        <Menu.Item icon={<IconLogout size={14} />}><Link href={route('profile.edit')}>Profile Edit</Link></Menu.Item>
        <Menu.Item icon={<IconLogout size={14} />}><Link method="post" href={route('logout')}>Logout</Link></Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
