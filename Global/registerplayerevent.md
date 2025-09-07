# RegisterPlayerEvent

Register a callback function for a specific player event

## Signature

```cpp
void RegisterPlayerEvent(LuaEngine* lua, uint32 eventId, sol::function callback)
```

## Parameters

- `uint32 eventId The player event ID to register for`
- `function callback The Lua function to call when event triggers`

## Enums

| Event ID | Event Name | Arguments | Context | Description |
|----------|------------|-----------|---------|-------------|
| 1 | PLAYER_EVENT_ON_CHARACTER_CREATE | (event, player) | WORLD_STATE (-1) | Triggered when character is created |
| 2 | PLAYER_EVENT_ON_CHARACTER_DELETE | (event, guid) | WORLD_STATE (-1) | Triggered when character is deleted |
| 3 | PLAYER_EVENT_ON_LOGIN | (event, player) | WORLD_STATE (-1) & MAP_STATE | Triggered when player loggin |
| 4 | PLAYER_EVENT_ON_LOGOUT | (event, player) | WORLD_STATE (-1) & MAP_STATE | Triggered when player logout |

## Examples

```lua
local function OnPlayerLogin(event, player)
    print("Player " .. player:GetName() .. " logged in")
end
RegisterPlayerEvent(3, OnPlayerLogin)

RegisterPlayerEvent(5, function(event, player, oldLevel)
    print("Player leveled from " .. oldLevel .. " to " .. player:GetLevel())
end)
```
