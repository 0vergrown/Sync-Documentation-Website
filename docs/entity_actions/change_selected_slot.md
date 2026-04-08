---
title: Change Selected Slot (Entity Action)
date: 2026-04-08
---

# Change Selected Slot

[Entity Action Types](https://origins.readthedocs.io/en/latest/types/entity_action_types/)

Changes the player's currently selected hotbar slot. The change is immediately synced to the client so the hotbar highlight and held-item visuals update at once.

Type ID: `sync:change_selected_slot`

### Fields

| Field  | Type                                                                          | Default    | Description                                                                                                                            |
|--------|-------------------------------------------------------------------------------|------------|----------------------------------------------------------------------------------------------------------------------------------------|
| `slot` | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/) | *required* | The hotbar slot to select. Must be in the range `0` (far-left) to `8` (far-right). Values outside this range are clamped automatically |

### Notes

- Only affects `PlayerEntity` instances; the action is silently skipped for non-player entities.
- The server immediately sends an `UpdateSelectedSlot` packet after changing the slot, so the client reflects the new selection without delay.
- Slot indices map directly to the hotbar: `0` = slot 1, `4` = slot 5 (middle), `8` = slot 9.

### Examples

```json
{
  "type": "sync:change_selected_slot",
  "slot": 0
}
```
Selects the first hotbar slot (far-left).

```json
{
  "type": "sync:change_selected_slot",
  "slot": 4
}
```
Selects the middle hotbar slot.
