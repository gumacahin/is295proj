import { Menu, ActionIcon } from "@mantine/core";
import { IconDots, IconSection, IconCircleCheck } from '@tabler/icons-react';

export default function MoreActionsMenu() {
    return (
        <Menu shadow="md">
        <Menu.Target>
            <ActionIcon><IconDots /></ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
            <Menu.Item icon={<IconSection />}>Add Section</Menu.Item>
            <Menu.Divider />
            <Menu.Item icon={<IconCircleCheck />}>Show Completed</Menu.Item>
        </Menu.Dropdown>
        </Menu>
    )
}
