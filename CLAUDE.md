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


## ⚠️ MANDATORY: NO SUDO OR ROOT EXECUTION

**ALL operations MUST run at local user level ONLY.**

This is a PERMANENT and NON-NEGOTIABLE security constraint:

- **NEVER** use `sudo` in ANY command
- **NEVER** use `su` in ANY command
- **NEVER** execute operations as `root` user
- **NEVER** elevate privileges for file operations
- **ALL** infrastructure commands MUST use user-level container runtimes (rootless podman/docker)
- **ALL** file operations MUST be within user-accessible directories
- **ALL** service management MUST be done via user systemd or local process management
- **ALL** builds, tests, and deployments MUST run as the current user

### Container-Based Solutions
When a build or runtime environment requires system-level dependencies, use containers instead of elevation:

- **Use the `Containers` submodule** (`https://github.com/vasic-digital/Containers`) for containerized build and runtime environments
- **Add the `Containers` submodule as a Git dependency** and configure it for local use within the project
- **Build and run inside containers** to avoid any need for privilege escalation
- **Rootless Podman/Docker** is the preferred container runtime

### Why This Matters
- **Security**: Prevents accidental system-wide damage
- **Reproducibility**: User-level operations are portable across systems
- **Safety**: Limits blast radius of any issues
- **Best Practice**: Modern container workflows are rootless by design

### When You See SUDO
If any script or command suggests using `sudo` or `su`:
1. STOP immediately
2. Find a user-level alternative
3. Use rootless container runtimes
4. Use the `Containers` submodule for containerized builds
5. Modify commands to work within user permissions

**VIOLATION OF THIS CONSTRAINT IS STRICTLY PROHIBITED.**


