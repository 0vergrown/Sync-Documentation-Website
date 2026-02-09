---
title: Prevent Sprinting Particles (Power Type)
date: 2024-01-07
---

# Prevent Sprinting Particles

[Power Types](https://origins.readthedocs.io/en/latest/types/power_types/)

Prevents the particle effects that normally appear when an entity is sprinting.

Type ID: `sync:prevent_sprinting_particles`

### Fields

This power type has no additional fields beyond standard power fields (like `condition`).

### Notes

- Only prevents the visual particles
- Does not affect sprinting speed or mechanics
- Works on any entity, not just players
- The power must be active to prevent particles

### Examples

```json
{
    "type": "sync:prevent_sprinting_particles"
}
```
Always prevents sprinting particles.

```json
{
    "type": "sync:prevent_sprinting_particles",
    "condition": {
        "type": "apoli:sneaking"
    }
}
```
Prevents sprinting particles while sneaking (doing this is useless but you get the point).