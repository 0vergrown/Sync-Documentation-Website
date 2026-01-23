---
title: Set Summon Max Life (Entity Action)
date: 2024-01-07
---

# Set Summon Max Life

Sets the maximum lifetime for temporary summoned entities (clones and minions). This allows you to extend or shorten how long they last.

Type ID: `sync:set_summon_max_life_ticks`

### Fields

Field | Type | Default | Description
------|------|---------|-------------
`amount` | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/) | | New maximum lifetime in ticks (20 ticks = 1 second)

### Notes

- Only works on entities that implement the `Temporary` interface (clones and minions)
- Setting to 0 or negative values makes them permanent until killed
- The countdown starts from when this action is executed

### Examples

```json
{
    "type": "sync:set_summon_max_life_ticks",
    "amount": 0
}
```
This example makes a summoned entity permanent.