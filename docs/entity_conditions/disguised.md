---
title: Disguised (Entity Condition Type)
date: 2026-03-01
---

# Disguised

[Entity Condition Types](https://origins.readthedocs.io/en/latest/types/entity_condition_types/)

Checks whether the entity is currently disguised by the `Disguise` Bi-entity action.

Type ID: `sync:disguised`

### Fields

*This condition type has no fields.*

### How It Works

- Works on both the **server** (using the server‑side disguise registry) and the **client** (using the client’s cached disguise data).
- Returns `true` if the entity has an active disguise of any kind (player skin swap or entity model replacement).

### Examples

```json
{
  "type": "sync:disguised",
  "inverted": true
}
```
Checks when the entity is **not** disguised.