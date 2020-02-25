# Adding new rooms
After adding a new room (json file), the `room-index.js` file must be updated to import it. The `room-index.js` file is imported by the engine to load all rooms initially.

# Scripting
## Rooms
All rooms must have the following properties:
* name - The name shown to the player
* slug - the unique identifier for the room, format "Area/slug" (e.g. Forest/broken-bridge)
* description - the initial text shown to the player when entering a room or when "look" without a target is issued

Rooms can also have a list of features. These are things the player can interact with in the room. Rooms also generally have exits, either to the north, south, east, west, up, or down. These are handled as **user commands**.

## Features
All features must have the following properties:
* slug - what the player must type to target it

Special feature properties:
* roomDesc - if this property is a string, it will be outputted automatically when the a targetless _look_ is executed
* altSlugs - array of strings, alternate slugs that can reference this feature
* targetFlag - set this property to the name of a **flag** in order to prevent the user from targeting it if the flag is falsey
* destroyedFlag - set this property to the name of a **flag** in order to make it no longer targetable. (It is "destroyed")
* notice - set this to a **cmdList** or string. You can then reference it in the any other text by using "{the-feature's-slug}". When outputting that text, "{the-feature's-slug}" will be replaced by the text output of whatever string or commands are in the notice property of that slug.

Generally, all features should also handle the "look" command.

## Items
All items must have the following properties: 
* slug - the slug the player must type to target the item
* id - the globally unique item id of the item (string)
* look - the **cmdList** to execute when the player looks at the item

Items can also have a property called `altSlugs` which is an array of strings. The player can target this item by typing any of the altSlugs. This is useful because the slug "key" might target multiple keys in a player's inventory. The alt slugs (like "rusty key", "steel key", "brass key", etc.) lets the player target specific keys.

## Flags
The engine uses a concept of flags. These are just named boolean values. They can be set and checked in a variety of ways (see commands below). If the engine is ever given a flag name to evaluate, it does a little bit of parsing before checking its value.

If the flag name specified has a `&` anywhere in it, the flag name will be split by the `&` and the resulting pieces will each be evaluated as separate flags. They will then be anded together before being returned. This check is performed first.

If the flag name specified begins with a `!`, the value will be negated before being returned. This check is performed second.

If the flag name specified begins with a `G.`, the flag is considered a global flag rather than a flag local to the room. This check is performed last.

## Text Replacement
When the engine writes text output, it will automatically replace certain special syntaxes.

### Notice replacement
The string "{slug}" in any text output will result in a notice replacement. The engine will search the current room for a feature whose slug matches the string between the curly braces. If found and the feature has a `notice` property, the notice property will be executed as a **cmdList** and any text outputted will be captured. The resulting text will then replace the "{slug}" in the original text. Features marked "destroyed" will not be found. If the feature is not found or has no `notice` property, the "{slug}" will be replaced with an empty string. Note: This only works for a single command! 

### Variable replacement
The string "$varname$" in any text output will result in a variable replacement. The engine will get the value of that variable and replace the "$varname$" with it. If the variable is null or undefined, an empty string will be used instead.

## Handling user commands
To handle a user command on a room, feature, or item, simply add a property to the object that matches the command. The most general of these commands is "look". Almost all user command properties should be **cmdLists**. Some are **special commands**, though. It is also possible to set a command property to a simple string, in which case it will be parsed as a **string command**.

! The user may only enter commands that appear in verbs.json.

If the user enters a command and a target, the following steps are executed:
1. Find the specified target by slug (or by searching the altSlugs array if specified)
2. If target is not found, is not targetable, or is "destroyed", return invalid target message. Else, continue.
3. If the target has a property whose name matches the entered command, execute the **cmdList** in that property. Alternatively, if the target has a property whose name is pipe delimited that contains the entered command, execute the  **cmdList** in that property.

Alternatively, there are some commands that are two-word commands that do not target:
* "incant [incantation]" - incants the specified incantation, if known.

