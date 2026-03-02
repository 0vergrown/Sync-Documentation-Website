---
title: Disguised (Bi-entity Condition Type)
date: 2026-03-01
---

# Disguised

[Bi-entity Condition Types](https://origins.readthedocs.io/en/latest/types/bientity_condition_types/)

Checks whether the **actor** entity is disguised specifically as the **target** entity.

Type ID: `sync:disguised`

### Fields

*This condition type has no fields.*

### How It Works

- For **player disguises**, the condition returns `true` if the actor’s disguise target has the same UUID as the given target entity.
- For **entity disguises**, it returns `true` if the actor’s disguise target has the same entity type ID as the given target entity.
- Works on both server and client sides.

### Examples

```json
{
  "type": "sync:disguised",
  "inverted": true
}
```
True when the actor is either not disguised, or disguised as something else than the target.