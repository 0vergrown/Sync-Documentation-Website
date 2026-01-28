---
title: Ghost Block (Block Action)
date: 2024-01-07
---

# Ghost Block

Places a temporary block at a position that automatically reverts after a specified duration.

Type ID: `sync:ghost_block`

### Fields

Field | Type | Default | Description
------|------|---------|-------------
`block` | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/) | | The block ID to temporarily place
`nbt` | [NBT](https://origins.readthedocs.io/en/latest/types/data_types/nbt/) | *optional* | NBT data for the block entity (if the block has one)
`tick` | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/) | `20` | How long the ghost block lasts in ticks (20 ticks = 1 second)
`block_action` | [Block Action](https://origins.readthedocs.io/en/latest/types/block_action_types/) | *optional* | Action to execute on the ghost block after placement

### Notes

- Reverts to the original block state after the specified duration
- Works server-side only - automatically syncs to clients
- Plays block breaking particles and sound when reverting
- Preserves original block data (including block entities) and restores it
- If the chunk unloads before the timer expires, the ghost block will not revert
- Block action is executed immediately after placing the ghost block

### Examples

```json
{
    "type": "sync:ghost_block",
    "block": "minecraft:glowstone",
    "tick": 40
}
```
Creates a temporary glowstone block that lasts for 2 seconds.
```json
{
    "type": "sync:ghost_block",
    "block": "minecraft:chest",
    "nbt": "{Items:[{Slot:0b,id:\"minecraft:diamond\",Count:1b}]}",
    "tick": 100,
    "block_action": {
        "type": "apoli:execute_command",
        "command": "playsound minecraft:block.chest.open block @a ~ ~ ~"
    }
}
```
Creates a temporary chest with an item inside that plays a sound when placed and disappears after 5 seconds.