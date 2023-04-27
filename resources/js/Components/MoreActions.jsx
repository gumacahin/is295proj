import { useState } from 'react';
import { Button, Menu, Text, Group, ActionIcon } from "@mantine/core";
import { IconDots, IconSection, IconCircleCheck } from '@tabler/icons-react';

export default function MoreActions() {
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
