---
title: Disguise As Player (Entity Action)
date: 2026-04-09
---

# Disguise As Player

[Entity Action Types](https://origins.readthedocs.io/en/latest/types/entity_action_types/)

Applies a visual disguise to a living entity, making it appear as a named player — even if that player is **not currently online**. The player's UUID is resolved from the server's user cache, and their skin is fetched asynchronously from Mojang's skin servers so other clients render the correct appearance.

This action is the counterpart to the [Disguise](../bientity_actions/disguise.md) bi-entity action: instead of requiring a live target entity, it accepts a player name as a plain string. Use it alongside the [Disguised](../entity_conditions/disguised.md) condition and [Remove Disguise](./remove_disguise.md) action.

Type ID: `sync:disguise_as_player`

### Fields

| Field           | Type                                                                                                  | Default    | Description                                                                                                                                                              |
|-----------------|-------------------------------------------------------------------------------------------------------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `player_name`   | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/)                           | *required* | The username of the player to disguise as. The player must have joined this server at least once so their profile is stored in the server's user cache (`usercache.json`) |
| `overwrite`     | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)                         | `true`     | If `false`, the action does nothing when the entity already has an active disguise                                                                                       |
| `before_action` | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/)                  | *optional* | Executed on the entity immediately before the disguise is applied                                                                                                        |
| `after_action`  | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/)                  | *optional* | Executed on the entity immediately after the disguise is applied                                                                                                         |

### Notes

- Only works on `LivingEntity` instances server-side.
- The target player **does not need to be online** when the action is triggered — the server looks them up by name in its `usercache.json`.
- On **online-mode servers**, the user cache stores the full `GameProfile` (including skin texture data) after a player's first login. The skin is sent to connected clients in the disguise packet and loaded asynchronously, so the correct skin appears even when the player is offline.
- On **offline-mode servers**, the user cache does not store Mojang skin properties. The disguise will still apply the player model and UUID, but the skin will fall back to the default appearance based on the target UUID.
- If the named player has never connected to the server, a warning is logged and the action is silently skipped.
- The disguise is cosmetic only — hitboxes, collision, and AI are unchanged.
- Disguises are synced to all connected players and to any players who join after the disguise is applied.
- Use `"overwrite": false` to avoid replacing an existing disguise.
- To remove the disguise later, use the [Remove Disguise](./remove_disguise.md) entity action.

### Examples

```json
{
    "type": "sync:disguise_as_player",
    "player_name": "Notch"
}
```
Disguises the entity as the player named `Notch`, using their cached skin.

```json
{
  "type": "sync:disguise_as_player",
  "player_name": "Herobrine",
  "overwrite": false
}
```
Disguises the entity as `Herobrine`, but only if no disguise is already active.

```json
{
  "type": "sync:disguise_as_player",
  "player_name": "Steve",
  "before_action": {
    "type": "minecraft:make_invisible",
    "duration": 20
  },
  "after_action": {
    "type": "minecraft:play_sound",
    "sound": "minecraft:entity.enderman.teleport"
  }
}
```
Briefly turns the entity invisible before applying the `Steve` disguise, then plays a teleport sound once the disguise is active.
