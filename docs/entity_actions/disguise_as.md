---
title: Disguise As (Entity Action)
date: 2024-01-07
---

# Disguise As

[Entity Action Types](https://origins.readthedocs.io/en/latest/types/entity_action_types/)

Applies a visual disguise to a living entity, making it appear as a different entity type to all nearby players. Works alongside the [Disguised](../entity_conditions/disguised.md) condition and [Remove Disguise](./remove_disguise.md) action.

Type ID: `sync:disguise_as`

### Fields

| Field           | Type                                                                                                  | Default    | Description                                                                                                                                   |
|-----------------|-------------------------------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| `entity_type`   | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/)                   | *required* | The entity type to disguise as                                                                                                                |
| `nbt`           | [NBT](https://origins.readthedocs.io/en/latest/types/data_types/nbt/)                                 | *optional* | NBT data applied to the disguise entity. Used to set visual attributes such as variant, color, size, or custom name that the disguise adopts  |
| `overwrite`     | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)                         | `true`     | If `false`, the action does nothing when the entity already has an active disguise                                                            |
| `before_action` | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/)                  | *optional* | Executed on the entity immediately before the disguise is applied                                                                             |
| `after_action`  | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/)                  | *optional* | Executed on the entity immediately after the disguise is applied                                                                              |

### Notes

- Only works on `LivingEntity` instances server-side.
- The disguise is cosmetic only (hitboxes, collision, and AI are unchanged).
- Disguises are synced to all connected players, including any who join after the disguise is applied.
- Use `"overwrite": false` to prevent overwriting an existing disguise (e.g. apply only if not already disguised).
- The `nbt` field is applied to a client-side dummy entity of the target type. This means entity-type-specific NBT keys work (e.g. `Variant` for cats/foxes, `Size` for slimes, `CustomName` for the nameplate label).
- If `nbt` contains a `CustomName` key, that name is shown on the entity's nameplate instead of the entity type's default translation key.
- When disguising as a player, the skin of that player is used; the `nbt` field is ignored for player disguises.

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
  "type": "sync:disguise_as",
  "entity_type": "minecraft:slime",
  "nbt": "{Size:3}"
}
```
Disguises the entity as a large slime (size 3).

```json
{
  "type": "sync:disguise_as",
  "entity_type": "minecraft:villager",
  "nbt": "{CustomName:{text:Suspicious Merchant,italic:true,color:gray}}",
  "overwrite": false
}
```
Disguises the entity as a villager with a custom nameplate, but only if not already disguised.