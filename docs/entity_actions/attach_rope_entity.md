---
title: Attach Rope Entity (Entity Action)
date: 2026-04-19
---

# Attach Rope Entity

[Entity Action Types](https://origins.readthedocs.io/en/latest/types/entity_action_types/)

Attaches a physics-simulated rope from the player to an entity they are looking at. The rope constrains the player's movement to the target entity and renders a Verlet-simulated rope visually.

Type ID: `sync:attach_rope_entity`

### Fields

| Field        | Type                                                                                | Default                       | Description                                                                                                                                                                                            |
|--------------|-------------------------------------------------------------------------------------|-------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `max_length` | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)           | `30.0`                        | Maximum rope length in blocks. The actual initial length is the distance from the player to the target entity, clamped to this value                                                                   |
| `texture`    | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/) | `sync:textures/rope/rope.png` | Resource location of the texture applied to the rendered rope                                                                                                                                          |
| `mode`       | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/)         | `toggle`                      | One of `toggle`, `attach`, `detach`, `detach_all`. Controls whether this activation attaches a new rope, detaches an existing one, or toggles between the two for the entity the player is looking at. |

### Mode Semantics

| Mode         | Behavior                                                                                                                                                               |
|--------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `toggle`     | Raycast the look direction. If the player already has a rope anchored to the hit entity, detach *that rope only*. Otherwise attach a new rope to the entity.           |
| `attach`     | Always attach a new rope to the hit entity, even if the player already has one to the same entity. Enables multiple simultaneous ropes to the same target.             |
| `detach`     | Detach the rope (if any) the player has to the hit entity. No-op when no matching rope exists. Does not touch ropes to other entities or to blocks.                    |
| `detach_all` | Detach every rope the player owns - including ropes anchored to blocks and leash ropes. No raycast is performed, so the player does not need to be aiming at anything. |

### Behavior

- Except for `detach_all`, a raycast is performed along the player's look direction up to `max_length` blocks. If no entity is hit (or only the player themselves) the action does nothing.
- The rope anchor point follows the target entity's position every server tick.
- While attached, the rope physically constrains the player: when the player moves beyond the rope's current length, a spring-damper force pulls them back toward the entity.
- The player can adjust the rope length while attached by holding jump (shorten) or sneak (lengthen) steps of `0.2` blocks, clamped to a minimum of `1.0`. When a player owns multiple non-leash ropes, every owned rope's length is changed in the same direction by the same step.
- WASD input while attached and off the ground applies a small swing force (`0.045` per tick) in the corresponding world-space direction. Swing force is applied once per tick regardless of how many ropes are attached.
- Sprinting while swinging boosts tangential velocity for stronger pendulum pumping.
- **Elytra interaction:** Attaching while gliding shortens the newly-attached rope by `5` blocks to produce a grapple-hook boost. If the player continues gliding while any swing-style rope is attached, those ropes auto-detach after `10` ticks.
- Sneaking while gliding and activating the action stops the elytra flight instead of attaching.
- Only works on `ServerPlayerEntity`; silently skipped for non-player entities.
- If the anchor entity despawns or unloads, the rope is automatically detached.

### Notes

- Unlike [Attach Rope (Entity Action Type)](./attach_rope.md) which anchors to blocks, this action anchors to living entities.
- The rope follows the entity's position, so the anchor point moves dynamically.
- Spectators are ignored during the raycast; the player cannot grapple them.
- The rope is entirely cosmetic on the client side (Verlet simulation for visuals only); all physics are handled server-side.
- Each rope is broadcast to all players in the world when attached or detached.

### Examples

```json
{
  "type": "sync:attach_rope_entity"
}
```
Default: toggles a rope on the targeted entity (30-block max, default texture).

```json
{
  "type": "sync:attach_rope_entity",
  "max_length": 20.0,
  "texture": "sync:textures/rope/chain.png"
}
```
Attaches a chain-textured rope to entities with a maximum reach of 20 blocks.

```json
{
  "type": "sync:attach_rope_entity",
  "mode": "attach",
  "max_length": 15.0
}
```
Always attaches a new rope to the targeted entity (lets the player stack ropes on the same or multiple targets).

```json
{
  "type": "sync:attach_rope_entity",
  "mode": "detach_all"
}
```
Drops every rope the player is currently holding, regardless of target.
