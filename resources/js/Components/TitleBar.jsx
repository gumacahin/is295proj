
import { Group, Title } from '@mantine/core';

export default function TitleBar({ title, actions}) {
    return (
        <Group position="apart">
            <Title order={2}>{title}</Title>
            <Group>{actions}</Group>
        </Group>
    )
}
