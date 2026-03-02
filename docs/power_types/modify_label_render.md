---
title: Modify Label Render (Power Type)
date: 02-16-2026
---

# Modify Label Render

[Power Types](https://origins.readthedocs.io/en/latest/types/power_types/)

Modifies how the name tag label of an entity renders, including custom text replacement, visibility modes, and dynamic text parsing with entity selectors.

Type ID: `sync:modify_label_render`

### Fields

| Field                 | Type                                                                                            | Default     | Description                                                                                                                                                                                                                        |
|-----------------------|-------------------------------------------------------------------------------------------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `before_parse_action` | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/)            | *optional*  | If specified, this action is executed on the entity **before** the text template is parsed each tick cycle.                                                                                                                        |
| `after_parse_action`  | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/)            | *optional*  | If specified, this action is executed on the entity **after** the text template is parsed, but only if the parsed text has changed from the previous parse.                                                                        |
| `render_mode`         | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/)                     | `"default"` | Determines how the label is rendered. Accepts `"default"` (normal rendering), `"hide_partially"` (semi-transparent like when sneaking), or `"hide_completely"` (label is not rendered at all).                                     |
| `text`                | [Text Component](https://origins.readthedocs.io/en/latest/types/data_types/text_component/)     | *optional*  | If specified, replaces the entity's name tag with this custom text. Supports JSON text components including selectors like `@s`, colors, formatting, and other text features. The text is parsed server-side to resolve selectors. |
| `tick_rate`           | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/)                   | `20`        | How often (in ticks) the text template is re-parsed and actions are executed. Default is 20 ticks (1 second).                                                                                                                      |
| `priority`            | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/)                   | `0`         | If multiple `modify_label_render` powers are active on the same entity, only the one with the highest priority value will be applied. In case of a tie, the last registered power takes precedence.                                |
| `entity_condition`    | [Entity Condition](https://origins.readthedocs.io/en/latest/types/entity_condition_types/)      | *optional*  | If specified, the label modification will **only** apply to viewers that fulfill this condition.                                                                                                                                   |
| `bientity_condition`  | [Bi-entity Condition](https://origins.readthedocs.io/en/latest/types/bientity_condition_types/) | *optional*  | If specified, the label modification will **only** apply to viewers that fulfill this condition in relation to the power holder. The condition pair is `(viewer, holder)`.                                                         |

### How It Works

This power modifies the entity's name tag rendering on a per-viewer basis. The text template is re-parsed every `tick_rate` ticks, allowing for dynamic labels that update based on entity state, selectors, or other data.

### Notes

- If both `entity_condition` and `bientity_condition` are omitted, the modification applies to **all** viewers
- Text parsing happens server-side to properly resolve selectors like `@s`
- The client receives the parsed text, so selectors show the actual entity name, not the literal selector string
- Actions execute at `tick_rate` intervals, not every tick, for performance
- The `after_parse_action` only runs when the text actually changes, preventing unnecessary action spam

### Examples

```json
{
   "type":"sync:modify_label_render",
   "render_mode":"hide_partially"
}
```
Makes the label semi-transparent (like when sneaking) for all viewers.

```json
{
   "type":"sync:modify_label_render",
   "text":{
      "text":"[REDACTED]",
      "color":"black",
      "bold":true
   }
}
```
Replaces the entity's name with bold black `[REDACTED]` text.

```json
{
   "type":"sync:modify_label_render",
   "text":[
      {
         "text":"[",
         "color":"yellow"
      },
      {
         "selector":"@s",
         "color":"green",
         "bold":true
      },
      {
         "text":"]",
         "color":"yellow"
      }
   ]
}
```
Wraps the entity's actual name in yellow brackets with the name in bold green.

```json
{
   "type":"sync:modify_label_render",
   "text":{
      "text":"???",
      "obfuscated":true,
      "color":"dark_purple"
   },
   "entity_condition":{
      "type":"apoli:sneaking"
   },
   "bientity_condition":{
      "type":"apoli:distance",
      "comparison":">",
      "compare_to":10
   }
}
```
Shows obfuscated purple "???" to sneaking viewers more than 10 blocks away.

```json
{
   "type":"sync:modify_label_render",
   "render_mode":"hide_completely",
   "priority":10,
   "condition":{
      "type":"apoli:resource",
      "resource":"example:invisibility_mode",
      "comparison":"==",
      "compare_to":1
   }
}
```
Completely hides the label when a resource condition is met, with high priority to override other label modifications.

```json
{
   "type":"sync:modify_label_render",
   "text":[
      {
         "text":"HP: ",
         "color":"red"
      },
      {
         "score":{
            "name":"@s",
            "objective":"health"
         },
         "color":"red",
         "bold":true
      }
   ],
   "tick_rate":10,
   "after_parse_action":{
      "type":"apoli:execute_command",
      "command":"playsound minecraft:block.note_block.pling player @a[distance=..5] ~ ~ ~ 0.5 2.0"
   }
}
```
Shows the entity's health from a scoreboard, updates every 0.5 seconds, and plays a sound when the displayed health changes.
