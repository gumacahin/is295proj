import { useDisclosure, useHover } from '@mantine/hooks';
import { Divider, Text, UnstyledButton } from '@mantine/core';
import AddSectionForm from '@/Components/AddSectionForm';

export default function AddSection() {
    const [isOpen, { open, close }] = useDisclosure(false);
    const { hovered, ref } = useHover();

    return (
        <>
            {isOpen && <AddSectionForm close={close} />}
            <UnstyledButton sx={{ display: isOpen ? 'none' : 'block' }} onClick={open} ref={ref}>
                <Divider sx={{ opacity: hovered ? 1 : 0, transition: 'opacity 300ms ease' }} label={<Text fz="md">Add section</Text>} labelPosition="center" />
            </UnstyledButton>
        </>
    );
}
