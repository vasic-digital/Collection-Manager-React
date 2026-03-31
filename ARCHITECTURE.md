# Architecture -- Collection-Manager-React

## Purpose

React collection management components for Catalogizer. Provides collection listing, creation/editing forms, and smart collection rule building. Purely presentational -- all data fetching and actions delegated to parent via callbacks.

## Structure

```
src/
  index.ts                  Re-exports all components and prop types
  CollectionList.tsx        Grid of CollectionCards with loading state and create button
  CollectionCard.tsx        Single collection: name, description, badges, edit/delete actions
  CollectionForm.tsx        Create/edit form with name, description, public/smart toggles
  SmartRuleBuilder.tsx      Dynamic rule editor for smart collection filters
  __tests__/                Component tests
  __tests__/setup.ts        Test setup (jsdom)
```

## Key Components

- **`CollectionList`** -- Renders a grid of collections with optional create, open, edit, delete callbacks; handles loading and empty states
- **`CollectionCard`** -- Displays name (clickable), description, item count, Smart/Public badges, Edit/Delete buttons
- **`CollectionForm`** -- Create/edit form with validation; integrates SmartRuleBuilder when "Smart Collection" toggled on
- **`SmartRuleBuilder`** -- Dynamic rule list editor; each rule has field, operator (eq/ne/gt/lt/contains/not_contains), and value inputs; supports add/remove

## Data Flow

```
CollectionList(collections, onCreate, onOpen, onEdit, onDelete)
    |
    CollectionCard[] -> onClick -> onOpen(collection)
                     -> onEdit/onDelete callbacks
    |
CollectionForm(initial?, onSubmit, onCancel)
    |
    SmartRuleBuilder(rules, onChange) -> add/remove/modify rules -> onChange(updatedRules)
    |
    onSubmit(CreateCollectionRequest)
```

## Dependencies

- React 18+ (peer)
- `@vasic-digital/media-types` -- MediaCollection, SmartCollectionRule, CreateCollectionRequest

## Testing Strategy

Vitest with React Testing Library and jsdom. Tests cover collection card rendering, form validation, smart rule builder add/remove, and callback delegation.
