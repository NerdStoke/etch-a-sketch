// change these two variables
let channel = process.env.TWITCH_CHANNEL || "nerdstoke";
let programName =
  process.env.CONFIG_PROGRAM_NAME || "Untitled 1 - Mousepad";
  
// List of commands to check for
let commands = [
  "left",
  "right",
  "up",
  "down",
];

let filteredCommands = [
  "democracy",
  "anarchy",];
let throttledCommands = [
  "shake",
];

module.exports = {
  // all commands to print out
  commands,
  // twitch channel to connect to
  channel,
  // Title of the window of the program (ex: 'Desmume' or 'VBA')
  programName,

  // If you need to filter the commands sent to the program
  // Ex: democracy/anarchy since they don't affect the program itself
  // Ex: ["democracy","anarchy","shake"]
  filteredCommands,

  // If you want to prevent people from using from command too often
  // Ex: ["shake"]
  throttledCommands,

  // Throttle time in seconds
  // Ex: you can limit 'shake' so it's only used every 10 sec
  timeToWait: 86400000,

  // Delay between each possible keypress in milliseconds (can't be too fast)
  // To change on Windows, change `key.py`
  delay: 5000,
};
