import {useEffect} from 'react';
import TitleBar from '@/Components/TitleBar';
import { Stack, Container, Title, Box, Text } from '@mantine/core';
import AddTask from '@/Components/AddTask';
import AddSection from '@/Components/AddSection';

export default function ProjectListView({ saveLayout, actions, project }) {
    // useEffect(() => saveLayout(), []);

    return (
        <Container>
            <TitleBar title={project.title} actions={actions} />
            <Stack align='stretch' spacing='xs'>
                { project.unsectioned_todos.map(todo => (
                    <Box key={todo.id}>
                        <Title order={3} dangerouslySetInnerHTML={{__html:todo.title}}/>
                        <Text dangerouslySetInnerHTML={{__html:todo.description}}/>
                    </Box>))}
                <AddTask project={project} />
                <AddSection project={project} />
            </Stack>
        </Container>
    );
}
