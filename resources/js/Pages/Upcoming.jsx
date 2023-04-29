import { Title } from "@mantine/core"
import { Head } from "@inertiajs/react"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"

export default function Upcoming({ auth, project }) {

    return (
        <AuthenticatedLayout user={auth}>
            <Head title="Upcoming" />
            <Title>Upcoming</Title>
        </AuthenticatedLayout>
    )
}
