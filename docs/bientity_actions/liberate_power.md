---
title: Liberate Power (Bi-entity Action)
date: 2024-01-07
---

# Liberate Power

[Bi-entity Action Types](https://origins.readthedocs.io/en/latest/types/bientity_action_types/)

Lifts suppressions previously applied by [Suppress Power](./suppress_power.md) on the **target** entity, allowing the restored powers to become active again immediately.

Type ID: `sync:liberate_power`

### Fields

| Field             | Type                                                                                                                                                             | Default    | Description                                                             |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------|-------------------------------------------------------------------------|
| `power`           | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/)                                                                              | *optional* | A single power ID to liberate                                           |
| `powers`          | [Array](https://origins.readthedocs.io/en/latest/types/data_types/array/) of [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/) | *optional* | Additional power IDs to liberate                                        |
| `power_types`     | [Array](https://origins.readthedocs.io/en/latest/types/data_types/array/) of [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/) | *optional* | Factory-type IDs; all suppressed powers of these types are liberated    |
| `power_sources`   | [Array](https://origins.readthedocs.io/en/latest/types/data_types/array/) of [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/) | *optional* | Source IDs; suppressed powers granted via a listed source are liberated |
| `ignored_powers`  | [Array](https://origins.readthedocs.io/en/latest/types/data_types/array/) of [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/) | *optional* | Power IDs that are never liberated, even if they match another filter   |
| `bientity_action` | [Bi-entity Action](https://origins.readthedocs.io/en/latest/types/bientity_action_types/)                                                                        | *optional* | Executed once for every power that gets liberated                       |

### Notes

- If **all filter fields are omitted**, every active suppression on the target is lifted in one call.
- Filter matching mirrors `suppress_power`: a power is liberated if it matches **any** filter, unless it is in `ignored_powers`.
- Any suppressed powers that are no longer in the target's component (stale entries) are automatically cleaned up when no filter is set, or if they match an explicit `power`/`powers` entry.
- Only powers that are currently suppressed are considered (non-suppressed powers are skipped).

### Examples

```json
{
    "type": "sync:liberate_power",
    "power": "my_datapack:flight"
}
```
Restores a single suppressed power.

```json
{
    "type": "sync:liberate_power"
}
```
Lifts all suppressions on the target at once.

```json
{
  "type":"sync:liberate_power",
  "power_sources":[
    "my_datapack:class_powers"
  ],
  "ignored_powers":[
    "my_datapack:passive_aura"
  ]
}
```
Restores all powers from `my_datapack:class_powers` except `passive_aura`.