---
title: Mod Loaded (Entity Condition)
date: 2024-01-07
---

# Mod Loaded

[Entity Condition Types](https://origins.readthedocs.io/en/latest/types/entity_condition_types/)

Checks whether one or more Fabric mods are currently loaded. This is useful for enabling features that depend on other mods being present, without crashing the game if they're not installed.

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
  "type":"sync:mod_loaded",
  "mod":"icarus"
}
```
This example checks if the Icarus mod is loaded.

```json
{
  "type":"sync:mod_loaded",
  "mods":[
    "icarus",
    "aspectslib"
  ]
}
```
This example checks if both Icarus and AspectsLib are loaded.

```json
{
  "type":"sync:mod_loaded",
  "mod":"icarus",
  "inverted":true
}
```
This example checks if the Icarus mod is **not** loaded.

```json
{
  "type":"apoli:multiple",
  "icarus_wings":{
    "type":"icarae_origin:wings",
    "wings_type":"icarus:white_feathered_wings",
    "condition":{
      "type":"sync:mod_loaded",
      "mod":"icarae_origin",
      "inverted":false
    }
  },
  "vanilla_wings":{
    "type":"apoli:elytra_flight",
    "render_elytra":true,
    "texture_location":"minecraft:textures/entity/elytra.png",
    "condition":{
      "type":"sync:mod_loaded",
      "mod":"icarae_origin",
      "inverted":true
    }
  }
}
```

This power uses Icarae Origin's `wings` if available, otherwise falls back to Apoli's `elytra_flight`.
