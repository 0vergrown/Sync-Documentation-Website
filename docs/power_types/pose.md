---
title: Pose (Power Type)
date: 2026-03-01
---

# Pose

[Power Types](https://origins.readthedocs.io/en/latest/types/power_types/)

Forces entities into specific poses and/or arm poses. Higher priority pose powers override lower priority ones. You can control the body pose separately from the arm pose, or combine them.

Type ID: `sync:pose`

### Fields

| Field         | Type                                                                          | Default    | Description                                                          |
|---------------|-------------------------------------------------------------------------------|------------|----------------------------------------------------------------------|
| `entity_pose` | [Entity Pose](#available-entity-poses)                                        | *optional* | The full-body pose to force the entity into.                         |
| `arm_pose`    | [Arm Pose](#available-arm-poses)                                              | *optional* | The arm pose to force on the entity (both arms).                     |
| `priority`    | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/) | `0`        | Priority level (higher overrides lower).                             |

### Available Entity Poses

| Pose           | Description               |
|----------------|---------------------------|
| `STANDING`     | Normal upright stance     |
| `FALL_FLYING`  | Flying with elytra        |
| `SLEEPING`     | Lying down sleeping       |
| `SWIMMING`     | Swimming animation        |
| `SPIN_ATTACK`  | Spinning attack (riptide) |
| `CROUCHING`    | Sneaking/crouching        |
| `LONG_JUMPING` | Long jump (horses)        |
| `DYING`        | Death animation           |
| `CROAKING`     | Frog croaking             |
| `USING_TONGUE` | Frog tongue attack        |
| `SITTING`      | Sitting (cats, foxes)     |
| `ROARING`      | Warden roar               |
| `SNIFFING`     | Warden sniffing           |
| `EMERGING`     | Warden emerging           |
| `DIGGING`      | Warden digging            |

### Available Arm Poses

These correspond to the arm poses in `BipedEntityModel.ArmPose`. When forced, both arms adopt the same pose.

| Pose               | Description                                   |
|--------------------|-----------------------------------------------|
| `EMPTY`            | Default relaxed arms                          |
| `ITEM`             | Holding an item (like a tool)                 |
| `BLOCK`            | Blocking with a shield                        |
| `BOW_AND_ARROW`    | Drawing a bow                                 |
| `THROW_SPEAR`      | Ready to throw a trident                      |
| `CROSSBOW_CHARGE`  | Charging a crossbow                           |
| `CROSSBOW_HOLD`    | Holding a loaded crossbow                     |
| `SPYGLASS`         | Looking through a spyglass                    |
| `TOOT_HORN`        | Using a goat horn                             |
| `BRUSH`            | Brushing (new in 1.20)                        |

### How It Works

- The power can specify either `entity_pose`, `arm_pose`, or both. If both are present, the entity will have both aspects forced.
- When multiple pose powers are active, the one with the highest `priority` takes effect completely (i.e., its entity pose and arm pose are used, overriding any lower‑priority powers).
- The forced pose overrides the normal pose logic completely, but does not affect movement or game mechanics (it is purely visual).
- Forcing an arm pose works on any biped entity (players, humanoid mobs) that uses the `BipedEntityModel`.

### Examples

```json
{
  "type": "sync:pose",
  "entity_pose": "SPIN_ATTACK",
  "priority": 10,
  "condition": {
    "type": "apoli:using_item",
    "item_condition": {
      "type": "apoli:ingredient",
      "ingredient": {
        "item": "minecraft:trident"
      }
    }
  }
}
```
Force the spin attack pose when using a trident.

```json
{
  "type": "sync:pose",
  "arm_pose": "BLOCK"
}
```
Force a player to always hold their arms as if blocking.

```json
{
  "type": "sync:pose",
  "arm_pose": "BOW_AND_ARROW"
}
```
Make the entity appear to be aiming a bow, even when not holding one.

### Notes

- Forcing a pose does not change hitboxes or collision; only the visual model is affected.
- Some poses may be incompatible with certain arm poses (e.g., `SLEEPING` may override arm placement). The power applies both, but the model may resolve conflicts based on its own animation logic.