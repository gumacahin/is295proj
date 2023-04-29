import { useState, useEffect } from 'react';
import { Container } from '@mantine/core';
import { Head, useForm } from '@inertiajs/react';
import ProjectBoardView from './ProjectBoardView';
import ProjectListView from './ProjectListView';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProjectViewMenu from './ProjectViewMenu';
import CommentsView from './CommentsView';
import MoreActionsMenu from './MoreActionsMenu';
import TitleBar from './TitleBar';

export default function ProjectView({auth, project}) {
    const [processing, setProcessing] = useState(false);
    const [view, setView] = useState(project.layout);

    const actions = [
        <ProjectViewMenu processing={processing} view={view} setView={setView} project={project} key={ProjectViewMenu.name} />,
        <CommentsView key={CommentsView.name} />,
        <MoreActionsMenu key={MoreActionsMenu.name} />
    ];

    useEffect(() => {
        if (project.layout !== view) {
            saveLayout();
        }
    }, [view]);

    const saveLayout = async () => {
        setProcessing(true);
        await axios.put(route('projects.update', project), { ...project, layout: view })
        setProcessing(false);
    };

    return (
        <>
            <Head title={project.title} />
            <AuthenticatedLayout user={auth.user} >
                <TitleBar title={project.title} actions={actions} />
                <Container>
                    {
                        view === 'list'
                            ? <ProjectListView saveLayout={saveLayout} project={project} actions={actions} />
                            : <ProjectBoardView saveLayout={saveLayout} project={project} actions={actions} />
                    }
                </Container>
            </AuthenticatedLayout>
        </>
    );
}
