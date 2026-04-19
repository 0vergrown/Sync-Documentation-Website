---
title: Mod Loaded (Item Condition)
date: 2024-12-20
---

# Mod Loaded

[Item Condition Types](https://origins.readthedocs.io/en/latest/types/item_condition_types/)

Checks whether one or more mods are currently loaded.

Type ID: `sync:mod_loaded`

### Fields

| Field  | Type                                                                                                                                                     | Default    | Description                                   |
|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------|------------|-----------------------------------------------|
| `mod`  | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/)                                                                              | *optional* | A single mod ID to check for                  |
| `mods` | [Array](https://origins.readthedocs.io/en/latest/types/data_types/array/) of [String](https://origins.readthedocs.io/en/latest/types/data_types/string/) | *optional* | Multiple mod IDs (all must be loaded)         |

### Notes

- At least one of `mod` or `mods` must be provided
- If `mods` is used, ALL listed mods must be loaded for the condition to be true
- Use `"inverted": true` to check if a mod is **not** loaded
- Mod IDs are case-sensitive (check your mod's `fabric.mod.json`)
- This is a runtime condition; it doesn't affect power JSON parsing

### Examples

```json
{
    "type": "sync:mod_loaded",
    "mod": "simplyswords"
}
```
This example checks if the Simply Swords mod is loaded.

```json
{
    "type": "apoli:and",
    "conditions": [
        {
            "type": "apoli:ingredient",
            "ingredient": {
                "item": "simplyswords:iron_twinblade"
            }
        },
        {
            "type": "sync:mod_loaded",
            "mod": "simplyswords"
        }
    ]
}
```
This example checks if the item is a Simply Swords weapon AND the mod is loaded, preventing errors when the mod isn't installed.
