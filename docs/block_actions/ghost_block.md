---
title: Ghost Block (Block Action)
date: 2024-01-07
---

# Ghost Block

[Block Action Types](https://origins.readthedocs.io/en/latest/types/block_action_types/)

Places a temporary block at a position that automatically reverts after a specified duration.

Type ID: `sync:ghost_block`

### Fields

Field | Type | Default | Description
------|------|---------|-------------
`block` | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/) | | The block ID to temporarily place
`nbt` | [NBT](https://origins.readthedocs.io/en/latest/types/data_types/nbt/) | *optional* | NBT data for the block entity (if the block has one)
`tick` | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/) | `20` | How long the ghost block lasts in ticks (20 ticks = 1 second)
`block_action` | [Block Action](https://origins.readthedocs.io/en/latest/types/block_action_types/) | *optional* | Action to execute on the ghost block after placement
`add_block` | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/) | `false` | If true, places the block adjacent to the target position (using the direction parameter)
`end_action` | [Block Action](https://origins.readthedocs.io/en/latest/types/block_action_types/) | *optional* | Action to execute when the ghost block expires/reverts

### How It Works

This action places a temporary block that automatically reverts to the original block state after the specified duration. The behavior depends on the `add_block` field:

- **`add_block: false` (default)**: Replaces the block at the target position
- **`add_block: true`**: Places the block adjacent to the target position in the direction of the block action (useful with raycasts or directional interactions)

When multiple ghost blocks are placed at the same position:
- The newest ghost block replaces the previous one
- The original block state from the *first* ghost block is preserved
- The timer resets with the new ghost block's duration

### Execution Order

1. Original block state is saved
2. Ghost block is placed
3. Block entity NBT is applied (if specified)
4. `block_action` executes (if specified)
5. After `tick` duration expires:
   - Original block is restored
   - `end_action` executes (if specified)
   - Block break particles and sound play

### Notes

- Works server-side only - automatically syncs to clients
- Preserves original block data (including block entities) and restores it
- If the chunk unloads before the timer expires, the ghost block will not revert
- Replacing a ghost block with another ghost block preserves the original state from the first block

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
    "block": "minecraft:barrier",
    "tick": 100,
    "add_block": true,
    "end_action": {
        "type": "apoli:execute_command",
        "command": "particle minecraft:cloud ~ ~ ~ 0.5 0.5 0.5 0.1 50"
    }
}
```
Places a temporary barrier block in front of the target position that spawns particles when it expires.

```json
{
    "type": "sync:ghost_block",
    "block": "minecraft:chest",
    "nbt": "{Items:[{Slot:0b,id:\"minecraft:diamond\",Count:1b}]}",
    "tick": 100,
    "block_action": {
        "type": "apoli:execute_command",
        "command": "playsound minecraft:block.chest.open block @a ~ ~ ~"
    },
    "end_action": {
        "type": "apoli:execute_command",
        "command": "playsound minecraft:block.chest.close block @a ~ ~ ~"
    }
}
```
Creates a temporary chest with an item inside that plays sounds when placed and when it disappears after 5 seconds.