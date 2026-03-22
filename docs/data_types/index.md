---
title: Data Types
date: 2026-03-01
---

# Data Types

Sync adds custom data types that are used to configure various power types and actions with structured data.

## Available Data Types

| Data Type                                                     | Description                                                             |
|---------------------------------------------------------------|-------------------------------------------------------------------------|
| [Body Part Modifier Entry](./body_part_modifier_entry.md)     | Body region and the damage modifier(s) to apply when that region is hit |
| [Data-Driven Keybinds](./data_driven_keybinds.md)             | Server-defined keybinds automatically synced to clients                 |
| [Functional Key](./functional_key.md)                         | A keybind that can trigger an action when pressed                       |
| [Message Consumer](./message_consumer.md)                     | A regex filter with before/after actions for message interception       |
| [Model Part Transformations](./model_part_transformations.md) | Transformations to apply to entity model parts                          |
| [Radial Menu Entry](./radial_menu_entry.md)                   | Configuration for a single radial menu button                           |

## Using Data Types in Sync

Data types in Sync are used in power types, conditions, and actions. They are registered under the `sync` namespace and can be used alongside standard Apoli data types.

### Basic Structure

Data types are typically used as fields within larger configurations:

```json
{
  "type": "sync:modify_model_parts",
  "transformations": [
    // Model Part Transformation data type used here
  ]
}
```
