---
title: Attached to Rope (Entity Condition)
date: 2026-04-08
---

# Attached to Rope

[Entity Condition Types](https://origins.readthedocs.io/en/latest/types/entity_condition_types/)

Returns `true` when the entity is a player currently attached to a rope via the [Attach Rope (Entity Action)](../entity_actions/attach_rope.md).

Type ID: `sync:attached_to_rope`

### Fields

This condition has no additional fields.

### Notes

- Always returns `false` for non-player entities.
- The condition reflects server-side rope state; it becomes `true` the moment a rope is successfully attached and `false` immediately after it is detached.

### Examples

```json
{
  "type": "sync:attached_to_rope"
}
```
Checks if the entity is currently attached to a rope.