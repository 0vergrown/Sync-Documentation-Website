# Installation Guide

## Prerequisites

Before installing Sync, make sure you have:

1. **Minecraft 1.20.1**
2. **Fabric Loader** (latest version)
3. **Fabric API**
4. **Apoli** (version 2.7.0 or higher)
5. **Origins** (optional, but recommended for testing)

## Installation Steps

### Step 1: Download Sync
Download Sync from one of the following platforms:
- [Modrinth](https://modrinth.com/mod/sync)
- [CurseForge](https://www.curseforge.com/minecraft/mc-mods/overgrowns-sync)

### Step 2: Install Mods
1. Open your Minecraft mods folder
2. Place the following mods in the folder:
   - `fabric-api.jar`
   - `apoli.jar`
   - `origins.jar` (optional)
   - `sync.jar`

### Step 3: Launch Minecraft
1. Launch Minecraft with the Fabric profile
2. Verify Sync is loaded by checking the mods list

## Verifying Installation

To verify Sync is working correctly:

1. Create a new world
2. Run the command: `/function sync:test`
3. You should see a success message

## Troubleshooting

### Common Issues

**Issue:** Sync doesn't appear in the mods list
**Solution:** Make sure you're using Fabric Loader, not Forge

**Issue:** Game crashes on startup
**Solution:** Check that all dependencies are installed and compatible versions

**Issue:** Sync features not working
**Solution:** Ensure Apoli is installed and up to date