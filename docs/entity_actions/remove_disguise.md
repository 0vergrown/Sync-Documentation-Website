---
title: Remove Disguise (Entity Action Type)
date: 2026-03-01
---

# Remove Disguise

[Entity Action Types](https://origins.readthedocs.io/en/latest/types/entity_action_types/)

Removes any active disguise from the entity, if one exists. The entity will revert to its normal appearance.

Type ID: `sync:remove_disguise`

### Fields

*This action type has no fields.*

### How It Works

- If the entity is currently disguised (by the [`Disguise`](../bientity_actions/disguise.md) Bi-entity Action Type), the disguise is cleared.
- Works on both players and any Living Entity.
- After removal, the entity’s appearance returns to normal for all clients.
- Does nothing if the entity was not disguised.

### Examples

```json
{
  "type": "sync:remove_disguise"
}
```
Removes the disguise from the entity this action is executed on.