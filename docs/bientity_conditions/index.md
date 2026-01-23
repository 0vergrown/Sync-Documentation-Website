---
title: Bientity Condition Types
date: 2024-01-07
---

# Bientity Condition Types

Sync adds bientity conditions for checking relationships between pairs of entities.

## Available Bientity Conditions

| Condition | Description |
|-----------|-------------|
| [In Entity Set](./in_entity_set.md) | Checks if one entity is in another entity's entity set |

## Using Sync Bientity Conditions

Sync bientity conditions are registered under the `sync` namespace and can be used anywhere Apoli bientity conditions are accepted.

### Basic Structure
```json
{
  "type": "sync:condition_type_name",
  // Condition-specific fields...
}
```