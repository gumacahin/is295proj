import { Title } from "@mantine/core"
import { Head } from "@inertiajs/react"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"

export default function Today({ auth, project }) {

    return (
        <AuthenticatedLayout user={auth}>
            <Head title="Today" />
            <Title>Today</Title>
        </AuthenticatedLayout>
    )
}