If the user enters a command without a target, it must be either "look", "incantations", "inventory", "north", "south", "east", "west", "clear", "up", or "down".
* "look" - clears the screen and writes out the room description
* "incantations" - writes out the known incantations
* "inventory" - writes out the inventory list
* "clear" - clears the screen of text
* "north", "south", "east", "west", "up", "down" - finds the matching property of the room, if any, and executes it as a **cmdList**

## CmdLists
A command list is simply an array of commands. When the engine processes a cmdList, it processes each item in the array sequentially. If the value is a string, it will be parsed as a **string command**. If it doesn't match any known text command syntaxes, it will be written out to the screen. If the value is an object, it must be one of the **complex commands**.

It is possible to nest cmdLists inside cmdLists.

## String Commands
String commands are simple commands that can be entered into a **cmdList** as a single string, generally with a pipe (|) delimiting the command from its arguments. The simplest, however, is *write*. The *write* command is executed for any string command that doesn't match a known syntax.

### callCommon|func_name(|room_slug)?
This will check to see if the current room has a `_common` property. If so, and it is an object, it will find a property of that object whose name matches the specified `func_name` and execute it as a **cmdList**. If the `room_slug` is provided as part of the command call, the engine will check the specified room for the `_common` property rather than the current room.

### loadRoom|room_slug
This will tell the engine to load a different room from the room dictionary. After loading, the engine will issue the targetless _look_ command.

### addItem|item_id
This will clone the specified item from the items list into the player's inventory.

### removeItem|item_id
This will remove the specified item from the player's inventory.

### setFlag|flag_name
This will set a variable with the specified name to true. If the name of the variable starts with "G.", it will be saved into the globalVars list of the game state. Otherwise, the variable will be scoped and accessible only to the current room. This means you don't have to worry about ensuring globally unique flag names (unless they start with "G."").

### unsetFlag|flag_name
This will set a variable with the specified name to false. If the name of the variable starts with "G.", it will be saved into the globalVars list of the game state. Otherwise, the variable will be scoped and accessible only to the current room. This means you don't have to worry about ensuring globally unique flag names (unless they start with "G."").

### ifFlagWrite|flag|text
This will only output text if the specified flag expression is truthy.

### incVar|var_name(|amount)?
This will increment a variable by 1 or by the amount specified (if provided). If the name of the variable starts with "G.", it will be saved into the globalVars list of the game state. Otherwise, the variable will be scoped and accessible only to the current room. This means you don't have to worry about ensuring globally unique flag names (unless they start with "G.""). Note: If the variable is not truthy, it will be considered 0.

### decVar|var_name(|amount)?
This will decrement a variable by 1 or by the amount specified (if provided). If the name of the variable starts with "G.", it will be saved into the globalVars list of the game state. Otherwise, the variable will be scoped and accessible only to the current room. This means you don't have to worry about ensuring globally unique flag names (unless they start with "G.""). Note: If the variable is not truthy, it will be considered 0.

### gameOver|message
This will put the game into a game over state and show the specified message to the user. A "Try Again" button will be visible which will reload the page.

### saveGame
This is a single-word command. This will cause the current game state to be saved to the browser's local storage.

## Complex Commands
Complex commands must be objects with a "cmd" property matching one of the below command names and an "args" property which is always an array. The values of the array depend on the command.

### ifRoom
```json
args: [
  "roomSlug",
  [],
  []
]
```
The current room's slug will be compared against "roomSlug". If it is the same, the first **cmdList** will be executed. Otherwise, the second will. Either **cmdList** can be null.

### ifFlag
```json
args: [
  "flagName",
  [],
  []
]
```
If the specified flag is truthy, the first **cmdList** will be executed. Otherwise, the second will. Either **cmdList** can be null.

### ifHasItem
```json
args: [
  "item_id",
  [],
  []
]
```
If the specified item is in the player's inventory, the first **cmdList** will be executed. Otherwise, the second will. Either **cmdList** can be null.

### ifVar
```json
args: [
  "var_name",
  "compare_operator",
  "compare_value",
  [],
  []
]
```
The first argument is the variable name that will be compared against. The second argument is the operator to use. It can be either `==`, `===`, `>`, `>=`, `<`, or `<=`. The third argument is the value to compare to. If the compare_value is a string in the format "$var_name$", the command will use the value of the variable with the name `var_name` instead of using the compare_value as a string.

