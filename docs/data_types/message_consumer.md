---
title: Message Consumer (Data Type)
date: 2026-03-01
---

# Message Consumer

[Data Type](https://origins.readthedocs.io/en/latest/types/data_types/)

A compound data type that defines a single filter and optional actions for the [Action On Sending Message (Power Type)](../power_types/action_on_sending_message.md). It pairs a regular expression pattern with entity actions that run depending on whether the pattern matches the outgoing message.

### Fields

| Field           | Type                                                                                 | Default    | Description                                                                                                                                              |
|-----------------|--------------------------------------------------------------------------------------|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `filter`        | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/)          |            | A regular expression pattern to test against the message content. Supports `#{translation.key}` placeholders to match translations across all languages. |
| `before_action` | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/) | *optional* | Executed on the player **if** the filter matches, just before the message is cancelled.                                                                  |
| `after_action`  | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/) | *optional* | Executed on the player **if** the filter does **not** match (and no earlier filter in the same power matched), after the message is allowed.             |
| `replacement`   | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/)          | *optional* | If set, matched text in the message is replaced with this string (supports regex capture groups like `$1`, `$2`, etc.).                                  |
| `prevent`       | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)        | `false`    | If `true`, the message is blocked entirely when this filter matches.                                                                                     |

### How It Works

- Before compilation, `#{translation.key}` placeholders in the filter are expanded to case-insensitive alternations of every known translation for that key across all loaded language files. For example, `cast #{item.minecraft.fire_charge}` expands to `cast (?i:\QFire Charge\E|\QCarga de fuego\E|...)` to match the item name in any language.
- The expanded `filter` is compiled as a Java regular expression. If the regex is malformed, it is escaped and treated as a literal string (this prevents crashes).
- If a `replacement` is set, the first match of the regex is replaced with that string. Capture groups can be referenced using `$1`, `$2`, etc.
- If `prevent` is `true`, the message is blocked when the filter matches. Otherwise, matched text is replaced (if `replacement` is set) and the message is allowed to proceed.
- In a power, filters are evaluated in the order they appear. Actions execute according to the `before_action`, `replacement`, and `after_action` fields as defined above.

### Examples

```json
{
  "filter": "fuck|shit|damn",
  "before_action": {
    "type": "apoli:damage",
    "amount": 2
  }
}
```
A simple filter that blocks profanity and damages the player and damages them.

```json
{
  "filter":{
    "filter":"^#{item.minecraft.fire_charge}$",
    "before_action":{
      "type":"apoli:execute_command",
      "command":"say Fireball!"
    },
    "prevent":true
  }
}
```
A filter that matches "Fire Charge" in any language and triggers a fireball action, blocking the message.

```json
{
  "filter": "swear (\\w+)",
  "replacement": "bleep $1"
}
```
Replaces swear words (captured by the parentheses) with "bleep [word]" in the message.

```json
{
  "filter": "badword",
  "before_action": {
    "type": "apoli:execute_command",
    "command": "tellraw @s {\"text\":\"Watch your language!\"}"
  },
  "after_action": {
    "type": "apoli:apply_effect",
    "effect": {
      "effect": "minecraft:speed",
      "duration": 100,
      "amplifier": 0
    }
  }
}
```
A filter that both logs bad words and cancels, while also having an action
