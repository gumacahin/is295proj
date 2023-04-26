import { useState } from 'react';
import { Modal, Button, Group, Text, SegmentedControl } from '@mantine/core';
import { IconMessage, IconInbox } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

function CommentsModal() {
    const [view, setView] = useState('comments');
    return (
        <SegmentedControl
            data={[
                { label: 'Comments', value: 'comments' },
                { label: 'Activity', value: 'activity' },
            ]}
            value={view}
            onChange={setView} />
    );
}

export default function ViewComments({project}) {
    const [opened, {open, close}] = useDisclosure(false);

    const title = (
        <Group>
            <IconInbox />
            <Text>Inbox</Text>
        </Group>
    );

    return (
        <>
            <Button onClick={open} leftIcon={<IconMessage />} variant="subtle">Comments</Button>

            <Modal opened={opened} onClose={close} title={title} centered>
                <CommentsModal />
            </Modal>
        </>
    )

}
