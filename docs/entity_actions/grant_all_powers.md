---
title: Grant All Powers (Entity Action)
date: 2024-01-07
---

# Grant All Powers

[Entity Action Types](https://origins.readthedocs.io/en/latest/types/entity_action_types/)

Grants all powers associated with a specific source to an entity.

Type ID: `sync:grant_all_powers`

### Fields

Field | Type | Default | Description
------|------|---------|-------------
`source` | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/) | | The source identifier whose powers should be granted

### How It Works

This action attempts to grant all powers from a source using multiple detection methods:

1. **Origins Integration** (if Origins mod is loaded):
   - Looks up the source as an Origin ID
   - Grants all powers defined in that origin

2. **Custom Registry**:
   - Checks for manually registered power-to-source mappings (Useful for non-Origins power sources)

3. **Namespace Fallback**:
   - Grants all powers whose IDs share the source's namespace
   - Example: `"sync:fire_mage"` grants all powers in `sync:*`

Powers already possessed by the entity are not duplicated.

### Notes

- Only grants powers the entity doesn't already have from that source
- Automatically synchronizes after granting
- Works best when combined with Origins or explicit registration
- The namespace fallback may grant unintended powers if broadly namespaced

### Registering Custom Sources

You can register which powers belong to a source in code:

```java
GrantAllPowersAction.registerPowersForSource(
    new Identifier("sync", "custom_class"),
    new Identifier("sync", "power_1"),
    new Identifier("sync", "power_2"),
    new Identifier("sync", "power_3")
);
```

### Examples

```json
{
    "type": "sync:grant_all_powers",
    "source": "origins:elytrian"
}
```
Grants all Elytrian origin powers.

```json
{
    "type": "sync:grant_all_powers",
    "source": "sync:fire_mage"
}
```
Grants all powers in the `sync:fire_mage` source (or all `sync:*` powers as fallback).

```json
{
    "type": "apoli:and",
    "actions": [
        {
            "type": "sync:revoke_all_powers",
            "source": "sync:class_warrior"
        },
        {
            "type": "sync:grant_all_powers",
            "source": "sync:class_mage"
        },
        {
            "type": "apoli:execute_command",
            "command": "title @s title {\"text\":\"Class Changed!\",\"color\":\"gold\"}"
        }
    ]
}
```
Switches between class power sets.