import { useEffect } from 'react';
import TitleBar from '@/Components/TitleBar';
import { Group, Stack, Text, Container } from '@mantine/core';
import AddTask from '@/Components/AddTask';
import AddSection from '@/Components/AddSection';
import Section from '@/Components/ProjectSection';

export default function ProjectBoardView({ project }) {
    // useEffect(() => saveLayout(), []);
    const unsectioned = {
        title: '(no section)',
        tasks: project.unsectionedTodos
    }

    return (
        <Group>
            <Section section={unsectioned} unsectioned  />
            {project.sections.map(section => <Section key={section.id} section={section} unsectioned  />)}
        </Group>
    );
}
