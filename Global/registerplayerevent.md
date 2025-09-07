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
| 1 | PLAYER_EVENT_ON_LOGIN | (event, player) | WorldState + MapState | Triggered when player successfully logs in |
| 2 | PLAYER_EVENT_ON_LOGOUT | (event, player) | WorldState + MapState | Triggered when player logs out or disconnects |
| 3 | PLAYER_EVENT_ON_ENTER_WORLD | (event, player) | WorldState + MapState | Triggered when player enters the game world |
| 4 | PLAYER_EVENT_ON_LEAVE_WORLD | (event, player) | WorldState + MapState | Triggered when player leaves the game world |
| 5 | PLAYER_EVENT_ON_LEVEL_CHANGE | (event, player, oldLevel) | WorldState + MapState | Triggered when player gains or loses levels |
| 6 | PLAYER_EVENT_ON_MONEY_CHANGE | (event, player, amount) | WorldState + MapState | Triggered when player's money amount changes |
| 7 | PLAYER_EVENT_ON_GIVE_XP | (event, player, amount, victim) | WorldState + MapState | Triggered when player receives experience points |
| 8 | PLAYER_EVENT_ON_REPUTATION_CHANGE | (event, player, factionId, standing) | WorldState + MapState | Triggered when player's reputation with faction changes |
| 9 | PLAYER_EVENT_ON_DUEL_REQUEST | (event, player, challenger) | WorldState + MapState | Triggered when player receives a duel request |
| 10 | PLAYER_EVENT_ON_DUEL_START | (event, player, challenger) | WorldState + MapState | Triggered when a duel begins |
| 11 | PLAYER_EVENT_ON_DUEL_END | (event, player, winner) | WorldState + MapState | Triggered when a duel ends |
| 12 | PLAYER_EVENT_ON_CHAT | (event, player, type, lang, msg) | WorldState + MapState | Triggered when player sends a chat message |
| 13 | PLAYER_EVENT_ON_EMOTE | (event, player, emote) | WorldState + MapState | Triggered when player performs an emote |
| 14 | PLAYER_EVENT_ON_TEXT_EMOTE | (event, player, textEmote, emoteNum, guid) | WorldState + MapState | Triggered when player performs a text-based emote |
| 15 | PLAYER_EVENT_ON_SPELL_CAST | (event, player, spell, skipCheck) | WorldState + MapState | Triggered when player casts a spell |
| 16 | PLAYER_EVENT_ON_KILL_PLAYER | (event, killer, killed) | WorldState + MapState | Triggered when player kills another player |
| 17 | PLAYER_EVENT_ON_KILL_CREATURE | (event, killer, killed) | WorldState + MapState | Triggered when player kills a creature |
| 18 | PLAYER_EVENT_ON_KILLED_BY_CREATURE | (event, killer, victim) | WorldState + MapState | Triggered when player is killed by a creature |
| 19 | PLAYER_EVENT_ON_KILLED_BY_PLAYER | (event, killer, victim) | WorldState + MapState | Triggered when player is killed by another player |
| 20 | PLAYER_EVENT_ON_GAIN_HONOR | (event, player, amount) | WorldState + MapState | Triggered when player gains honor points |

## Examples

```lua
local function OnPlayerLogin(event, player)
    print("Player " .. player:GetName() .. " logged in")
end
RegisterPlayerEvent(1, OnPlayerLogin)

RegisterPlayerEvent(5, function(event, player, oldLevel)
    print("Player leveled from " .. oldLevel .. " to " .. player:GetLevel())
end)
```
