---
title: Attached to Rope (Entity Condition)
date: 2026-04-19
---

# Attached to Rope

[Entity Condition Types](https://origins.readthedocs.io/en/latest/types/entity_condition_types/)

Checks how many ropes a player currently has attached via [Attach Rope](../entity_actions/attach_rope.md), [Attach Rope Entity](../entity_actions/attach_rope_entity.md), or [Rope Leash](../bientity_actions/rope_leash.md) and compares that count against a target value.

Type ID: `sync:attached_to_rope`

### Fields

| Field         | Type                                                                                | Default | Description                                                                      |
|---------------|-------------------------------------------------------------------------------------|---------|----------------------------------------------------------------------------------|
| `anchor_type` | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/)         | `any`   | Filters which ropes to count. One of `any`, `block`, `entity`, `leash`, `swing`. |
| `comparison`  | [Comparison](https://origins.readthedocs.io/en/latest/types/data_types/comparison/) | `>=`    | Comparison operator applied between the matching rope count and `compare_to`.    |
| `compare_to`  | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/)       | `1`     | Value the rope count is compared against.                                        |

### Anchor Types

| Filter   | Counts                                                                                      |
|----------|---------------------------------------------------------------------------------------------|
| `any`    | Every rope the player owns.                                                                 |
| `block`  | Ropes anchored to a static world-space point (produced by `sync:attach_rope`).              |
| `entity` | Ropes whose anchor follows an entity - includes both self-swing and leash-style ropes.      |
| `leash`  | Leash-style ropes that pull the anchor toward the player (produced by `sync:rope_leash`).   |
| `swing`  | Non-leash ropes - block anchors plus entity anchors that pull the player toward the anchor. |

### Notes

- Always returns `false` for non-player entities.
- The condition reflects server-side rope state; it updates the moment a rope is attached or detached.
- With the defaults (`anchor_type: any`, `comparison: >=`, `compare_to: 1`) the condition behaves as a simple "has at least one rope" check.

### Examples

```json
{
  "type": "sync:attached_to_rope"
}
```
True when the player holds at least one rope of any kind.

```json
{
  "type": "sync:attached_to_rope",
  "comparison": ">=",
  "compare_to": 3
}
```
True when the player is holding three or more ropes.

```json
{
  "type": "sync:attached_to_rope",
  "anchor_type": "leash",
  "comparison": ">",
  "compare_to": 0
}
```
True when the player is holding at least one leash rope regardless of other rope types.

```json
{
  "type": "sync:attached_to_rope",
  "anchor_type": "swing",
  "comparison": "==",
  "compare_to": 0
}
```
True when the player has no swing-style ropes (they may still be holding leashes).
