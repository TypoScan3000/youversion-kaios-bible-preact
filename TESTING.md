# Testing Setup

This project uses Vitest with browser mode for testing, following best practices from [Artem Zakharchenko's recommendations](https://www.epicweb.dev/why-i-won-t-use-jsdom).

## Why Browser Mode?

Instead of using JSDOM (which runs in Node.js and pretends to be a browser), we use Vitest Browser Mode which runs tests in actual browsers. This provides:

- Real browser APIs and behavior
- No polyfill issues or compatibility problems
- More reliable tests that match production environment
- Better performance than JSDOM

## Setup

### Dependencies
- `vitest` - Test runner
- `@vitest/browser` - Browser mode support
- `@vitest/ui` - Visual test interface
- `@testing-library/preact` - Preact Testing Library

### Configuration
- `vitest.config.ts` - Configures browser mode with Chromium
- `src/test/setup.ts` - Global test setup

## Running Tests

```bash
# Run tests in watch mode
yarn test

# Run tests with UI
yarn test:ui

# Run tests once
yarn test:run
```

## Writing Tests

Use Preact Testing Library for component testing:

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

1. **Test behavior, not implementation** - Focus on what users see and do
2. **Use semantic queries** - Prefer `getByRole`, `getByLabelText` over `getByTestId`
3. **Write accessible tests** - Use queries that work with screen readers
4. **Avoid testing implementation details** - Don't test internal state or private methods

## Browser Mode Benefits

- Real DOM APIs and events
- Actual CSS rendering
- Native browser features (fetch, localStorage, etc.)
- No polyfill conflicts
- Better debugging with browser dev tools 