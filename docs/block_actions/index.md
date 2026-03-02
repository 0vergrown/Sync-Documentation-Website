---
title: Block Action Types
date: 2024-01-07
---

# Block Action Types

Sync adds several block actions that can be used in data packs to create custom abilities and gameplay mechanics. These actions work alongside Apoli's existing action system.

## Available Block Actions

| Action                         | Description                                                    |
|--------------------------------|----------------------------------------------------------------|
| [Spawn Entity](./spawn_entity) | Spawns an entity at a block position                           |
| [Ghost Block](./ghost_block)   | Places a temporary block that reverts after specified duration |

## Using Sync Block Actions

Sync block actions are registered under the `sync` namespace and can be used anywhere Apoli block actions are accepted.

### Basic Structure
```json
{
  "type": "sync:action_type_name",
  // Action-specific fields...
}
```