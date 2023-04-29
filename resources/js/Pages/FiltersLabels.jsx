import { Title } from "@mantine/core"
import { Head } from "@inertiajs/react"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"

export default function FiltersLabels({ auth, project }) {

    return (
        <AuthenticatedLayout user={auth}>
            <Head title="Filters & Labels" />
            <Title>Filters & Labels</Title>
        </AuthenticatedLayout>
    )
}
