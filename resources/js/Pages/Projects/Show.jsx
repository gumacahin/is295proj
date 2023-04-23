import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Todo from '@/Components/Todo';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';


export default function Show({ auth, project }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={project.title} />
        </AuthenticatedLayout>
    );
}
