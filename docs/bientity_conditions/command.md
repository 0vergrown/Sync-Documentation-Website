---
title: Command (Bi-entity Condition Type)
date: 2026-03-01
coder: JadeJuno
---

# Command
Coded By: [Jade Juno](https://github.com/JadeJuno)

[Bi-entity Condition Types](https://origins.readthedocs.io/en/latest/types/bientity_condition_types/)

Executes a command and checks its result (an integer) against a comparison. The command runs with the **actor** entity as the command source. Placeholders in the command string are replaced with the UUIDs of the actor and target entities.

Type ID: `sync:command`

### Fields
| Field             | Type                                                                                | Default | Description                                                                                                                        |
|-------------------|-------------------------------------------------------------------------------------|---------|------------------------------------------------------------------------------------------------------------------------------------|
| `command`         | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/)         |         | The command to execute. Can contain placeholders `%a` (actor UUID) and `%t` (target UUID) which will be replaced before execution. |
| `actor_selector`  | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/)         | `"%a"`  | The string in the command that should be replaced with the actor entity's UUID.                                                    |
| `target_selector` | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/)         | `"%t"`  | The string in the command that should be replaced with the target entity's UUID.                                                   |
| `comparison`      | [Comparison](https://origins.readthedocs.io/en/latest/types/data_types/comparison/) |         | How the command’s result value (an integer) should be compared to the specified value.                                             |
| `compare_to`      | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/)       |         | The value to compare the command result against.                                                                                   |

### How It Works
- The command is executed **as the actor entity** (same as [Execute Command](../bientity_actions/execute_command.md) Bi-Entity Action).
- Placeholders are replaced with the corresponding entity UUIDs.
- The command must return an integer result. This result is compared to `compare_to` using the given `comparison`.
- If the comparison succeeds, the condition returns `true`; otherwise `false`.

### Examples
```json
{
  "type": "sync:command",
  "command": "execute store result score @s sync.distance run execute unless entity @s[distance=..10]",
  "comparison": "==",
  "compare_to": 0
}
```
Check if the actor is within 10 blocks of the target (using `/execute store`). This is a bit contrived; in practice you would use an actual distance condition, but it demonstrates the concept.
```json
{
  "type": "sync:command",
  "command": "data get entity %t Tags[0]",
  "comparison": "==",
  "compare_to": 1
}
```
Check if the target has a specific tag. (Not a real use case; the point is that any command that returns a success count or a value can be used.)

```json
{
  "type": "sync:command",
  "command": "data get entity %a XpLevel",
  "comparison": ">=",
  "compare_to": 5
}
```
Check if a player has a certain amount of XP. This condition would be `true` if the actor (a player) has at least 5 experience levels.

### Notes
- The command result is the **return value** of the command. Usually this is the success count or the value stored by `/execute store ... run ...`.