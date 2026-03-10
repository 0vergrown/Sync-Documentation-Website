---
title: Suppress Power (Bi-entity Action)
date: 2024-01-07
---

# Suppress Power

[Bi-entity Action Types](https://origins.readthedocs.io/en/latest/types/bientity_action_types/)

Suppresses one or more powers on the **target** entity without removing them. Suppressed powers report `isActive() == false` via a mixin, so they stop functioning but remain in the power component and resume instantly when liberated. Use [Liberate Power](./liberate_power.md) to lift a suppression.

Type ID: `sync:suppress_power`

### Fields

| Field             | Type                                                                                                                                                             | Default    | Description                                                                             |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------|
| `power`           | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/)                                                                              | *optional* | A single power ID to suppress                                                           |
| `powers`          | [Array](https://origins.readthedocs.io/en/latest/types/data_types/array/) of [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/) | *optional* | Additional power IDs to suppress                                                        |
| `power_types`     | [Array](https://origins.readthedocs.io/en/latest/types/data_types/array/) of [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/) | *optional* | Factory-type IDs (e.g. `origins:active_self`); all powers of these types are suppressed |
| `power_sources`   | [Array](https://origins.readthedocs.io/en/latest/types/data_types/array/) of [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/) | *optional* | Source IDs; all powers granted via a listed source are suppressed                       |
| `ignored_powers`  | [Array](https://origins.readthedocs.io/en/latest/types/data_types/array/) of [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/) | *optional* | Power IDs that are never suppressed, even if they match another filter                  |
| `bientity_action` | [Bi-entity Action](https://origins.readthedocs.io/en/latest/types/bientity_action_types/)                                                                        | *optional* | Executed once for every power that gets suppressed                                      |

### Notes

- Suppression is **flat (non-stacking)**: calling this twice for the same power still only requires one `liberate_power` call to restore it.
- If **all filter fields are omitted**, every power on the target is suppressed.
- A power that matches **any** of the filter fields is suppressed, unless it is also in `ignored_powers`.
- Suppressed powers are automatically cleaned up on player disconnect and entity death.
- Sub-powers (children of a `multiple` power) share the same suppression logic and can be targeted by ID.

### Examples

```json
{
  "type":"sync:suppress_power",
  "power":"my_datapack:flight"
}
```
Suppresses a single named power on the target.

```json
{
  "type":"sync:suppress_power",
  "power_types":[
    "origins:active_self",
    "origins:cooldown"
  ],
  "ignored_powers":[
    "my_datapack:escape_ability"
  ]
}
```
Suppresses all `active_self` and `cooldown` powers except `escape_ability`.

```json
{
  "type":"sync:suppress_power",
  "power_sources":[
    "my_datapack:class_powers"
  ]
}
```
Suppresses every power that was granted from the `my_datapack:class_powers` source.