import { Button, TextInput, Group } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function AddSectionForm({ close }) {
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
                {...form.getInputProps('title')} />
            <Group spacing="xs" mt="md">
                <Button variant="filled" disabled={!form.isValid('title')} type="submit">Add section</Button>
                <Button onClick={close} variant="subtle">Cancel</Button>
            </Group>
        </form>
    );
}
