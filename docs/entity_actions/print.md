---
title: Print (Entity Action)
date: 2024-01-07
---

# Print

[Entity Action Types](https://origins.readthedocs.io/en/latest/types/entity_action_types/)

Logs a message to the console with optional display in player chat. Useful for debugging or providing feedback.

Type ID: `sync:print`

### Fields

| Field          | Type                                                                          | Default              | Description                                           |
|----------------|-------------------------------------------------------------------------------|----------------------|-------------------------------------------------------|
| `message`      | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/)   |                      | The message to print                                  |
| `show_in_chat` | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/) | `false`              | Whether to also send the message to the player's chat |
| `logger_id`    | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/)   | `"Sync/PrintAction"` | Custom logger identifier for console output           |

### Notes

- Messages are logged at INFO level
- Console output appears in server logs or development console
- Player chat messages are only sent if the entity is a player

### Examples

```json
{
    "type": "sync:print",
    "message": "Power activated!",
    "show_in_chat": true,
    "logger_id": "MyMod/Debug"
}
```
This example logs a message to console with custom logger ID and shows it in player chat.