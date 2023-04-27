import { useDisclosure, useHover } from '@mantine/hooks';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TitleBar from '@/Components/TitleBar';
import ManageView from '@/Components/ManageView';
import ViewComments from '@/Components/ViewComments';
import MoreActions from '@/Components/MoreActions';
import { Button, TextInput, Divider, Stack, Group, Text, Container, UnstyledButton, rem } from '@mantine/core';
import { IconPlus, IconCirclePlus } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useForm as useInertiaForm } from '@inertiajs/react';
import TodoForm from '@/Components/TodoForm';

function AddTask() {
    const { hovered, ref } = useHover();
    const [ isOpen, {open, close}] = useDisclosure(true);
    return (
        <>
            <UnstyledButton sx={{ display: isOpen ? 'none' : 'block' }} onClick={open} ref={ref}>
                <Group>
                    { hovered ? <IconCirclePlus /> : <IconPlus /> }
                    <Text>Add task</Text>
                </Group>
            </UnstyledButton>
            { isOpen && <TodoForm close={close} /> }
        </>
    );
}

function AddSectionForm({close}) {
    const form = useForm({
        initialValues: {
            title: '',
        },
        validate: {
            title: (value) => value.length > 0 ? null : 'Title is required',
        },
    });

    return (
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput
                placeholder="Section title"
                {...form.getInputProps('title')}
            />
            <Group spacing="xs" mt="md">
                <Button variant="filled" disabled={!form.isValid('title')} type="submit">Add section</Button>
                <Button onClick={close} variant="subtle">Cancel</Button>
            </Group>
        </form>
    )
}

function AddSection() {
    const [ isOpen, {open, close}] = useDisclosure(false);
    const { hovered, ref } = useHover();

    return (
        <>
            {isOpen && <AddSectionForm close={close} /> }
            <UnstyledButton sx={{display: isOpen ? 'none': 'block' }} onClick={open} ref={ref}>
                <Divider sx={{ opacity: hovered ? 1 : 0, transition: 'opacity 300ms ease' }} label={<Text fz="md">Add section</Text>} labelPosition="center" />
            </UnstyledButton>
        </>
    );
}

export default function Inbox({ auth, project }) {

    const actions = [
        <ManageView key={ManageView.name} />,
        <ViewComments key={ViewComments.name} />,
        <MoreActions key={MoreActions.name} />
    ];
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Inbox" />
            <Container>
                <TitleBar title="Inbox" actions={actions} />
                <Stack align='stretch' spacing='xs'>
                    <AddTask />
                    <AddSection />
                </Stack>
            </Container>

        </AuthenticatedLayout>
    );
}
