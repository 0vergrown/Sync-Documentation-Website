---
title: Introduction to Sync
lastUpdated: 2024-01-15
version: 1.0.0
---

# Introduction to Sync

Sync is a Fabric mod library designed to extend and enhance the capabilities of [Apoli](https://github.com/apoli-mod/apoli), the power system used by the [Origins](https://originsmod.org/) mod. It brings features from newer versions of Apoli to Minecraft 1.20.1 and adds entirely new functionality for datapack creators.

## What is Sync?

Sync stands for **System for Yielding New Capabilities**. It's a library mod that provides:

- **Backported Features**: Functionality from newer versions of Apoli made available for 1.20.1
- **New Power Types**: Additional power types beyond what Apoli provides
- **Enhanced Conditions**: More condition types for precise control over power activation
- **Custom Actions**: New action types for more dynamic gameplay
- **Developer Tools**: Utilities and examples to accelerate datapack development

## Why Use Sync?

### For Datapack Creators
Sync extends your creative possibilities by providing:

1. **More Power Types**: Create more complex and interesting origins
2. **Better Control**: Fine-tune when and how powers activate
3. **New Interactions**: Add unique behaviors to your datapacks
4. **Future Compatibility**: Features that will help transition to newer versions

### For Server Administrators
Sync enables:

1. **Richer Gameplay**: More diverse and balanced origin options
2. **Better Performance**: Optimized implementations of complex features
3. **Easy Integration**: Works seamlessly with existing Apoli/Origins setups

## Key Features

### Backported Features
- Feature A from Apoli 2.0
- Feature B from Apoli 2.1
- Feature C from Apoli 2.2

### New Power Types
- **`sync:custom_power`**: A highly configurable power type
- **`sync:entity_power`**: Powers that affect specific entities
- **`sync:world_power`**: World-interaction based powers

### Enhanced Conditions
- **`sync:biome_check`**: Condition based on biome
- **`sync:dimension_check`**: Dimension-specific conditions
- **`sync:time_check`**: Time-based activation

### Custom Actions
- **`sync:custom_effect`**: Apply custom effects
- **`sync:entity_transform`**: Transform entities
- **`sync:world_modify`**: Modify world blocks/states

## Getting Started

To start using Sync:

1. **Install Sync** alongside Fabric, Apoli, and Origins
2. **Explore the documentation** to understand available features
3. **Create or modify** your datapacks to use Sync's features
4. **Test and refine** your creations

## Compatibility

Sync is designed to be fully compatible with:

- **Minecraft**: 1.20.1
- **Fabric Loader**: Latest version
- **Apoli**: 2.7.0+
- **Origins**: 1.10.0+

## Example Usage

Here's a simple example of a Sync power:

```json
{
  "type": "sync:custom_power",
  "name": "example:fire_walker",
  "description": "Walk on lava without taking damage",
  "hidden": false,
  "condition": {
    "type": "sync:standing_on",
    "block": "minecraft:lava"
  },
  "action": {
    "type": "sync:prevent_damage",
    "damage_condition": {
      "type": "apoli:fire"
    }
  }
}