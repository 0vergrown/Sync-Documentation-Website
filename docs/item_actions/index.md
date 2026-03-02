---
title: Item Action Types
date: 2024-12-20
---

# Item Action Types

Sync adds item actions that can be used in data packs to interact with the entity holding an item. These actions work alongside Apoli’s existing action system.

## Available Item Actions

| Action                              | Description                                                                |
|-------------------------------------|----------------------------------------------------------------------------|
| [Holder Action](./holder_action.md) | Executes an entity action on the entity currently holding this item stack. |

## Using Sync Item Actions

Sync item actions are registered under the `sync` namespace and can be used anywhere Apoli item actions are accepted.

### Basic Structure
```json
{
  "type": "sync:action_type_name",
  // Action-specific fields...
}
```