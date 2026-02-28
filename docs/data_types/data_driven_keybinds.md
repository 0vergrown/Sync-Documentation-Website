---
title: Data-Driven Keybinds (Data Type)
date: 2025-01-01
---

# Data-Driven Keybinds

[Data Type](https://origins.readthedocs.io/en/latest/types/data_types/)

A system that allows server-side data packs to define custom keybindings that are automatically registered on the client when they join the server and unregistered when they leave. Defined keybinds appear in the vanilla **Controls** screen under their configured category, are fully rebindable by the player, and persist rebindings across sessions.

### How It Works

1. The server loads keybind definitions from `data/<namespace>/keybinds/<id>.json` during data pack reload.
2. When a player joins, the server sends all loaded definitions to their client via the `sync:keybind_sync` packet.
3. The client registers a `KeyBinding` for each definition and injects it into the Controls screen.
4. Any rebinding the player previously saved in `options.txt` is automatically restored.
5. When the player disconnects, all dynamically registered keybinds are removed.

The translation key for a registered keybind is derived from the file's location:
`data/<namespace>/keybinds/<path>.json` → `key.<namespace>.<path>`

This translation key is what powers and conditions reference when checking key state.

---

### File Location

```
data/<namespace>/keybinds/<id>.json
```

### Fields

Field | Type | Default | Description
------|------|---------|-------------
`key` | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/) | *required* | The default GLFW key translation key (e.g. `"key.keyboard.h"`). See [Key Names](#key-names) below.
`category` | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/) | *required* | The Controls screen category this keybind is grouped under (e.g. `"key.categories.misc"`). Custom category strings are supported and will be registered automatically.
`name` | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/) | *optional* | A human-readable label hint. This does **not** change what is displayed in the Controls screen — add a lang file entry for that (see [Display Names](#display-names)).

---

### Display Names

The Controls screen displays the keybind using its translation key (`key.<namespace>.<path>`). To show a readable label instead of the raw key, add a lang file entry in your resource pack:

```json
{
  "key.mymod.my_ability": "My Cool Ability"
}
```

Without a lang entry, the raw translation key is displayed.

---

### Referencing the Keybind in Powers

Use the derived translation key as the `"key"` value in any power or condition that accepts a key reference.

**Checking if a key is held (condition):**
```json
{
  "type": "sync:key_pressed",
  "key": "key.mymod.my_ability",
  "continuous": true
}
```

**Triggering an action on key press (active power):**
```json
{
  "type": "origins:active_self",
  "entity_action": {
    "type": "origins:apply_effect",
    "effect": {
      "effect": "minecraft:speed",
      "duration": 100,
      "amplifier": 1
    }
  },
  "key": {
    "key": "key.mymod.my_ability",
    "continuous": false
  }
}
```

---

### Player Rebinding Persistence

When a player rebinds a dynamic key in the Controls screen, vanilla Minecraft writes the new binding to `options.txt` as:
```
key_key.mymod.my_ability:key.keyboard.g
```

On the next session, the system reads `options.txt` during keybind registration and restores the saved binding before the keybind is shown in the Controls screen, giving players the same experience as any built-in keybind.

---

### Key Names

The `key` field accepts any GLFW key translation key. Common values:

| Key | Value |
|-----|-------|
| A–Z | `key.keyboard.a` – `key.keyboard.z` |
| 0–9 | `key.keyboard.0` – `key.keyboard.9` |
| F1–F12 | `key.keyboard.f1` – `key.keyboard.f12` |
| Left Mouse | `key.mouse.left` |
| Right Mouse | `key.mouse.right` |
| Middle Mouse | `key.mouse.middle` |
| Space | `key.keyboard.space` |
| Left Shift | `key.keyboard.left.shift` |
| Left Control | `key.keyboard.left.control` |
| Left Alt | `key.keyboard.left.alt` |
| Tab | `key.keyboard.tab` |
| Escape | `key.keyboard.escape` |
| Enter | `key.keyboard.enter` |

For a full list, refer to the [GLFW key names](https://www.glfw.org/docs/latest/group__keys.html) or the vanilla `InputUtil` class.

---

### Built-in Category Names

These vanilla category strings place your keybind alongside existing controls:

| Category | Description |
|----------|-------------|
| `key.categories.movement` | Movement keys (sprint, sneak, jump) |
| `key.categories.gameplay` | Gameplay keys (attack, use, pick block) |
| `key.categories.inventory` | Inventory keys |
| `key.categories.creative` | Creative mode keys |
| `key.categories.multiplayer` | Multiplayer keys |
| `key.categories.ui` | UI keys (screenshot, fullscreen) |
| `key.categories.misc` | Miscellaneous keys |

Custom strings (e.g. `key.categories.mymod`) are registered automatically and will appear as a new section in the Controls screen. Add a lang entry to display a readable name:
```json
{
  "key.categories.mymod": "My Mod"
}
```

---

### Examples

**Basic keybind using a vanilla category** (`data/mymod/keybinds/dash.json`):
```json
{
  "key": "key.keyboard.v",
  "category": "key.categories.misc"
}
```
Translation key: `key.mymod.dash`

---

**Keybind with a custom category** (`data/mymod/keybinds/special_ability.json`):
```json
{
  "key": "key.keyboard.r",
  "category": "key.categories.mymod",
  "name": "Special Ability"
}
```
Translation key: `key.mymod.special_ability`

Add to your lang file:
```json
{
  "key.categories.mymod": "My Mod",
  "key.mymod.special_ability": "Special Ability"
}
```

---

**Keybind used in an active power** (`data/mymod/keybinds/heal.json`):
```json
{
  "key": "key.keyboard.h",
  "category": "key.categories.mymod",
  "name": "Heal"
}
```

Power referencing it:
```json
{
  "type": "origins:active_self",
  "entity_action": {
    "type": "origins:heal",
    "amount": 4.0
  },
  "key": {
    "key": "key.mymod.heal",
    "continuous": false
  },
  "cooldown": 100
}
```

---

**Keybind checked as a condition** (`data/mymod/keybinds/focus.json`):
```json
{
  "key": "key.keyboard.left.alt",
  "category": "key.categories.mymod",
  "name": "Focus"
}
```

Condition checking whether the key is currently held:
```json
{
  "type": "sync:key_pressed",
  "key": "key.mymod.focus",
  "continuous": true
}
```

---

### Notes

- Keybinds are **server-defined** — a client connecting to a server without any keybind data packs will have no dynamic keybinds registered.
- Keybinds only exist while the client is **connected to the server** that defined them. They are removed on disconnect.
- Multiple data packs can define keybinds in the same or different namespaces without conflict, as long as their file paths differ.
- If two keybinds are assigned the same physical key, the vanilla Controls screen will highlight the conflict in red, identical to built-in keybind conflicts.
