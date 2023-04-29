import { Title } from '@mantine/core';
export default function ProjectSection({section, unsectioned}) {
    return <Title
        sx={{ fontWeight: unsectioned ? 700 : 400}}
        order={4}>{section.title}</Title>;
}
