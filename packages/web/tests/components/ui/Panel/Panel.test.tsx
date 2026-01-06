import { render, screen } from '@tests/utils/test-utils';
import { Panel } from '@/components/ui/Panel/Panel';

describe('Panel', () => {
  it('should render panel with children', () => {
    render(
      <Panel>
        <div>Panel Content</div>
      </Panel>
    );

    expect(screen.getByText('Panel Content')).toBeInTheDocument();
  });

  it('should render panel with header', () => {
    render(
      <Panel header={{ title: 'Panel Title' }}>
        <div>Panel Content</div>
      </Panel>
    );

    expect(screen.getByText('Panel Title')).toBeInTheDocument();
  });

  it('should render panel with footer', () => {
    render(
      <Panel footer={{ children: 'Footer Content' }}>
        <div>Panel Content</div>
      </Panel>
    );

    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });
});
