import { Text, ActionIcon, Group, createStyles, rem } from '@mantine/core';
import { IconSend, IconX } from '@tabler/icons-react';
import { useEditor, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { RichTextEditor, Link} from '@mantine/tiptap';
import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { useForm } from '@mantine/form';
import { useForm as useInertiaForm } from '@inertiajs/react';

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

export default function TodoForm({close, submit, todo}) {
    const { classes: title } = useTitleStyles();
    const { classes: description } = useDescriptionStyles();

    const form = useForm({
        initialValues: {
            title: '',
            description: '',
        },
        validate: {
            title: (value) => value.replace(/^(<p>)+|(<\/p>)+$/gi, "").length > 0 ? null : 'Title is required',
        },
    });

    const { data, setData, patch, clearErrors, reset, errors } = useInertiaForm({
        message: '',
    });

    const titleEditor = useEditor({
        extensions: [StarterKit, Link,
            NoNewLine.configure({ onEnter: submit}),
            Placeholder.configure({ placeholder: 'Task name' })],
        content: form.values.title,
        onUpdate: ({ editor }) => {
            form.setFieldValue('title', editor.getHTML());
        },
    });

    const descriptionEditor = useEditor({
        extensions: [StarterKit, Link,
            Placeholder.configure({ placeholder: 'Description' })],
        content: form.values.description,
        onUpdate: ({ editor }) => {
            form.setFieldValue('description', editor.getHTML());
        }
    });

    return (
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
                <ActionIcon disabled={ !form.isValid() } component="button" type="submit" variant="filled" color>
                    <IconSend />
                </ActionIcon>
                <ActionIcon onClick={close}>
                    <IconX />
                </ActionIcon>
            </Group>
        </form>
    );
}
