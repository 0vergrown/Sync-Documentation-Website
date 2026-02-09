---
title: Revoke Power (Entity Action)
date: 2024-01-07
---

# Revoke Power

[Entity Action Types](https://origins.readthedocs.io/en/latest/types/entity_action_types/)

Removes a specific power from an entity, regardless of which source(s) granted it.

Type ID: `sync:revoke_power`

### Fields

Field | Type | Default | Description
------|------|---------|-------------
`power` | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/) | | The power type to remove (e.g., `"origins:water_breathing"`)

### How It Works

This action removes all instances of the specified power from the target entity, removing it from all sources that granted it. For example, if a power was granted by both an origin and a command, this action will remove both instances.

The entity's power component is automatically synchronized after removal.

### Notes

- Works on any entity with power components (primarily players)
- Removes the power from all sources
- Has no effect if the entity doesn't have the specified power
- Power removal is immediate and permanent (until re-granted)

### Examples

```json
{
    "type": "sync:revoke_power",
    "power": "origins:water_breathing"
}
```
Removes the water breathing power from the entity.

```json
{
    "type": "apoli:and",
    "actions": [
        {
            "type": "sync:revoke_power",
            "power": "sync:transformation_stage_1"
        },
        {
            "type": "apoli:grant_power",
            "power": "sync:transformation_stage_2",
            "source": "sync:evolution"
        }
    ]
}
```
Removes one transformation stage and grants the next.