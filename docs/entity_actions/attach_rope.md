---
title: Attach Rope (Entity Action)
date: 2026-04-08
---

# Attach Rope

[Entity Action Types](https://origins.readthedocs.io/en/latest/types/entity_action_types/)

Attaches a physics-simulated rope from the player to the block they are looking at. The rope constrains the player's movement to the anchor point and renders a Verlet-simulated rope visually. Activating the action again while already attached detaches the rope.

Type ID: `sync:attach_rope`

### Fields

| Field        | Type                                                                                | Default                       | Description                                                                                                                         |
|--------------|-------------------------------------------------------------------------------------|-------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| `max_length` | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)           | `30.0`                        | Maximum rope length in blocks. The actual initial length is the distance from the player to the anchor block, clamped to this value |
| `texture`    | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/) | `sync:textures/rope/rope.png` | Resource location of the texture applied to the rendered rope                                                                       |

### Behavior

- A raycast is performed along the player's look direction up to `max_length` blocks. If no block is hit the action does nothing.
- The rope anchor is placed at the exact hit position on the block's surface.
- While attached, the rope physically constrains the player: when the player moves beyond the rope's current length, a spring-damper force pulls them back.
- The player can adjust the rope length while attached by scrolling (shortening / lengthening the rope in increments of `0.2` blocks, minimum `1.0`).
- WASD input while attached applies a small swing force (`0.045` per tick) in the corresponding world-space direction, allowing pendulum-style movement.
- Sprinting while swinging boosts tangential velocity for stronger pendulum pumping.
- **Elytra interaction:** Attaching while gliding shortens the rope by `5` blocks to produce a grapple-hook boost. If the player continues gliding while attached the rope auto-detaches after `10` ticks.
- Sneaking while gliding and activating the action stops the elytra flight instead of attaching.
- Only works on `ServerPlayerEntity`; silently skipped for non-player entities.

### Notes

- The rope is entirely cosmetic on the client side (Verlet simulation for visuals only); all physics are handled server-side.
- The rope is broadcast to all players in the world when attached or detached.
- Fluids are ignored during the raycast (`FluidHandling.NONE`).

### Examples

```json
{
  "type": "sync:attach_rope"
}
```
Attaches a rope to the targeted block with default settings (30-block max, default texture).

```json
{
  "type": "sync:attach_rope",
  "max_length": 15.0,
  "texture": "mypack:textures/rope/chain.png"
}
```
Attaches a chain-textured rope with a maximum reach of 15 blocks.
