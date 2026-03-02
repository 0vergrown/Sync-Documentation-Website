---
title: Fuel (Item Condition Type)
date: 2024-12-20
---

# Fuel

[Item Condition Types](https://origins.readthedocs.io/en/latest/types/item_condition_types/)

Checks whether the item stack’s item is registered as fuel in the Fabric API's [Fuel Registry](https://docs.fabricmc.net/develop/items/first-item#making-the-item-compostable-or-a-fuel) and compares its burn time (in ticks) against a specified value.

Type ID: `sync:fuel`

### Fields

| Field        | Type                                                                                | Default | Description                                                       |
|--------------|-------------------------------------------------------------------------------------|---------|-------------------------------------------------------------------|
| `comparison` | [Comparison](https://origins.readthedocs.io/en/latest/types/data_types/comparison/) | `>`     | How the item’s fuel burn time should be compared to `compare_to`. |
| `compare_to` | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/)       | `0`     | The value to compare the burn time against.                       |

### How It Works

- Queries the Fabric API's `FuelRegistry` to get the burn time (in ticks) for the item.
- If the item is not registered as fuel, the condition returns `false`.
- Otherwise, it compares the burn time to `compare_to` using the given `comparison`.
- Burn times are typically measured in game ticks (20 ticks = 1 second).

### Examples
```json
{
  "type": "sync:fuel",
  "comparison": ">",
  "compare_to": 0
}
```
Check if the item is any fuel.
```json
{
  "type": "sync:fuel",
  "comparison": ">=",
  "compare_to": 100
}
```
Check if the item burns for at least 5 seconds (100 ticks).
```json
{
  "type": "sync:fuel",
  "comparison": "<",
  "compare_to": 200
}
```
Check if the item burns for less than 10 seconds.