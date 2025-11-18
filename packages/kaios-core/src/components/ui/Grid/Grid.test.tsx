import { render, screen } from '@testing-library/preact';
import { describe, expect, it } from 'vitest';

import Grid from './Grid';

describe('Grid', () => {
  it('renders children correctly', () => {
    render(
      <Grid>
        <div>Test content</div>
      </Grid>
    );

    expect(screen.getByText('Test content')).toBeDefined();
  });

  it('renders with correct default columns class', () => {
    render(
      <Grid>
        <div>Content</div>
      </Grid>
    );

    const gridElement = screen.getByRole('list');
    expect(gridElement.className).toContain('columns-4');
  });

  it('renders with custom columns', () => {
    render(
      <Grid columns={5}>
        <div>Content</div>
      </Grid>
    );

    const gridElement = screen.getByRole('list');
    expect(gridElement.className).toContain('columns-5');
  });
});
