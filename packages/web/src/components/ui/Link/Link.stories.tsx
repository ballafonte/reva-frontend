import type { Meta, StoryObj } from '@storybook/react';
import { Contexts } from '@reva-frontend/common/theme';
import { Link } from './Link';
import { Box, Typography } from '@mui/material';

const contextOptions = Object.values(Contexts);

const meta = {
  title: 'UI/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    context: {
      control: 'select',
      options: contextOptions,
      // labels: {
      //   none: 'Default (LINK color)',
      //   ...Object.fromEntries(
      //     contextOptions.map((context) => [context, context])
      //   ),
      // },
      description:
        'Context color for the link. When not provided, uses default LINK color.',
      table: {
        type: { summary: 'ContextType | undefined' },
        defaultValue: { summary: 'undefined' },
      },
    },
    href: {
      control: 'text',
      description: 'URL to navigate to',
      table: {
        type: { summary: 'string' },
      },
    },
    target: {
      control: 'select',
      options: ['_blank', '_self', '_parent', '_top'],
      description: 'Target for the link',
      table: {
        type: { summary: 'string' },
      },
    },
    rel: {
      control: 'select',
      options: [
        'noopener noreferrer',
        'noreferrer',
        'opener',
        'nofollow',
        'noindex',
        'noarchive',
        'nosnippet',
        'noimageindex',
        'nocache',
        'noindex, nofollow',
        'noindex, noarchive',
        'noindex, noimageindex',
        'noindex, noarchive, noimageindex',
        'noindex, noarchive, noimageindex, nofollow',
        'noindex, noarchive, noimageindex, nofollow, noindex, noarchive, noimageindex, nofollow',
      ],
      description: 'Rel for the link',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      control: 'text',
      description: 'Link content',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '/example',
    children: 'Link',
  },
};

export const WithContext: Story = {
  args: {
    children: 'Link',
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography>Default (LINK color):</Typography>
      <Link href="/example" target="_blank" rel="noopener noreferrer">
        Default Link
      </Link>

      <Typography sx={{ mt: 2 }}>With context:</Typography>
      {contextOptions.map((context) => (
        <Link
          key={context}
          href="/example"
          context={context}
          target="_blank"
          rel="noopener noreferrer"
        >
          Link with {context} context
        </Link>
      ))}
    </Box>
  ),
  argTypes: {
    context: { control: false, table: { disable: true } },
    href: { control: false, table: { disable: true } },
  },
};

export const InText: Story = {
  args: {
    children: 'Link',
  },
  render: () => (
    <Typography>
      This is a paragraph with a{' '}
      <Link href="/example" target="_blank" rel="noopener noreferrer">
        default link
      </Link>{' '}
      and a{' '}
      <Link
        href="/example"
        context="primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        primary link
      </Link>{' '}
      embedded in the text.
    </Typography>
  ),
  argTypes: {
    context: { control: false, table: { disable: true } },
    href: { control: false, table: { disable: true } },
  },
};
