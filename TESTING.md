# Testing

Vitest with browser mode for testing. Tests run in real browsers instead of JSDOM.

Tests live in `packages/kaios-core/`.

## Setup

### Dependencies
- `vitest` - Test runner
- `@vitest/browser` - Browser mode
- `@vitest/ui` - Visual interface
- `@testing-library/preact` - Preact Testing Library

### Configuration
- [packages/kaios-core/vitest.config.ts](packages/kaios-core/vitest.config.ts) - Browser mode with Firefox
- [packages/kaios-core/src/test/setup.ts](packages/kaios-core/src/test/setup.ts) - Global setup

## Commands

```bash
yarn test        # Watch mode
yarn test:ui     # Visual UI
yarn test:run    # Single run
```

## Writing Tests

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/preact';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeDefined();
  });
});
```

## Best Practices

1. Test behavior, not implementation
2. Use semantic queries (`getByRole`, `getByLabelText` over `getByTestId`)
3. Write accessible tests
4. Avoid testing internal state or private methods

## Why Browser Mode

- Real DOM APIs and events
- Actual CSS rendering
- Native browser features (fetch, localStorage)
- No polyfill conflicts
- Better debugging with browser dev tools
