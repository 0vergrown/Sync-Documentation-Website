---
title: Disguise As (Entity Action)
date: 2024-01-07
---

# Disguise As

[Entity Action Types](https://origins.readthedocs.io/en/latest/types/entity_action_types/)

Applies a visual disguise to a living entity, making it appear as a different entity type to all nearby players. Works alongside the [Disguised](../entity_conditions/disguised.md) condition and [Remove Disguise](./remove_disguise.md) action.

Type ID: `sync:disguise_as`

### Fields

| Field           | Type                                                                                 | Default    | Description                                                                                 |
|-----------------|--------------------------------------------------------------------------------------|------------|---------------------------------------------------------------------------------------------|
| `entity_type`   | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/)  | *required* | The entity type to disguise as                                                              |
| `display_name`  | [Text](https://origins.readthedocs.io/en/latest/types/data_types/text/)              | *optional* | Override the name shown in Jade / nameplates. Defaults to the entity type's translation key |
| `overwrite`     | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)        | `true`     | If `false`, the action does nothing when the entity already has an active disguise          |
| `before_action` | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/) | *optional* | Executed on the entity immediately before the disguise is applied                           |
| `after_action`  | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/) | *optional* | Executed on the entity immediately after the disguise is applied                            |

### Notes

- Only works on `LivingEntity` instances server-side.
- The disguise is cosmetic only (hitboxes, collision, and AI are unchanged).
- Disguises are synced to all connected players, including any who join after the disguise is applied.
- Use `"overwrite": false` to prevent overwriting an existing disguise (e.g. apply only if not already disguised).

### Examples

```json
{
    "type": "sync:disguise_as",
    "entity_type": "minecraft:creeper"
}
```
Makes the entity appear as a creeper.

```json
{
  "type":"sync:disguise_as",
  "entity_type":"minecraft:villager",
  "display_name":{
    "text":"Suspicious Merchant",
    "italic":true,
    "color":"gray"
  },
  "overwrite":false
}
```
Disguises the entity as a villager with a custom name, but only if not already disguised.