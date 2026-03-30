# AGENTS.md - Collection-Manager-React Multi-Agent Coordination

## Module Identity

- **Package**: `@vasic-digital/collection-manager`
- **Role**: React components for managing user-curated media collections with smart collection rule building
- **Peer Dependencies**: `react ^18.0.0`
- **Internal Dependencies**: `@vasic-digital/media-types`
- **TypeScript**: Strict mode

## Agent Responsibilities

### Collection Manager Agent

The Collection Manager agent owns all collection UI components:

1. **CollectionList** (`src/CollectionList.tsx`) -- Grid of `CollectionCard` components with loading state and create button. Supports `onCreate`, `onOpen`, `onEdit`, `onDelete` callbacks. Handles empty state.

2. **CollectionCard** (`src/CollectionCard.tsx`) -- Single collection display: clickable name, description, item count badge, Smart/Public badges, Edit/Delete action buttons.

3. **CollectionForm** (`src/CollectionForm.tsx`) -- Create/edit form with name, description, public/smart toggles, and validation. Integrates `SmartRuleBuilder` when "Smart Collection" is toggled on. Supports both create and edit modes via optional `initialData`.

4. **SmartRuleBuilder** (`src/SmartRuleBuilder.tsx`) -- Dynamic rule list editor for smart collection filters. Each rule has field, operator (eq/ne/gt/lt/contains/not_contains), and value inputs. Supports add/remove operations.

## Cross-Agent Coordination

### Upstream Dependencies

| Package | What Is Used | Coordinate When |
|---------|-------------|-----------------|
| `@vasic-digital/media-types` | `MediaCollection`, `SmartCollectionRule`, `CreateCollectionRequest` | Collection type or rule operator changes |

### Coordination Rules

- These are **controlled components**: all form state managed via React `useState`. Data fetching and persistence belong in the host application.
- `SmartCollectionRule` operator set (eq/ne/gt/lt/contains/not_contains) is defined in `@vasic-digital/media-types`. Adding a new operator requires updating the `SmartRuleBuilder` select options.
- Collection CRUD callbacks are delegated to the parent. The host application is responsible for calling `CollectionService` from `@vasic-digital/catalogizer-api-client`.

## File Map

```
Collection-Manager-React/
  src/
    index.ts                           -- Re-exports all components and prop types
    CollectionList.tsx                  -- Grid of collection cards with create button
    CollectionCard.tsx                  -- Single collection display with actions
    CollectionForm.tsx                  -- Create/edit form with smart rule integration
    SmartRuleBuilder.tsx               -- Dynamic filter rule editor
    __tests__/
      CollectionList.test.tsx          -- List rendering and callback tests
      CollectionCard.test.tsx          -- Card rendering and action tests
      CollectionForm.test.tsx          -- Form validation and submission tests
      SmartRuleBuilder.test.tsx        -- Rule add/remove/edit tests
      setup.ts                         -- Test setup (jsdom)
```

## Testing Standards

```bash
npm install
npm run build        # tsc
npm run test         # vitest run
npm run lint         # tsc --noEmit
```

Tests use Vitest with React Testing Library and jsdom environment. All interactive elements have `data-testid` attributes.

## Conventions

- Controlled components: form state managed via `useState`, changes reported via `onChange` callbacks
- Composition: CollectionList -> CollectionCard; CollectionForm -> SmartRuleBuilder
- Callback delegation: all actions (open, edit, delete, submit) delegated to parent via props
- Presentational: no data fetching in any component

## Constraints

- **No CI/CD pipelines**: GitHub Actions, GitLab CI/CD, and all automated pipeline configurations are permanently disabled. All testing is local.
- **No data fetching**: Components receive all data via props. API calls belong in the host application.
- **No form libraries**: Forms use native React state management (`useState`), not React Hook Form or Formik.
