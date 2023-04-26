import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TitleBar from '@/Components/TitleBar';
import ManageView from '@/Components/ManageView';
import ViewComments from '@/Components/ViewComments';

export default function Inbox({ auth, project }) {
    const actions = [
        <ManageView key={ManageView.name} />,
        <ViewComments key={ViewComments.name} />
    ];
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Inbox" />
            <TitleBar title="Inbox" actions={actions} />

        </AuthenticatedLayout>
    );
}
