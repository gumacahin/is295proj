import { useState } from 'react';
import { Button, Menu, Text, Group } from "@mantine/core";
import { IconAdjustmentsHorizontal, IconLayoutList, IconCheck } from '@tabler/icons-react';

function LayoutMenu({ layout, setLayout }) {
    return (
        <Menu shadow="md">
        <Menu.Target>
            <Group position="apart">
                <Text>Layout</Text>
                <Text sx={{textTransform: 'capitalize'}}>{layout}</Text>
            </Group>
        </Menu.Target>

        <Menu.Dropdown>
            <Menu.Item onClick={() => setLayout('list')}>
                <Group position="apart">
                    <Text>List</Text>
                    { layout === 'list' ? <IconCheck /> : null }
                </Group>
            </Menu.Item>
            <Menu.Item onClick={() => setLayout('board')}>
                <Group position="apart">
                    <Text>Board</Text>
                    { layout === 'board' ? <IconCheck /> : null }
                </Group>
            </Menu.Item>

        </Menu.Dropdown>
        </Menu>
    )
}

export default function ManageView() {
    const [layout, setLayout] = useState('list');
    return (
        <Menu shadow="md" closeOnItemClick={false}>
        <Menu.Target>
            <Button leftIcon={<IconAdjustmentsHorizontal />} variant="subtle">View</Button>
        </Menu.Target>

        <Menu.Dropdown>
            <Menu.Label>View</Menu.Label>
            <Menu.Item icon={<IconLayoutList />}><LayoutMenu layout={layout} setLayout={setLayout} /></Menu.Item>
        </Menu.Dropdown>
        </Menu>
    )
}
