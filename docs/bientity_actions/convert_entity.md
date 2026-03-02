---
title: Convert Entity (Bi-entity Action Type)
date: 2026-03-01
---

# Convert Entity

[Bi-entity Action Types](https://origins.readthedocs.io/en/latest/types/bientity_action_types/)

Converts the **target** entity into a different entity type. The conversion respects Minecraft's natural conversion rules (e.g., zombie villagers turning into villagers, husks turning into zombies, etc.) and can optionally be affected by the world difficulty. Special care is taken to preserve data when converting villagers to zombie villagers (trades, gossip, XP).

Type ID: `sync:convert_entity`

### Fields

| Field               | Type                                                                                  | Default | Description                                                                                                                                                                                         |
|---------------------|---------------------------------------------------------------------------------------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `convert_to`        | [Entity Type](https://origins.readthedocs.io/en/latest/types/data_types/entity_type/) |         | The entity type to convert the target into.                                                                                                                                                         |
| `ignore_difficulty` | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)         | `true`  | If `false`, the conversion will only succeed depending on the world difficulty:<ul><li>**Peaceful/Easy**: never converts</li><li>**Normal**: 50% chance</li><li>**Hard**: always converts</li></ul> |

### How It Works

- The action attempts to convert the **target** entity (which must be a `MobEntity`) into the specified `convert_to` entity type.
- The conversion uses the entity's own `convertTo` method, which handles spawning the new entity, copying position, equipment, custom name, and other basic properties.
- **Villager to Zombie Villager conversion is special**: if the target is a `VillagerEntity` and `convert_to` is `minecraft:zombie_villager`, the action:
    - Preserves the villager's profession, trades (offers), gossip data, and experience.
    - Triggers the zombie infecting villager sound and particle event (unless the actor is silent).
- For all other conversions, the entity is simply replaced with the new type, copying equipment if the `convertTo` method's `keepEquipment` parameter is `true` (the action uses `true`).
- The conversion will fail silently if the target is not a `MobEntity` or if the world is not a `ServerWorld`.

### Examples
```json
{
  "type": "sync:convert_entity",
  "convert_to": "minecraft:zombie_villager"
}
```
Turn a villager into a zombie villager, regardless of difficulty.

### Notes

- The conversion is **not** reversible by this action alone; you would need another action to convert back.
- When a villager is converted to a zombie villager, the original villager is removed and a new zombie villager is spawned with all the villager's data. This matches vanilla zombie infection behavior.
- For other conversions (e.g., husk to zombie, zombie to drowned), the vanilla conversion logic is used, including the appropriate sound and particle events.
- The `ignore_difficulty` field allows you to bypass or enforce the natural difficulty checks that normally apply to conversions like zombie infections.