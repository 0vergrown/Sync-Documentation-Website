---
title: Revoke All Powers (Entity Action)
date: 2024-01-07
---

# Revoke All Powers

[Entity Action Types](https://origins.readthedocs.io/en/latest/types/entity_action_types/)

Removes all powers granted by a specific source from an entity.

Type ID: `sync:revoke_all_powers`

### Fields

Field | Type | Default | Description
------|------|---------|-------------
`source` | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/) | | The source identifier whose powers should be removed

### How It Works

This action removes every power that was granted from the specified source. Sources are identifiers used when granting powers (e.g., origin IDs, custom command sources, or mod-specific sources).

For example, if an origin `"origins:blazeborn"` grants 10 different powers, this action with `"source": "origins:blazeborn"` would remove all 10 powers at once.

### Notes

- Only removes powers from the specified source
- Powers from other sources remain unaffected
- Automatically synchronizes the power component after removal
- Has no effect if no powers from that source exist

### Examples

```json
{
    "type": "sync:revoke_all_powers",
    "source": "origins:human"
}
```
Removes all powers granted by the human origin.

```json
{
    "type": "sync:revoke_all_powers",
    "source": "sync:temporary_buff"
}
```
Removes all powers from a temporary buff system.

```json
{
    "type": "apoli:if_else_list",
    "actions": [
        {
            "condition": {
                "type": "apoli:entity_group",
                "group": "undead"
            },
            "action": {
                "type": "sync:revoke_all_powers",
                "source": "sync:vampire_powers"
            }
        },
        {
            "condition": {
                "type": "apoli:constant",
                "value": true
            },
            "action": {
                "type": "sync:grant_all_powers",
                "source": "sync:vampire_powers"
            }
        }
    ]
}
```
Revokes vampire powers if the entity becomes undead, otherwise grants them.