---
title: Change Slot (Entity Action)
date: 2026-04-08
---

# Change Slot

[Entity Action Types](https://origins.readthedocs.io/en/latest/types/entity_action_types/)

Swaps or moves item stacks between two inventory slots. Works with both the standard entity inventory and `apoli:inventory` power inventories.

Type ID: `sync:change_slot`

### Fields

| Field            | Type                                                                                        | Default       | Description                                                                                                                |
|------------------|---------------------------------------------------------------------------------------------|---------------|----------------------------------------------------------------------------------------------------------------------------|
| `slot_a`         | [Item Slot](https://origins.readthedocs.io/en/latest/types/data_types/item_slot/)           | *required*    | The first slot. Uses Apoli's standard slot names (e.g. `"hotbar.0"`, `"weapon.mainhand"`, `"armor.head"`, `"container.0"`) |
| `slot_b`         | [Item Slot](https://origins.readthedocs.io/en/latest/types/data_types/item_slot/)           | *required*    | The second slot                                                                                                            |
| `operation`      | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/)                 | `"swap"`      | Either `"swap"` or `"move"`. See the operation table below                                                                 |
| `inventory_type` | [Inventory Type](https://origins.readthedocs.io/en/latest/types/data_types/inventory_type/) | `"inventory"` | Either `"inventory"` (player/entity inventory) or `"power"` (an `apoli:inventory` power)                                   |
| `power`          | [Power Type](https://origins.readthedocs.io/en/latest/types/data_types/power_type/)         | *optional*    | Required when `inventory_type` is `"power"`. Points to an `apoli:inventory` power                                          |

### Operations

| Operation | Effect                                                                                               |
|-----------|------------------------------------------------------------------------------------------------------|
| `swap`    | Exchanges the stacks in `slot_a` and `slot_b`                                                        |
| `move`    | Places `slot_a`'s stack into `slot_b`, clearing `slot_a`. `slot_b`'s previous contents are discarded |

### Notes

- Slot indices for power inventories (`"container.N"`) are validated against the power's container size; out-of-range indices are silently ignored.
- If either slot resolves to `StackReference.EMPTY` (invalid slot name for the entity), the action is silently skipped.
- `power` is only required when `inventory_type` is `"power"`.

### Examples

```json
{
  "type": "sync:change_slot",
  "slot_a": "weapon.mainhand",
  "slot_b": "weapon.offhand",
  "operation": "swap"
}
```
Swaps the main-hand and off-hand items.

```json
{
  "type": "sync:change_slot",
  "slot_a": "hotbar.0",
  "slot_b": "armor.head",
  "operation": "move"
}
```
Moves the item in hotbar slot 1 to the helmet slot, discarding whatever was there.

```json
{
  "type": "sync:change_slot",
  "slot_a": "container.0",
  "slot_b": "container.1",
  "operation": "swap",
  "inventory_type": "power",
  "power": "example:my_inventory_power"
}
```
Swaps the first two slots of a power inventory.
