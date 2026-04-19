---
title: Rope Leash (Bi-entity Action)
date: 2026-04-19
---

# Rope Leash

[Bi-entity Action Types](https://origins.readthedocs.io/en/latest/types/bientity_action_types/)

Attaches a physics-simulated leash rope from the **actor** (player) to the **target** (entity). Unlike the self-swinging ropes produced by [Attach Rope Entity](../entity_actions/attach_rope_entity.md), a leash rope pulls the **target** toward the player when the rope goes taut, matching vanilla lead behavior.

Type ID: `sync:rope_leash`

### Fields

| Field        | Type                                                                                | Default                       | Description                                                                                                                                                                              |
|--------------|-------------------------------------------------------------------------------------|-------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `max_length` | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)           | `10.0`                        | Maximum rope length in blocks. The actual initial length is the distance from player to target, clamped to this value                                                                    |
| `texture`    | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/) | `sync:textures/rope/rope.png` | Resource location of the texture applied to the rendered rope                                                                                                                            |
| `mode`       | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/)         | `toggle`                      | One of `toggle`, `attach`, `detach`, `detach_all`. Controls whether this activation attaches a new leash, detaches an existing one, or toggles between the two for the bi-entity target. |

### Mode Semantics

| Mode         | Behavior                                                                                                                                                                    |
|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `toggle`     | If the player already has a rope anchored to the target entity, detach *that rope only*. Otherwise attach a new leash rope to the target.                                   |
| `attach`     | Always attach a new leash rope to the target, even if the player already has one to the same entity. Enables multiple simultaneous leashes to the same target.              |
| `detach`     | Detach the rope (if any) the player has to the target. No-op when no matching rope exists. Does not touch ropes to other entities or to blocks.                             |
| `detach_all` | Detach every rope the player owns - including block-anchored ropes and swing-style ropes. The target is ignored, so this works even when the target is null or unreachable. |

### Behavior

- The **actor** must be a `ServerPlayerEntity` for the action to execute.
- `detach_all` runs before any target validation, so a player can release every rope without needing a valid target.
- For all other modes, if the target is null, the actor itself, or already removed, the action does nothing.
- A leash rope follows the target entity's position every server tick.
- When the rope goes taut, a spring-damper force pulls **the target** toward the player. The actor is not constrained by the rope, they can walk freely and the target is towed behind. If the target is a `LivingEntity`, its fall damage accumulation is dampened while being towed.
- Leash ropes do **not** respond to length-change inputs (jump/sneak) or swing inputs (WASD). They retain their attach-time length for the lifetime of the rope.
- Leash ropes are exempt from the elytra time limit, the player can glide indefinitely while holding leashes.
- If the anchor entity despawns or unloads, the rope is automatically detached.

### Notes

- Unlike [Attach Rope Entity](../entity_actions/attach_rope_entity.md) which constrains the **player** to the target, this action constrains the **target** to the player. The actor is the knot, the target is towed.
- The target-aware `toggle` means tapping the action while aimed at a different target attaches a new rope rather than detaching the old one. Use `detach_all` to release everything at once.
- The rope is entirely cosmetic on the client side (Verlet simulation for visuals only); all physics are handled server-side.
- Each rope is broadcast to all players in the world when attached or detached.

### Examples

```json
{
  "type": "sync:rope_leash"
}
```
Default: toggles a leash to the target entity (10-block max, default texture).

```json
{
  "type": "sync:rope_leash",
  "max_length": 20.0,
  "texture": "sync:textures/rope/vine.png"
}
```
Attaches a vine-textured leash with a maximum reach of 20 blocks.

```json
{
  "type": "sync:rope_leash",
  "mode": "attach",
  "max_length": 15.0
}
```
Always attaches a new leash rope (lets the player hold multiple leashes).

```json
{
  "type": "sync:rope_leash",
  "mode": "detach_all"
}
```
Drops every rope the player is currently holding, regardless of target.
