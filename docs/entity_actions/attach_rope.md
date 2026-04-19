---
title: Attach Rope (Entity Action)
date: 2026-04-19
---

# Attach Rope

[Entity Action Types](https://origins.readthedocs.io/en/latest/types/entity_action_types/)

Attaches a physics-simulated rope from the player to the block they are looking at. The rope constrains the player's movement to the anchor point and renders a Verlet-simulated rope visually.

Type ID: `sync:attach_rope`

### Fields

| Field        | Type                                                                                | Default                       | Description                                                                                                                                                                                           |
|--------------|-------------------------------------------------------------------------------------|-------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `max_length` | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)           | `30.0`                        | Maximum rope length in blocks. The actual initial length is the distance from the player to the anchor block, clamped to this value                                                                   |
| `texture`    | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/) | `sync:textures/rope/rope.png` | Resource location of the texture applied to the rendered rope                                                                                                                                         |
| `mode`       | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/)         | `toggle`                      | One of `toggle`, `attach`, `detach`, `detach_all`. Controls whether this activation attaches a new rope, detaches an existing one, or toggles between the two for the block the player is looking at. |

### Mode Semantics

| Mode         | Behavior                                                                                                                                                                  |
|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `toggle`     | Raycast the look direction. If the player already has a rope anchored near the hit block, detach *that rope only*. Otherwise attach a new rope to the block.              |
| `attach`     | Always attach a new rope to the hit block, even if the player already has one anchored there. Enables stacking multiple simultaneous ropes to the same spot.              |
| `detach`     | Detach the rope (if any) the player has anchored near the hit block. No-op when no matching rope exists. Does not touch ropes anchored to other positions or to entities. |
| `detach_all` | Detach every rope the player owns, including ropes anchored to entities and leash ropes. No raycast is performed, so the player does not need to be aiming at anything.   |

### Behavior

- Except for `detach_all`, a raycast is performed along the player's look direction up to `max_length` blocks. If no block is hit the action does nothing.
- For `attach` and the attach branch of `toggle`, the rope anchor is placed at the exact hit position on the block's surface.
- For `detach` and the detach branch of `toggle`, a rope is considered a match for the hit position if its anchor is within a small tolerance (~0.6 blocks) of the hit - re-raycasts on the same block face may not produce the exact same position.
- While attached, the rope physically constrains the player: when the player moves beyond the rope's current length, a spring-damper force pulls them back.
- The player can adjust the rope length while attached by holding jump (shorten) or sneak (lengthen) steps of `0.2` blocks, clamped to a minimum of `1.0`. When a player owns multiple non-leash ropes, every owned rope's length is changed in the same direction by the same step.
- WASD input while attached and off the ground applies a small swing force (`0.045` per tick) in the corresponding world-space direction. Swing force is applied once per tick regardless of how many ropes are attached.
- Sprinting while swinging boosts tangential velocity for stronger pendulum pumping.
- **Elytra interaction:** Attaching while gliding shortens the newly-attached rope by `5` blocks to produce a grapple-hook boost. If the player continues gliding while any swing-style rope is attached, those ropes auto-detach after `10` ticks.
- Sneaking while gliding and activating the action stops the elytra flight instead of attaching.
- Only works on `ServerPlayerEntity`; silently skipped for non-player entities.

### Notes

- The rope is entirely cosmetic on the client side (Verlet simulation for visuals only); all physics are handled server-side.
- Each rope is broadcast to all players in the world when attached or detached.
- Fluids are ignored during the raycast (`FluidHandling.NONE`).

### Examples

```json
{
  "type": "sync:attach_rope"
}
```
Default: toggles a rope at the targeted block (30-block max, default texture).

```json
{
  "type": "sync:attach_rope",
  "max_length": 15.0,
  "texture": "sync:textures/rope/chain.png"
}
```
Attaches a chain-textured rope with a maximum reach of 15 blocks.

```json
{
  "type": "sync:attach_rope",
  "mode": "attach",
  "max_length": 20.0
}
```
Always attaches a new rope at the targeted block (lets the player stack ropes).

```json
{
  "type": "sync:attach_rope",
  "mode": "detach_all"
}
```
Drops every rope the player is currently holding, regardless of target.
