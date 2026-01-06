import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Title, Subtitle, Description } from '@storybook/blocks';

const meta: Meta = {
  title: 'Welcome',
  tags: ['autodocs'],
  parameters: {
    viewMode: 'docs',
    previewTabs: {
      canvas: { hidden: true },
    },
    docs: {
      page: () => (
        <div
          style={{
            // backgroundColor: 'white',
            minHeight: '100vh',
            padding: '2rem',
          }}
        >
          <Title />
          <Subtitle>Component Library Documentation</Subtitle>
          <Description>
            This Storybook showcases the reusable UI components available in the
            application. Explore components, view their props and variations,
            and see interactive examples to help you build consistent
            interfaces.
          </Description>

          <h2>What you'll find</h2>
          <ul style={{ paddingLeft: '1.5rem', marginLeft: 0 }}>
            <li>Interactive component examples with live previews</li>
            <li>Props documentation and usage guidelines</li>
            <li>Component variations and states</li>
            <li>Accessibility information</li>
          </ul>
        </div>
      ),
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Minimal story component to satisfy Storybook's requirement
export const Intro: Story = {
  render: () => (
    <div
      style={{
        backgroundColor: 'white',
        padding: '2rem',
        paddingBottom: '3rem',
        textAlign: 'center',
      }}
    >
      <h1>Welcome</h1>

      <div
        style={{
          maxWidth: '800px',
          margin: '2rem auto',
          textAlign: 'left',
        }}
      >
        <section style={{ marginBottom: '2rem' }}>
          <h2>What is a Story?</h2>
          <p>
            A story is an isolated example of a component that demonstrates its
            appearance and behavior. Each story shows a component in a specific
            state or configuration, making it easy to see how components look
            and work in different scenarios.
          </p>
        </section>
        <section>
          <h2>What to expect on story pages</h2>
          <ul style={{ paddingLeft: '1.5rem', marginLeft: 0 }}>
            <li>
              <strong>Interactive Canvas:</strong> See the component rendered
              live. You can interact with it to test its behavior and see how it
              responds to user actions.
            </li>
            <li>
              <strong>Controls Panel:</strong> Adjust component props in
              real-time using the controls addon. Experiment with different
              values to see how the component changes.
            </li>
            <li>
              <strong>Documentation Tab:</strong> View detailed information
              about the component, including prop descriptions, usage examples,
              and implementation guidelines.
            </li>
            <li>
              <strong>Code Examples:</strong> See the code used to render each
              story, making it easy to copy and use in your own implementation.
            </li>
          </ul>
        </section>
      </div>

      <p>Browse the sidebar to explore available components.</p>
    </div>
  ),
};