The command will then compare the two values against each other using the specified compare_operator.

The fourth argument is a **cmdList** for if the comparison is true. The fifth argument is a **cmdList** for if the comparison is false.

### ifIsIn
```json
args: [
  "var_name",
  ["val1","val2","val3"],
  [],
  []
]
```
The first argument is the variable name that will be checked for. The second argument is an array of values that the variable will be compared against. They may be any combination of numbers or strings (the comparison is `==` not, `===`). The third arg is the **cmdList** to execute if the variable's value is found in the second argument and the fourth is a **cmdList** to execute if it is not.

### switchBranch
```json
args: [
  "var_name",
  {
    "": [],
    "case1": [],
    "case2": []
  }
]
```
The first argument is the name of the variable to check. The second argument must be an object whose properties are all **cmdLists**. If the value of the specified var matches the name of any of the properties, that property's **cmdList** will be executed. If a property appears on the object whose name is `""` and the var's value doesn't match any of the properties, the **cmdList** in `""` will be executed instead.

### pickOne
```json
args: [
  [],
  [],
  [],
  ...
]
```
The pickOne command accepts an array of **cmdLists**. It will randomly choose one of the **cmdLists** and parse it.

### waitForInput
```json
args: []
```
The args must be a **cmdList**, which is executed after any input from user. Note: The user's input will be ignored.

### choice
```json
args: [
  ["invalid commands"],
  ["choice1", "choice2", "choice3"],
  {
    "choice1": [],
    "choice2": [],
    "choice3": []
  }
]
```
The user must enter text that matches one of the items in the second arg (an array of strings). If they do not, the first argument (a **cmdList**) will be executed.

The last argument must be a choice object. A choice object is an object whose property names match the strings in the list_of_choices and whose values are **cmdLists**.

### dialog
The command "dialog" must have args set to a single object (*not a **cmdList***). The dialog object should have properties whose names are the topics the player can ask about and whose values are **cmdLists**. It must also have a property named `""` (empty string). If the player asks about a topic that doesn't appear on the dialog object as a property, the `""` command list will be executed.

## Special Commands
Special commands behave a little differently than complex commands. Each special command must be a property on the target  whose name matches the command and whose value is an object. The property name is italicised in the headers below. The command entered by the user must exactly match the format shown in the headers below (unless otherwise noted).

A special command should be a property of a feature or item whose value is an object. The object must have properties whose names are checked for by the command (see below). When a match is found, it will execute the value of that property as a **cmdList**. Additionally, the object should have a property whose name is "" (empty string) which is also a **cmdList**. If the player enters an option that does not appear on the object as a property, the "" **cmdList** will be executed. 

For example, to be able to "give" a feature in a room something, the feature must have the "give" property whose value is an object. That object would look like this:
```json
{
  "": [],
  "topic1": [],
  "topic2": []
}
```

### _ask_ [target] about [topic]
Ask is special. The user must type the command in the format shown. The target must have an "ask" property. Its value must be a **cmdList**. In order to actually trigger dialog, somewhere in the **cmdList** should be the "dialog" command. (see Complex Commands).

### combine [target] with [target]
Either target should have a combine object with a property matching the other's slug (or item_id). If a match is found, that property will be executed as a **cmdList**.

### give [item] to [target]
The give object should have properties whose names are the item_ids the player can give to the target. The **cmdList** matching the item_id will only be executed if the player has the item in their inventory.

You can optionally disable all giving to a target. If the give object has a property named `_requiredFlag` set to the name of a flag, the player can only give items to the target if the flag is truthy. Otherwise, they will get a message "You can't give things to ___ yet."

### use [something]
The use object should have a property named "" (empty string) which is a **cmdList**. This command will execute the "" (empty string) property of the use object.

Note: Both "use" commands target the same object.

### use [item] on [target]
The use object should have properties whose names are the item_ids the player can use on the target. Note: The **cmdList** matching the item_id will only be executed if the player has the item in their inventory.

Note: Both "use" commands target the same object.