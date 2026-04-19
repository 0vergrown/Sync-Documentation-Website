---
title: Bientity Action Types
date: 2026-03-01
---

# Bientity Action Types

Sync adds specialized bientity action types that work with its Entity Set power system, disguise system, command execution, entity conversion, etc.

## Available Bientity Action Types

| Action Type                                           | Description                                                      |
|-------------------------------------------------------|------------------------------------------------------------------|
| [Add to Entity Set](./add_to_entity_set.md)           | Adds an entity to an Entity Set                                  |
| [Convert Entity](./convert_entity.md)                 | Converts the target entity into another type                     |
| [Disguise](./disguise.md)                             | Makes the actor appear as the target                             |
| [Execute Command](./execute_command.md)               | Executes a command with UUID placeholders                        |
| [Explode](./explode.md)                               | Summons an explosion at either the actor or target location      |
| [Liberate Power](./liberate_power.md)                 | Lifts suppressions applied by Suppress Power on the target       |
| [Remove from Entity Set](./remove_from_entity_set.md) | Removes an entity from an Entity Set                             |
| [Rope Leash](./rope_leash.md)                         | Attaches a physics-simulated rope from the actor to the target   |
| [Suppress Power](./suppress_power.md)                 | Temporarily disables powers on the target without removing them  |
| [Transfer](./transfer.md)                             | Steals or returns power packages between actor and target        |


## How Bientity Actions Work

Bientity actions in Sync operate on pairs of entities: an **actor** (the entity performing the action) and a **target** (the entity being acted upon).

## Using Sync Bientity Actions
Sync's bientity actions are registered under the `sync` namespace and can be used anywhere Apoli bientity actions are accepted.

### Basic Structure
```json
{
  "type": "sync:action_type_name",
  // Action-specific fields...
}
```
