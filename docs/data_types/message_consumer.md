---
title: Message Consumer (Data Type)
date: 2026-03-01
---

# Message Consumer

[Data Type](https://origins.readthedocs.io/en/latest/types/data_types/)

A compound data type that defines a single filter and optional actions for the [Action On Sending Message (Power Type)](../power_types/action_on_sending_message.md). It pairs a regular expression pattern with entity actions that run depending on whether the pattern matches the outgoing message.

### Fields

| Field           | Type                                                                                 | Description                                                                                                                                            |
|-----------------|--------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| `filter`        | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/)          | A regular expression pattern to test against the message content. If the message contains a match for this pattern, the filter is considered matching. |
| `before_action` | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/) | *optional*                                                                                                                                             | Executed on the player **if** the filter matches, just before the message is cancelled.
| `after_action`  | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/) | *optional*                                                                                                                                             | Executed on the player **if** the filter does **not** match (and no earlier filter in the same power matched), after the message is allowed.

### How It Works

- The `filter` is compiled as a Java regular expression. If the regex is malformed, it is escaped and treated as a literal string (this prevents crashes).
- In a power, filters are evaluated in the order they appear. The first matching filter triggers its `before_action` and cancels the message; no further filters are checked for that message.
- If none of the filters match, every filter that has an `after_action` will run its `after_action` after the message is allowed (but before it is actually sent to recipients).

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
  "filter": "a^",
  "after_action": {
    "type": "apoli:execute_command",
    "command": "say I sent a clean message!"
  }
}
```
A filter that never matches but runs an action when the message is clean

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