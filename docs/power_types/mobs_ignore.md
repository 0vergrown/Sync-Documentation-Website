---
title: Mobs Ignore (Power Type)
date: 2024-01-07
---

# Mobs Ignore

[Power Types](https://origins.readthedocs.io/en/latest/types/power_types/)

Makes hostile mobs ignore the entity with this power. Mobs can be "provoked" to attack if the entity attacks them first.

Type ID: `sync:mobs_ignore`

### Fields

Field | Type | Default | Description
------|------|---------|-------------
`mob_condition` | [Entity Condition](https://origins.readthedocs.io/en/latest/types/entity_condition_types/) | *optional* | Condition that mobs must meet to ignore the entity.
`bientity_condition` | [Bi-Entity Condition](https://origins.readthedocs.io/en/latest/types/bientity_condition_types/) | *optional* | Condition that must be met between mob and entity.
`provokable` | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/) | `true` | Whether mobs can be provoked to attack if damaged.

### Notes

- Only affects hostile mobs' targeting AI
- Provoked mobs remain angry until they lose track
- Works server-side to prevent actual attacks
- Visual aggression (red eyes) may still show

### Examples

```json
{
    "type": "sync:mobs_ignore",
    "mob_condition": {
        "type": "apoli:entity_type",
        "entity_type": "minecraft:zombie"
    },
    "provokable": false
}
```
This example makes zombies completely ignore the entity, even if attacked.