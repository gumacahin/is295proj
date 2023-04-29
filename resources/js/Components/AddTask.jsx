import { useDisclosure, useHover } from '@mantine/hooks';
import { Group, Text, UnstyledButton } from '@mantine/core';
import { IconPlus, IconCirclePlus } from '@tabler/icons-react';
import TodoForm from '@/Components/TodoForm';

export default function AddTask({ project }) {
    const { hovered, ref } = useHover();
    const [isOpen, { open, close }] = useDisclosure(false);
    return (
        <>
            <UnstyledButton sx={{ display: isOpen ? 'none' : 'block' }} onClick={open} ref={ref}>
                <Group>
                    {hovered ? <IconCirclePlus /> : <IconPlus />}
                    <Text>Add task</Text>
                </Group>
            </UnstyledButton>
            {isOpen && <TodoForm project={project} close={close} />}
        </>
    );
}
