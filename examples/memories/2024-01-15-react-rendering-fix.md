## Context: React ProductList component performance

## The Problem: Component was re-rendering on every keystroke in the search bar, causing significant lag when displaying 500+ items. Users experienced 2-3 second delays when typing.

## The Solution: Wrapped the ProductList component in React.memo() and used useCallback for event handlers. Also implemented virtualization with react-window for the list rendering. Performance improved from 2000ms to 50ms per render.

## The Rule: Always memoize list components displaying 100+ items and use virtualization for lists over 50 items.

---
*Created: 2024-01-15T14:30:00Z*
*Tags: react, performance, optimization*
