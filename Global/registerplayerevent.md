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
| 1 | PLAYER_EVENT_ON_CHARACTER_CREATE | (event, player) | WORLD | Triggered when character is created |
| 2 | PLAYER_EVENT_ON_CHARACTER_DELETE | (event, guid) | WORLD | Triggered when character is deleted |
| 3 | PLAYER_EVENT_ON_LOGIN | (event, player) | WORLD & MAP | Triggered when player loggin |
| 4 | PLAYER_EVENT_ON_LOGOUT | (event, player) | WORLD & MAP | Triggered when player logout |
| 5 | PLAYER_EVENT_ON_SPELL_CAST | (event, player, spell, skipCheck) | WORLD & MAP | Triggered when player cast spell |
| 6 | PLAYER_EVENT_ON_KILL_PLAYER | (event, killer, killed) | WORLD & MAP | Triggered when player kill player |
| 7 | PLAYER_EVENT_ON_KILL_CREATURE | (event, killer, killed) | WORLD & MAP | Triggered when player kill creature |
| 9 | PLAYER_EVENT_ON_DUEL_REQUEST | (event, target, challenger) | WORLD & MAP | Triggered when player received duel request |
| 10 | PLAYER_EVENT_ON_DUEL_START | (event, player1, player2) | WORLD & MAP | Triggered when player duel start |
| 11 | PLAYER_EVENT_ON_DUEL_END | (event, winner, loser, type) | WORLD & MAP | Triggered when player duel end |
| 12 | PLAYER_EVENT_ON_GIVE_XP | (event, player, amount, victim, xp_source) | WORLD & MAP | Triggered before player received exp <br>*(you can return new amount)* |
| 13 | PLAYER_EVENT_ON_LEVEL_CHANGE | (event, player, old_level) | WORLD & MAP | Triggered when player level change |
| 14 | PLAYER_EVENT_ON_MONEY_CHANGE | (event, player, amount) | WORLD & MAP | Triggered before player money changed <br>*(you can return new amount)* |
| 15 | PLAYER_EVENT_ON_REPUTATION_CHANGE | (event, player, faction_id, standing, incremental) | WORLD & MAP | Triggered before player reputation changed <br>*(you can return table with key "allow" and "standing")* |
| 16 | PLAYER_EVENT_ON_TALENTS_CHANGE | (event, player, points) | WORLD & MAP | Triggered when player talent changed |
| 17 | PLAYER_EVENT_ON_TALENTS_RESET | (event, player, no_cost) | WORLD & MAP | Triggered when player talent reset |
| 18 | PLAYER_EVENT_ON_CHAT | (event, player, type, lang, message) | WORLD & MAP | Triggered before player send message <br>*(you can return the new message)* |
| 19 | PLAYER_EVENT_ON_WHISPER | (event, player, type, lang, message, receiver) | WORLD & MAP | Triggered before player whisper message <br>*(you can return the new message)* |
| 20 | PLAYER_EVENT_ON_GROUP_CHAT | (event, player, type, lang, message, group) | WORLD & MAP | Triggered before player send group message <br>*(you can return the new message)* |
| 21 | PLAYER_EVENT_ON_GUILD_CHAT | (event, player, type, lang, message, guild) | WORLD & MAP | Triggered before player send guild message <br>*(you can return the new message)* |
| 22 | PLAYER_EVENT_ON_CHANNEL_CHAT | (event, player, type, lang, message, channel) | WORLD & MAP | Triggered before player send channel message <br>*(you can return the new message)* |
| 23 | PLAYER_EVENT_ON_EMOTE | (event, player, emote) | WORLD & MAP | Triggered when player perform an emote |
| 24 | PLAYER_EVENT_ON_EMOTE | (event, player, test_emote, emote_num, guid) | WORLD & MAP | Triggered when player perform a text emote |
| 25 | PLAYER_EVENT_ON_EMOTE | (event, player) | WORLD & MAP | Triggered when player is saved |
| 26 | PLAYER_EVENT_ON_BIND_TO_INSTANCE | (event, player, difficulty, map_id, permanent) | WORLD & MAP | Triggered when player is bind to instance |
| 27 | PLAYER_EVENT_ON_UPDATE_ZONE | (event, player, new_zone, new_area) | WORLD & MAP | Triggered when player change zone |
| 28 | PLAYER_EVENT_ON_MAP_CHANGE | (event, player) | WORLD & MAP | Triggered when player change map |
| 29 | PLAYER_EVENT_ON_EQUIP | (event, player, item, bag, slot, update) | WORLD & MAP | Triggered when player equip item |
| 30 | PLAYER_EVENT_ON_FIRST_LOGIN | (event, player) | WORLD & MAP | Triggered when player first time login |
| 31 | PLAYER_EVENT_ON_CAN_USE_ITEM | (event, player, item_template, inventory_result) | WORLD & MAP | Triggered before player use item <br>*(you can return table with key "allow" and "result")* |
| 32 | PLAYER_EVENT_ON_LOOT_ITEM | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 35 | PLAYER_EVENT_ON_CAN_REPOP_AT_GRAVEYARD | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 44 | PLAYER_EVENT_ON_LEARN_SPELL | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 45 | PLAYER_EVENT_ON_ACHI_COMPLETE | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 47 | PLAYER_EVENT_ON_UPDATE_AREA | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 48 | PLAYER_EVENT_ON_CAN_INIT_TRADE | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 49 | PLAYER_EVENT_ON_CAN_SEND_MAIL | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 50 | PLAYER_EVENT_ON_CAN_JOIN_LFG | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 51 | PLAYER_EVENT_ON_QUEST_REWARD_ITEM | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 52 | PLAYER_EVENT_ON_CREATE_ITEM | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 53 | PLAYER_EVENT_ON_STORE_NEW_ITEM | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 54 | PLAYER_EVENT_ON_COMPLETE_QUEST | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 55 | PLAYER_EVENT_ON_CAN_GROUP_INVITE | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 56 | PLAYER_EVENT_ON_GROUP_ROLL_REWARD_ITEM | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 57 | PLAYER_EVENT_ON_BG_DESERTION | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 58 | PLAYER_EVENT_ON_PET_KILL | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 64 | PLAYER_EVENT_ON_JUST_DIED | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 65 | PLAYER_EVENT_ON_CALCULATE_TALENT_POINTS | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 66 | PLAYER_EVENT_ON_RELEASED_GHOST | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 67 | PLAYER_EVENT_ON_SEND_INITIAL_PACKET_BEFORE_ADD_TO_MAP | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 68 | PLAYER_EVENT_ON_PVP_FLAG_CHANGE | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 69 | PLAYER_EVENT_ON_AFTER_SPEC_SLOT_CHANGED | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 70 | PLAYER_EVENT_ON_BEFORE_UPDATE | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 71 | PLAYER_EVENT_ON_UPDATE | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 72 | PLAYER_EVENT_ON_BEFORE_LOOT_MONEY | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 73 | PLAYER_EVENT_ON_REPUTATION_RANK_CHANGE | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 74 | PLAYER_EVENT_ON_GIVE_REPUTATION | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 75 | PLAYER_EVENT_ON_FORGOT_SPELL | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 76 | PLAYER_EVENT_ON_BEFORE_SEND_CHAT_MESSAGE | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 77 | PLAYER_EVENT_ON_LOAD_FROM_DB | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 78 | PLAYER_EVENT_ON_BEFORE_LOGOUT | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 79 | PLAYER_EVENT_ON_FAILED_DELETE | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 80 | PLAYER_EVENT_ON_BEFORE_TELEPORT | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 81 | PLAYER_EVENT_ON_UPDATE_FACTION | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 82 | PLAYER_EVENT_ON_ADD_TO_BATTLEGROUND | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 83 | PLAYER_EVENT_ON_QUEUE_RANDOM_DUNGEON | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 84 | PLAYER_EVENT_ON_REMOVE_FROM_BATTLEGROUND | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 85 | PLAYER_EVENT_ON_BEFORE_ACHI_COMPLETE | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 86 | PLAYER_EVENT_ON_CRITERIA_PROGRESS | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 87 | PLAYER_EVENT_ON_BEFORE_CRITERIA_PROGRESS | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 88 | PLAYER_EVENT_ON_ACHI_SAVE | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 89 | PLAYER_EVENT_ON_CRITERIA_SAVE | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 90 | PLAYER_EVENT_ON_BEING_CHARMED | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 91 | PLAYER_EVENT_ON_AFTER_SET_VISIBLE_ITEM_SLOT | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 92 | PLAYER_EVENT_ON_AFTER_MOVE_ITEM_FROM_INVENTORY | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 93 | PLAYER_EVENT_ON_PLAYER_JOIN_BG | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 94 | PLAYER_EVENT_ON_PLAYER_JOIN_ARENA | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 95 | PLAYER_EVENT_ON_GET_MAX_PERSONAL_ARENA_RATING_REQUIREMENT | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 96 | PLAYER_EVENT_ON_BEFORE_FILL_QUEST_LOOT_ITEM | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 97 | PLAYER_EVENT_ON_CAN_PLACE_AUCTION_BID | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 98 | PLAYER_EVENT_ON_BEFORE_OPEN_ITEM | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 99 | PLAYER_EVENT_ON_BEFORE_QUEST_COMPLETE | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 100 | PLAYER_EVENT_ON_QUEST_COMPUTE_EXP | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 101 | PLAYER_EVENT_ON_BEFORE_DURABILITY_REPAIR | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 102 | PLAYER_EVENT_ON_BEFORE_BUY_ITEM_FROM_VENDOR | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 103 | PLAYER_EVENT_ON_BEFORE_STORE_OR_EQUIP_NEW_ITEM | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 104 | PLAYER_EVENT_ON_AFTER_STORE_OR_EQUIP_NEW_ITEM | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 105 | PLAYER_EVENT_ON_AFTER_UPDATE_MAX_POWER | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 106 | PLAYER_EVENT_ON_AFTER_UPDATE_MAX_HEALTH | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 107 | PLAYER_EVENT_ON_BEFORE_UPDATE_ATTACK_POWER_AND_DAMAGE | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 108 | PLAYER_EVENT_ON_AFTER_UPDATE_ATTACK_POWER_AND_DAMAGE | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 109 | PLAYER_EVENT_ON_BEFORE_INIT_TALENT_FOR_LEVEL | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 110 | PLAYER_EVENT_ON_SET_MAX_LEVEL | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 111 | PLAYER_EVENT_ON_CAN_JOIN_IN_BATTLEGROUND_QUEUE | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 112 | PLAYER_EVENT_SHOULD_BE_REWARDED_WITH_MONEY_INSTEAD_OF_EXP | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 113 | PLAYER_EVENT_ON_BEFORE_TEMP_SUMMON_INIT_STATS | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 114 | PLAYER_EVENT_ON_BEFORE_GUARDIAN_INIT_STATS_FOR_LEVEL | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 115 | PLAYER_EVENT_ON_AFTER_GUARDIAN_INIT_STATS_FOR_LEVEL | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 116 | PLAYER_EVENT_ON_BEFORE_LOAD_PET_FROM_DB | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 117 | PLAYER_EVENT_ON_CAN_JOIN_IN_ARENA_QUEUE | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 118 | PLAYER_EVENT_ON_CAN_BATTLEFIELD_PORT | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 119 | PLAYER_EVENT_ON_CAN_GROUP_ACCEPT | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 120 | PLAYER_EVENT_ON_CAN_SELL_ITEM | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 121 | PLAYER_EVENT_PETITION_BUY | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 122 | PLAYER_EVENT_PETITION_SHOW_LIST | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 123 | PLAYER_EVENT_ON_REWARD_KILL_REWARDER | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 124 | PLAYER_EVENT_ON_CAN_GIVE_MAIL_REWARD_AT_GIVE_LEVEL | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 125 | PLAYER_EVENT_ON_DELETE_FROM_DB | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 126 | PLAYER_EVENT_ON_PLAYER_IS_CLASS | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 127 | PLAYER_EVENT_ON_GET_MAX_SKILL_VALUE | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 128 | PLAYER_EVENT_ON_PLAYER_HAS_ACTIVE_POWER_TYPE | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 129 | PLAYER_EVENT_ON_UPDATE_GATHERING_SKILL | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 130 | PLAYER_EVENT_ON_UPDATE_CRAFTING_SKILL | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 131 | PLAYER_EVENT_ON_UPDATE_FISHING_SKILL | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 132 | PLAYER_EVENT_ON_CAN_AREA_EXPLORE_AND_OUTDOOR | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 133 | PLAYER_EVENT_ON_VICTIM_REWARD_BEFORE | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 134 | PLAYER_EVENT_ON_VICTIM_REWARD_AFTER | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 135 | PLAYER_EVENT_ON_CUSTOM_SCALING_STAT_VALUE_BEFORE | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 136 | PLAYER_EVENT_ON_CUSTOM_SCALING_STAT_VALUE | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 137 | PLAYER_EVENT_ON_APPLY_ITEM_MODS_BEFORE | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 138 | PLAYER_EVENT_ON_APPLY_ENCHANTMENT_ITEM_MODS_BEFORE | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 139 | PLAYER_EVENT_ON_APPLY_WEAPON_DAMAGE | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 140 | PLAYER_EVENT_ON_CAN_ARMOR_DAMAGE_MODIFIER | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 141 | PLAYER_EVENT_ON_GET_FERAL_AP_BONUS | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 142 | PLAYER_EVENT_ON_CAN_APPLY_WEAPON_DEPENDENT_AURA_DAMAGE_MOD | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 143 | PLAYER_EVENT_ON_CAN_APPLY_EQUIP_SPELL | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 144 | PLAYER_EVENT_ON_CAN_APPLY_EQUIP_SPELLS_ITEM_SET | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 145 | PLAYER_EVENT_ON_CAN_CAST_ITEM_COMBAT_SPELL | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 146 | PLAYER_EVENT_ON_CAN_CAST_ITEM_USE_SPELL | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 147 | PLAYER_EVENT_ON_APPLY_AMMO_BONUSES | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 148 | PLAYER_EVENT_ON_CAN_EQUIP_ITEM | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 149 | PLAYER_EVENT_ON_CAN_UNEQUIP_ITEM | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 150 | PLAYER_EVENT_ON_CAN_SAVE_EQUIP_NEW_ITEM | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 151 | PLAYER_EVENT_ON_CAN_APPLY_ENCHANTMENT | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 152 | PLAYER_EVENT_ON_GET_QUEST_RATE | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 153 | PLAYER_EVENT_PASSED_QUEST_KILLED_MONSTER_CREDIT | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 154 | PLAYER_EVENT_CHECK_ITEM_IN_SLOT_AT_LOAD_INVENTORY | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 155 | PLAYER_EVENT_NOT_AVOID_SATISFY | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 156 | PLAYER_EVENT_NOT_VISIBLE_GLOBALLY_FOR | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 157 | PLAYER_EVENT_ON_GET_ARENA_PERSONAL_RATING | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 158 | PLAYER_EVENT_ON_GET_ARENA_TEAM_ID | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 159 | PLAYER_EVENT_ON_IS_FFA_PVP | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 160 | PLAYER_EVENT_ON_FFA_PVP_STATE_UPDATE | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 161 | PLAYER_EVENT_ON_IS_PVP | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 162 | PLAYER_EVENT_ON_GET_MAX_SKILL_VALUE_FOR_LEVEL | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 163 | PLAYER_EVENT_NOT_SET_ARENA_TEAM_INFO_FIELD | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 164 | PLAYER_EVENT_ON_CAN_SET_TRADE_ITEM | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 165 | PLAYER_EVENT_ON_SET_SERVER_SIDE_VISIBILITY | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |
| 166 | PLAYER_EVENT_ON_CAN_ENTER_MAP | (event, player) | WORLD & MAP | NOT DOCUMENTED YET |

## Examples

```lua
local function OnPlayerLogin(event, player)
    print("Player " .. player:GetName() .. " logged in")
end
RegisterPlayerEvent(3, OnPlayerLogin)

local function OnPlayerChangeReputation(event, player, faction_id, standing, incremental)
     if (player:GetName() == "Eclipse") then
         return false -- This disabled reputation gain
     end
     return { ["allow"] = true, ["standing"] = standing * 2 } -- This multiply reputation gain
end
```
