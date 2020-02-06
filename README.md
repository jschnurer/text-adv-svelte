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
* altSlugs - array of strings, alternate slugs that can reference this feature
* targetFlag - set this property to the name of a **flag** in order to prevent the user from targeting it if the flag is falsey
* destroyedFlag - set this property to the name of a **flag** in order to make it no longer targetable. (It is "destroyed").
* notice - set this to a **cmdList** or string. You can then reference it in the any other text by using "{the-feature's-slug}". When outputting that text, "{the-feature's-slug}" will be replaced by the text output of whatever string or commands are in the notice property of that slug.

Generally, all features should also handle the "look" command.

## Items
All items must have the following properties: 
* slug - the slug the player must type to target the item
* id - the globally unique item id of the item (string)
* look - the **cmdList** to execute when the player looks at the item

Items can also have a property called `altSlugs` which is an array of strings. The player can target this item by typing any of the altSlugs. This is useful because the slug "key" might target multiple keys in a player's inventory. The alt slugs (like "rusty key", "steel key", "brass key", etc.) lets the player target specific keys.

## Handling user commands
To handle a user command on a room, feature, or item, simply add a property to the object that matches the command. The most general of these commands is "look". Almost all user command properties should be **cmdLists**. Some are **special commands**, though.

! The user may only enter commands that appear in verbs.json.

If the user enters a command and a target, the following steps are executed:
1. Find the specified target by slug (or by searching the altSlugs array if specified)
2. If target is not found, is not targetable, or is "destroyed", return invalid target message. Else, continue.
3. If the target has a property whose name matches the entered command, execute the command

If the user enters a command without a target, it must be either "look", "inventory", "north", "south", "east", "west", "clear", "up", or "down".
* "look" - clears the screen and writes out the room description
* "inventory" - clears the screen and writes out the inventory list
* "clear" - clears the screen of text
* "north", "south", "east", "west", "up", "down" - finds the matching property of the room, if any, and executes it as a **cmdList**

## CmdLists
A command list is simply an array of commands. When the engine processes a cmdList, it processes each item in the array sequentially. If the value is a string, it will be parsed as a **string command**. If it doesn't match any known text command syntaxes, it will be written out to the screen. If the value is an object, it must be one of the **complex commands**.

It is possible to nest cmdLists inside cmdLists.

## String Commands
String commands are simple commands that can be entered into a **cmdList** as a single string, generally with a pipe (|) delimiting the command from its arguments. The simplest, however, is *write*. The *write* command is executed for any string command that doesn't match a known syntax.

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


### waitForInput
```json
args: [
  []
]
```
The args must contain only a single **cmdList**, which is executed after any input from user. Note: The user's input will be ignored.

### choice
```json
args: [
  "invalid_choice_text",
  ["choice1", "choice2", "choice3"],
  {}
]
```
The user must enter text that matches one of the items in the second arg (an array of strings). If they do not, the invalid_choice_text will be written to the screen. The last argument must be a choice object.

A choice object is an object whose property names match the strings in the list_of_choices and whose values are **cmdLists**. For example:
```json
{
  "choice1": [],
  "choice2": [],
  "choice3": []
}
```
The user must enter text that matches one of the items in list_of_choices. If they do not, the invalid_choice_text will be written to the screen.

## Special Commands
Special commands behave a little differently than complex commands. Each special command must be a property on the target whose value is an object. The property name is italicised in the headers below. The command entered by the user must exactly match the format shown in the headers below (unless otherwise noted).

A special command should be a property of a feature or item whose value is an object. The object must have properties whose names are checked for by the command (see below). When a match is found, it will execute the value of that property as a **cmdList**. Additionally, the object should have a property whose name is "" (empty string) which is also a **cmdList**. If the player enters an option that does not appear on the object as a property, the "" **cmdList** will be executed. 

For example, to be able to "ask" a feature in a room something, the feature must have the "ask" property whose value is an object. That object would look like this:
```json
{
  "": [],
  "topic1": [],
  "topic2": []
}
```

### _ask_ [target] about [topic]
The ask object should have properties whose names are the topics the player can ask about.

### combine

### give [item] to [target]
The give object should have properties whose names are the item_ids the player can give to the target. Note: The **cmdList** matching the item_id will only be executed if the player has the item in their inventory.

### use [something]
The use object should have a property named "" (empty string) which is a **cmdList**. This command will execute the "" (empty string) property of the use object.

Note: Both "use" commands target the same object.

### use [item] on [target]
The use object should have properties whose names are the item_ids the player can use on the target. Note: The **cmdList** matching the item_id will only be executed if the player has the item in their inventory.

Note: Both "use" commands target the same object.