---
title: Radial Menu (Entity Action)
date: 2024-01-07
---

# Radial Menu

Opens a customizable radial menu on the client screen with configurable buttons, icons, and tooltips.

Type ID: `sync:radial_menu`

### Fields

Field | Type | Default | Description
------|------|---------|-------------
`entries` | [Array](../data_types/array.md) of [Radial Menu Entries](#radial-menu-entry-structure) | | List of menu entries to display
`sprite_location` | [Identifier](../data_types/identifier.md) | *optional* | Optional custom texture for the radial menu background

### Radial Menu Entry Structure

Each entry is an [object](../data_types/object.md) with these fields:

Field | Type | Default | Description
------|------|---------|-------------
`item` | [Item Stack](../data_types/item_stack.md) | *optional* | Optional item to display as icon
`button_texture` | [Identifier](../data_types/identifier.md) | *optional* | Custom texture for the button background
`icon` | [Identifier](../data_types/identifier.md) | *optional* | Custom texture for the button icon
`highlight_icon_texture` | [Identifier](../data_types/identifier.md) | *optional* | Custom texture for the icon when hovered
`highlight_button_texture` | [Identifier](../data_types/identifier.md) | *optional* | Custom texture for the button when hovered
`entity_action` | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/) | | Action to execute when this entry is clicked
`condition` | [Entity Condition](https://origins.readthedocs.io/en/latest/types/entity_condition_types/) | *optional* | Optional condition to hide/show this entry
`distance` | [Integer](../data_types/integer.md) | `-1` | Distance from center (pixels). Defaults to screen height / 4
`velocity` | [Integer](../data_types/integer.md) | `-1` | Animation speed (pixels per tick). Defaults to distance / 3
`tooltip` | [Text](../data_types/text.md) | *optional* | Optional tooltip text shown on hover
`button_width` | [Integer](../data_types/integer.md) | `16` | Width of the button in pixels
`button_height` | [Integer](../data_types/integer.md) | `20` | Height of the button in pixels
`icon_width` | [Integer](../data_types/integer.md) | `16` | Width of the icon in pixels
`icon_height` | [Integer](../data_types/integer.md) | `16` | Height of the icon in pixels
`item_width` | [Integer](../data_types/integer.md) | `16` | Width of item display in pixels
`item_height` | [Integer](../data_types/integer.md) | `16` | Height of item display in pixels

### Notes

- The radial menu is client-side and closes automatically when an option is selected
- Entries with conditions that fail will be hidden from the menu
- All distances and positions are in screen pixels

### Examples

```json
{
    "type": "sync:radial_menu",
    "entries": [
        {
            "item": {
                "item": "minecraft:water_bucket"
            },
            "entity_action": {
                "type": "apoli:execute_command",
                "command": "fill ~-1 ~ ~-1 ~1 ~2 ~1 minecraft:water replace air"
            }
        },
        {
            "icon": "mymod:textures/gui/fire_icon.png",
            "entity_action": {
                "type": "apoli:execute_command",
                "command": "fill ~-1 ~ ~-1 ~1 ~2 ~1 minecraft:fire replace air"
            }
        }
    ]
}
```