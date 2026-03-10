---
title: Transfer (Bi-entity Action)
date: 2024-01-07
---

# Transfer

[Bi-entity Action Types](https://origins.readthedocs.io/en/latest/types/bientity_action_types/)

Transfers a package of powers between the **actor** and **target** entities.

Type ID: `sync:transfer`

### Fields

| Field              | Type                                                                                 | Default            | Description                                                                                                                                                                  |
|--------------------|--------------------------------------------------------------------------------------|--------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `mode`             | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/)          | `"steal"`          | Transfer direction. `"steal"` takes powers from target to actor. `"give"` returns the actor's selected stolen package to the target. `"auto"` reads the actor's current mode |
| `source`           | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/)  | *optional*         | When stealing, only powers from this specific source are taken. Omit to steal from all sources                                                                               |
| `transfer_source`  | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/)  | `sync:transferred` | The source identifier under which stolen powers are granted to the actor                                                                                                     |
| `strip_from_donor` | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)        | `true`             | If `true`, powers are removed from the donor after being transferred                                                                                                         |
| `actor_action`     | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/) | *optional*         | Action executed on the actor after the transfer completes                                                                                                                    |
| `target_action`    | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/) | *optional*         | Action executed on the target after the transfer completes                                                                                                                   |

### Notes

- In **steal** mode, all top-level powers from the target (or the specified `source`) are registered as a "stolen package" on the actor and granted under `transfer_source`.
- In **give** mode, the actor returns the currently **selected** stolen package (see [Cycle Stolen Power](../entity_actions/cycle_stolen_power.md)) to the target. If `strip_from_donor` is true, the package is removed from the actor's inventory.
- Sub-powers (children of a `multiple` power) are excluded from transfer (only top-level power types are moved).
- `"auto"` mode reads the actor's current steal/give state set by [Toggle Transfer Mode](../entity_actions/toggle_transfer_mode.md).

### Examples

```json
{
    "type": "sync:transfer",
    "mode": "steal",
    "strip_from_donor": true,
    "actor_action": {
        "type": "apoli:play_sound",
        "sound": "minecraft:entity.enderman.teleport"
    }
}
```
Steals all powers from the target and removes them from the target.

```json
{
    "type": "sync:transfer",
    "mode": "give",
    "target_action": {
        "type": "apoli:play_sound",
        "sound": "minecraft:block.enchantment_table.use"
    }
}
```
Returns the actor's currently selected stolen package to the target.

```json
{
    "type": "sync:transfer",
    "mode": "auto",
    "source": "my_datapack:origin_powers"
}
```
Steals or gives (based on current mode) powers from the `my_datapack:origin_powers` source only.