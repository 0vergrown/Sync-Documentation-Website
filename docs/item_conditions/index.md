---
title: Item Condition Types
date: 2024-12-20
---

# Item Condition Types

Sync adds item conditions that allow you to check properties of the item itself or the entity holding it.

## Available Item Conditions

| Condition                                 | Description                                                                |
|-------------------------------------------|----------------------------------------------------------------------------|
| [Fuel](./fuel.md)                         | Compares the item’s fuel burn time against a specified value.              |
| [Holder Condition](./holder_condition.md) | Checks whether the entity holding this item stack meets a given condition. |
| [Mod Loaded](./mod_loaded.md)             | Checks if one or more Fabric mods are loaded                               |

## Using Sync Item Conditions

Sync item conditions are registered under the `sync` namespace and can be used anywhere Apoli item conditions are accepted.

### Basic Structure
```json
{
  "type": "sync:condition_type_name",
  // Condition-specific fields...
}
```
