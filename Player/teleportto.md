# TeleportTo

Teleports [Player](./index.md) to a specific map coordinate with various options.
Can handle combat state, vehicles, pets and other special conditions.

## Signature

```cpp
bool TeleportTo(Player* player, uint32 mapId, float x, float y, float z, float orientation, uint32 options, Unit* target, bool forced)
```

## Parameters

- `uint32 mapId`
- `float xCoord`
- `float yCoord`
- `float zCoord`
- `float orientation`
- `uint32 options = 0 (optional teleportation flags)`
- [Unit](../Unit/index.md)` target = nullptr (optional target for spell-based teleports)`
- `bool forced = false (force teleport even if conditions aren't met)`

## Returns

bool success : true if the player was teleported

## Enums

```cpp
TeleportToOptions
{
TELE_TO_GM_MODE             = 0x01,
TELE_TO_NOT_LEAVE_TRANSPORT = 0x02,
TELE_TO_NOT_LEAVE_COMBAT    = 0x04,
TELE_TO_NOT_UNSUMMON_PET    = 0x08,
TELE_TO_SPELL               = 0x10,
TELE_TO_NOT_LEAVE_VEHICLE   = 0x20,
TELE_TO_WITH_PET            = 0x40,
TELE_TO_NOT_LEAVE_TAXI      = 0x80
}
```

## Examples

```lua
player:Teleport(mapId, x, y, z, o)
player:Teleport(mapId, x, y, z, o, TELE_TO_NOT_LEAVE_COMBAT, target, true)
```
