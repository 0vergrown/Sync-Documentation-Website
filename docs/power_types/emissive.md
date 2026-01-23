---
title: Emissive (Power Type)
date: 2024-01-07
---

# Emissive

[Power Types](https://origins.readthedocs.io/en/latest/types/power_types/)

Makes entities emit light, causing them to glow in the dark. This affects both how the entity is rendered and the light level around it.

Type ID: `sync:emissive`

### Fields

Field | Type | Default | Description
------|------|---------|-------------
`light` | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/) | | The static light level emitted by the entity (0-15). This is the base brightness.
`dynamic_light` | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/) | `0` | Optional dynamic light level for special effects (0-15). This is used with the LambDynamicLights mod for moving light sources.

### How It Works

This power type gives entities two types of light emission:
1. **Static Light (`light` field)**: This makes the entity appear to glow and affects the light level in the world. When multiple entities with emissive powers are near each other, the highest light level takes precedence.
2. **Dynamic Light (`dynamic_light` field)**: When the [LambDynamicLights](https://modrinth.com/mod/lambdynamiclights) mod is installed, this field creates actual moving light sources that cast dynamic shadows and illuminate the environment as the entity moves.

### Notes

- Light levels range from 0 (no light) to 15 (maximum brightness)
- The `light` field affects both visual appearance and world lighting
- The `dynamic_light` field only works when LambDynamicLights is installed
- If multiple emissive powers are active on the same entity, the highest values for each field are used

### Examples

```json
{
    "type": "sync:emissive",
    "light": 8,
    "condition": {
      "type": "apoli:submerged_in",
      "fluid": "minecraft:water"
    }
}