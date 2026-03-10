---
title: Prevent Creative Flight (Power Type)
date: 2024-01-07
---

# Prevent Creative Flight

[Power Types](https://origins.readthedocs.io/en/latest/types/power_types/)

Prevents a player from using creative (ability) flight. This does **not** interfere with players in Creative or Spectator game modes, as those modes force flight capabilities regardless. It only strips the ability that was granted by a power such as `apoli:creative_flight` or PAL's `VanillaAbilities.ALLOW_FLYING`.

Type ID: `sync:prevent_creative_flight`

### Fields

| Field           | Type                                                                                    | Default    | Description                                                                                                                                                              |
|-----------------|-----------------------------------------------------------------------------------------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `entity_action` | [Entity Action Type](https://origins.readthedocs.io/en/latest/types/entity_action_types/) | _optional_ | If specified, this action is executed once on the player at the moment their flight is cancelled because they were actively flying (midair). |

### Notes

- This power only affects players and is evaluated server‑side each tick.
- It does **not** affect players who are in Creative or Spectator mode (the game mode itself will re‑enable flight every tick).
- The `entity_action` is triggered only when the player is **actually flying** (i.e., the `flying` flag is true), not merely when the `allowFlying` flag is set while grounded.
- The power must be active (its conditions met) for the effect to apply.
- After removing the flight flags, the player’s abilities are synchronised with the client, so they immediately lose the ability to fly.

### Examples

```json
{
    "type": "sync:prevent_creative_flight",
    "entity_action": {
        "type": "apoli:execute_command",
        "command": "playsound minecraft:entity.bat.hurt master @s"
    }
}
```
This example plays a hurt bat sound whenever the player’s flight is prevented while they are in the air.

```json
{
    "type": "sync:prevent_creative_flight",
    "entity_action": {
        "type": "apoli:spawn_particles",
        "particle": "minecraft:soul_fire_flame",
        "count": 10
    },
    "condition": {
        "type": "origins:daytime"
    }
}
```
Spawns soul fire flames around the player when flight is cancelled, but only during the day.

```json
{
    "type": "sync:prevent_creative_flight"
}
```
A simple version that just disables creative flight without any additional effect.
