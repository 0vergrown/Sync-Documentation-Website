---
title: Action on Sending Message (Power Type)
date: 2026-03-01
---

# Action on Sending Message

[Power Types](https://origins.readthedocs.io/en/latest/types/power_types/)

Allows the player to intercept messages they send (chat, commands like `/me`, etc.) and optionally cancel them or execute actions based on regex matching. Multiple filters can be defined, each with its own actions. The power respects priority ordering.

Type ID: `sync:action_on_sending_message`

### Fields

| Field          | Type                                                                                                                               | Default    | Description                                                                                                                                                                              |
|----------------|------------------------------------------------------------------------------------------------------------------------------------|------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `message_type` | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/)                                                | *optional* | If specified, only messages of this type (e.g. `minecraft:chat`, `minecraft:say_command`) are processed. If omitted, all message types are processed.                                    |
| `filter`       | [Message Consumer](../data_types/message_consumer.md)                                                                              | *optional* | A single filter to apply. Cannot be used together with `filters`.                                                                                                                        |
| `filters`      | [Array](https://origins.readthedocs.io/en/latest/types/data_types/array/) of [Message Consumer](../data_types/message_consumer.md) | *optional* | A list of filters to apply. Filters are evaluated in order; the first matching filter cancels the message and runs its `before_action`. If none match, all `after_action`s are executed. |
| `priority`     | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/)                                                      | `0`        | Determines the order in which powers of this type are evaluated when multiple are active. Higher priority runs first.                                                                    |

### How It Works

- When the player sends a chat message or a command message (like `/me`), all active `action_on_sending_message` powers are evaluated in descending priority order.
- For each power, the message is first checked against the optional `message_type`; if it doesn't match, the power is skipped.
- If the power contains one or more filters, they are processed in the order they appear:
    - For each filter, the message content is tested against the regex `filter`.
    - If a match is found:
        - The filter's `before_action` (if any) is executed.
        - The message is **canceled** (it will not be broadcast to anyone).
        - No further filters in this power are evaluated, and no lower‑priority powers are processed.
    - If no filter matches after checking all filters:
        - Every filter in the power that has an `after_action` executes its `after_action`.
        - The message is **allowed** to proceed normally (it will be sent to others).
- If a power has no filters, it does nothing and allows the message, unless the `message_type` restriction blocked it.

### Notes

- The regex is compiled using `java.util.regex.Pattern`. If an invalid regex is provided, it is escaped and treated as a literal string (to avoid crashes).
- Messages are intercepted **before** they are broadcast to other players or the server log. This includes chat messages, `/say`, `/me`, and any other messages that go through the vanilla messaging system.
- The power only affects messages sent by the player who has the power.

### Examples

**Stops swearing with two filters:**
```json
{
  "type": "sync:action_on_sending_message",
  "filters": [
    {
      "filter": "fuck|shit|damn",
      "before_action": {
        "type": "apoli:damage",
        "amount": 2
      }
    },
    {
      "filter": ".*",
      "after_action": {
        "type": "apoli:execute_command",
        "command": "say I said something clean!"
      }
    }
  ]
}
```
The first filter matches profanity, damages the player and cancels the message. The second filter matches everything (due to `.*`), but because it's after the first, it only runs its `after_action` when no earlier filter matched – i.e., when the message is clean, it announces that the player said something clean. The message still goes through.