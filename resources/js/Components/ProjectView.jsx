import { Container } from '@mantine/core';
import { Head, useForm } from '@inertiajs/react';
import ProjectBoardView from './ProjectBoardView';
import ProjectListView from './ProjectListView';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProjectViewMenu from './ProjectViewMenu';
import CommentsView from './CommentsView';
import MoreActionsMenu from './MoreActionsMenu';

export default function ProjectView({auth, project}) {
    const { put, data, setData, processing } = useForm({ ...project});

    const actions = [
        <ProjectViewMenu processing={processing} data={data} setData={setData} project={project} key={ProjectViewMenu.name} />,
        <CommentsView key={CommentsView.name} />,
        <MoreActionsMenu key={MoreActionsMenu.name} />
    ];

    function saveLayout() {
        put(route('projects.update', project));
    }


    // Set the value of the data when the the value of the segmented control
    // changes.

    // Save the value of the layout attribute when the list/board component
    // mounts

    return (
        <>
            <Head title={project.title} />
            <AuthenticatedLayout user={auth.user} >
                <Container>
                    {
                        project.layout === 'list'
                            ? <ProjectListView saveLayout={saveLayout} project={project} actions={actions} />
                            : <ProjectBoardView saveLayout={saveLayout} project={project} actions={actions} />
                    }
                </Container>
            </AuthenticatedLayout>
        </>
    );
}
