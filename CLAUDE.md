# CLAUDE.md - Collection-Manager-React

## Overview

React components for managing user-curated media collections in Catalogizer, including smart collection rule building.

**Package**: `@vasic-digital/collection-manager`

## Build & Test

```bash
npm install
npm run build        # tsc
npm run test         # vitest run
npm run lint         # tsc --noEmit
npm run clean        # rm -rf dist
```

## Code Style

- TypeScript strict mode
- PascalCase components, camelCase functions
- Imports grouped: React, third-party, internal (`@vasic-digital/*`)
- Tests: Vitest with React Testing Library and jsdom environment
- All interactive elements have `data-testid` attributes

## Package Structure

| Path | Purpose |
|------|---------|
| `src/index.ts` | Re-exports all components and prop types |
| `src/CollectionList.tsx` | Grid of CollectionCards with loading state and create button |
| `src/CollectionCard.tsx` | Single collection display with name, description, badges, actions |
| `src/CollectionForm.tsx` | Create/edit form with name, description, public/smart toggles |
| `src/SmartRuleBuilder.tsx` | Dynamic rule editor for smart collection filters |
| `src/__tests__/` | Component tests |
| `src/__tests__/setup.ts` | Test setup (jsdom) |

## Key Exports

- `CollectionList` -- Renders a grid of collections with optional create, open, edit, delete callbacks; handles loading and empty states
- `CollectionCard` -- Displays a single collection: name (clickable), description, item count, Smart/Public badges, Edit/Delete buttons
- `CollectionForm` -- Form for creating/editing collections with validation; integrates SmartRuleBuilder when "Smart Collection" is toggled on
- `SmartRuleBuilder` -- Dynamic rule list editor; each rule has field, operator (eq/ne/gt/lt/contains/not_contains), and value inputs; supports add/remove

## Dependencies

- **Peer**: `react ^18.0.0`
- **Internal**: `@vasic-digital/media-types` (MediaCollection, SmartCollectionRule, CreateCollectionRequest)

## Design Patterns

- **Controlled components**: All form state managed via React `useState`; SmartRuleBuilder receives rules via props and calls `onChange` on mutation
- **Composition**: CollectionList composes CollectionCard; CollectionForm composes SmartRuleBuilder
- **Callback delegation**: UI components are stateless regarding data fetching; all actions (open, edit, delete, submit) delegated to parent via props

## Commit Style

Conventional Commits: `feat(collection-manager): description`
