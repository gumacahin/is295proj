import { Box, Text, ActionIcon, Group, createStyles, rem } from '@mantine/core';
import { IconSend, IconX } from '@tabler/icons-react';
import { useEditor, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { RichTextEditor, Link} from '@mantine/tiptap';
import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { useFocusWithin } from '@mantine/hooks';
import { useForm } from '@inertiajs/react';

const useStyles = createStyles((theme) => ({
    form: {
        borderWidth: 1 ,
        borderStyle: 'solid',
        borderRadius: theme.spacing.xs,
        padding: theme.spacing.md,
    }
}));

const useTitleStyles = createStyles((theme) => ({
    root: {
        border: 'none',
    },
    content: {
        background: 'none',
        fontWeight: 'bold',
    }
}));

const useDescriptionStyles = createStyles((theme) => ({
    root: {
        border: 'none',
    },
    content: {
        background: 'none',
        fontSize: rem(14),
    }
}));

// @link https://github.com/ueberdosis/tiptap/issues/313#issuecomment-1277897635
const NoNewLine = Extension.create({
    name: 'no_new_line',

    addOptions() {
        return {
          onEnter: () => undefined,
        }
      },

    addProseMirrorPlugins() {
      return [
        new Plugin({
          key: new PluginKey('eventHandler'),
          props: {
              handleKeyDown: (_, event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                      this.options.onEnter();
                      return true
                  }
            }
          },
        }),
      ]
    },
});

export default function TodoForm({close, submit, project, todo }) {
    const { ref, focused } = useFocusWithin();
    const { classes } = useStyles();
    const { classes: title } = useTitleStyles();
    const { classes: description } = useDescriptionStyles();


    const { data, setData, post, reset } = useForm({
        title: '',
        description: '',
        projectId: project.id
    });

    const isValidTitle = (value) => value.replace(/^(<p>)+|(<\/p>)+$/gi, "").length > 0;

    const titleEditor = useEditor({
        extensions: [StarterKit, Link,
            NoNewLine.configure({ onEnter: submit}),
            Placeholder.configure({ placeholder: 'Task name' })],
        content: data.title,
        onUpdate: ({ editor }) => {
            setData('title', editor.getHTML());
        },
    });

    const descriptionEditor = useEditor({
        extensions: [StarterKit, Link,
            Placeholder.configure({ placeholder: 'Description' })],
        content: data.description,
        onUpdate: ({ editor }) => {
            setData('description', editor.getHTML());
        }
    });

    function submit(e) {
        e.preventDefault()
        post(
            route('todos.store'),
            {
                onSuccess: () => {
                    reset();
                    close();
                }
            }
        );
    }

    return (
        <Box
            component="form"
            onSubmit={submit}
            className={classes.form}
            ref={ref}
            sx={(theme) => ({
                borderColor: focused ? theme.colors.gray[6] : theme.colors.gray[3]
            })} >
            <RichTextEditor classNames={title} editor={titleEditor}>
                {titleEditor && (
                    <BubbleMenu editor={titleEditor}>
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Link />
                        <RichTextEditor.Code />
                    </RichTextEditor.ControlsGroup>
                    </BubbleMenu>
                )}
                <RichTextEditor.Content />
            </RichTextEditor>
            <RichTextEditor classNames={description} editor={descriptionEditor}>
                {descriptionEditor && (
                    <BubbleMenu editor={descriptionEditor}>
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Link />
                        <RichTextEditor.Code />
                    </RichTextEditor.ControlsGroup>
                    </BubbleMenu>
                )}
                <RichTextEditor.Content />
            </RichTextEditor>
            <Group position="right">
                <ActionIcon disabled={!isValidTitle(data.title)} component="button" type="submit" variant="filled" color>
                    <IconSend />
                </ActionIcon>
                <ActionIcon onClick={close}>
                    <IconX />
                </ActionIcon>
            </Group>
        </Box>
    );
}
