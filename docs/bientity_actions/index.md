---
title: Bientity Action Types
date: 2026-03-01
---

# Bientity Action Types

Sync adds specialized bientity action types that work with its Entity Set power system, disguise system, command execution, and entity conversion.

## Available Bientity Action Types

| Action Type                                           | Description                                  |
|-------------------------------------------------------|----------------------------------------------|
| [Add to Entity Set](./add_to_entity_set.md)           | Adds an entity to an Entity Set              |
| [Convert Entity](./convert_entity.md)                 | Converts the target entity into another type |
| [Disguise](./disguise.md)                             | Makes the actor appear as the target         |
| [Execute Command](./execute_command.md)               | Executes a command with UUID placeholders    |
| [Remove from Entity Set](./remove_from_entity_set.md) | Removes an entity from an Entity Set         |

## How Bientity Actions Work

Bientity actions in Sync operate on pairs of entities: an **actor** (the entity performing the action) and a **target** (the entity being acted upon).

## Using Sync Bientity Actions
Sync's bientity actions are registered under the `sync` namespace and can be used anywhere Apoli bientity actions are accepted.

### Basic Structure
```json
{
  "type": "sync:action_type_name",
  // Action-specific fields...
}
```