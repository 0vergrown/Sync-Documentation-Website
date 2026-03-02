---
title: Disguise (Bi-entity Action Type)
date: 2026-03-01
---

# Disguise

[Bi-entity Action Types](https://origins.readthedocs.io/en/latest/types/bientity_action_types/)

Makes the **actor** entity appear as the **target** entity. The disguise is visible to all other players and persists until removed (e.g. via death, disconnect, or the [`Remove Disguise`](../entity_actions/remove_disguise.md) entity action). Disguises can be either **player‑to‑player** (skin swap) or **any‑entity‑to‑any‑entity** (visual replacement).

Type ID: `sync:disguise`

### Fields

| Field       | Type                                                                          | Default | Description                                                                                         |
|-------------|-------------------------------------------------------------------------------|---------|-----------------------------------------------------------------------------------------------------|
| `overwrite` | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/) | `true`  | If `false`, the disguise will not be applied when the actor is already disguised as something else. |

### How It Works

- The disguise is stored **server‑side** and automatically synced to all nearby clients.
- **Player disguises** (`target` is a player): the actor’s skin, arm model (slim/wide), and display name are replaced with those of the target player.
- **Entity disguises** (`target` is any other entity): the actor is rendered using the model, textures, and animations of the target entity type. The original entity’s AI and behavior remain unchanged – only the visual appearance is overridden.
- When the actor dies or leaves the server, the disguise is automatically removed.

### Examples

```json
{
  "type": "sync:disguise",
  "overwrite": false
}
```
If the actor is already disguised, nothing happens.