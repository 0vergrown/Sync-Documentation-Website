---
title: In Pose (Entity Condition)
date: 2024-01-07
---

# In Pose

[Entity Condition Types](https://origins.readthedocs.io/en/latest/types/entity_condition_types/)

Checks if an entity is in a specific pose. Poses include standing, crouching, swimming, sleeping, etc.

Type ID: `sync:in_pose`

### Fields

| Field  | Type                                                  | Default | Description           |
|--------|-------------------------------------------------------|---------|-----------------------|
| `pose` | [Entity Pose](../power_types/pose#available-poses.md) |         | The pose to check for |

### Notes

- Works on all entities that support poses
- Some poses are specific to certain entities (e.g., `using_tongue` for frogs)

### Examples

```json
{
    "type": "sync:in_pose",
    "pose": "crouching"
}
```
This example checks if an entity is sneaking/crouching.