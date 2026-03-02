---
title: Execute Command (Bi-entity Action Type)
date: 2026-03-01
coder: JadeJuno
---

# Execute Command
Coded By: [Jade Juno](https://github.com/JadeJuno)

[Bi-entity Action Types](https://origins.readthedocs.io/en/latest/types/bientity_action_types/)

Executes a command on the server, using the **actor** entity as the command source. Placeholders in the command string are replaced with the UUIDs of the actor and target entities.

Type ID: `sync:execute_command`

### Fields
| Field             | Type                                                                        | Default | Description                                                                                                                        |
|-------------------|-----------------------------------------------------------------------------|---------|------------------------------------------------------------------------------------------------------------------------------------|
| `command`         | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/) |         | The command to execute. Can contain placeholders `%a` (actor UUID) and `%t` (target UUID) which will be replaced before execution. |
| `actor_selector`  | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/) | `"%a"`  | The string in the command that should be replaced with the actor entity's UUID.                                                    |
| `target_selector` | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/) | `"%t"`  | The string in the command that should be replaced with the target entity's UUID.                                                   |

### How It Works
- The command is executed **as the actor entity**. This means that selectors like `@s` inside the command will target the actor.
- Before execution, every occurrence of `actor_selector` in the command is replaced with the actor’s UUID (as a string), and every occurrence of `target_selector` is replaced with the target’s UUID.
- The replacement strings can be changed from the defaults if needed (for example if you want to use a different placeholder like `{actor}`).

### Examples
```json
{
  "type": "sync:execute_command",
  "command": "tp %a %t"
}
```
Teleport the actor to the target by replacing `%a` with the actor's UUID and `%t` with the target's UUID, then teleports the actor to the target.

```json
{
  "type": "sync:execute_command",
  "command": "give {actor} minecraft:gunpowder",
  "actor_selector": "{actor}"
}
```
Give the actor the gunpowder item using custom placeholders.

```json
{
  "type": "sync:execute_command",
  "command": "execute at %t run summon minecraft:lightning_bolt"
}
```
Summon a lightning bolt at the target’s position because the command is run as the actor, we use `execute at %t` to change execution position.