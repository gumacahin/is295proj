import { useEffect } from 'react';
import TitleBar from '@/Components/TitleBar';
import { Stack, Container } from '@mantine/core';
import AddTask from '@/Components/AddTask';
import AddSection from '@/Components/AddSection';

export default function ProjectBoardView({ saveLayout, actions, project }) {
    // useEffect(() => saveLayout(), []);

    return (
        <Container>
            <TitleBar title={`BOARD: ${project.title}`} actions={actions} />
            {/* <Stack align='stretch' spacing='xs'>
                <AddTask project={project} />
                <AddSection project={project} />
            </Stack> */}
        </Container>
    );
}
