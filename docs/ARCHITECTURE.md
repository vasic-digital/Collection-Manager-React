# Architecture — @vasic-digital/collection-manager

## Overview

Controlled React components for managing Catalogizer media collections. Supports both regular and smart (rule-based) collections.

## Design Patterns

- **Controlled Components**: All form state is managed internally but final data is emitted via `onSubmit`
- **Composite**: `CollectionForm` composes `SmartRuleBuilder` when `is_smart` is enabled
- **Builder**: `SmartRuleBuilder` implements the Builder pattern — incrementally constructs a `SmartCollectionRule[]` array
- **Command**: `onEdit`, `onDelete`, `onOpen` callbacks on `CollectionCard` are command handlers

## Component Hierarchy

```
CollectionList
  └── CollectionCard (×N)
        └── [edit/delete buttons]

CollectionForm
  └── SmartRuleBuilder (when is_smart enabled)
        └── [rule rows with field/operator/value inputs]
```
