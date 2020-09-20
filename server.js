const tmi = require("tmi.js");
const config = require("./config.js");
let exec = require("child_process").exec;

// https://github.com/tmijs/tmi.js#tmijs

const client = new tmi.client({
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: [config.channel],
});

client.on("message", function (channel, tags, message, self) {
  let isCorrectChannel = `#${config.channel}` === channel;
  let messageMatches = message.match(/\-?\d+/g);

  if (self) return;
  if (isCorrectChannel && messageMatches[0] && messageMatches[1]) {
    let python_command = "python3 etch.py "+messageMatches[0]+" "+messageMatches[1]
    // console.log(python_command)
    // console.log(`@${tags.username}: ${message}`);
    exec(python_command)
  }
});

client.addListener("connected", function (address, port) {
  console.log("Connected! Waiting for messages..");
});
client.addListener("disconnected", function (reason) {
  console.log("Disconnected from the server! Reason: " + reason);
});

client.connect();
if (config.channel === 'nerdstoke') {
  console.log("");
  console.log("'nerdstoke' is the default channel! Otherwise, run with the environment variable: ");
  console.log("TWITCH_CHANNEL=mychannelhere npm start");
  console.log("");
}
console.log(`Connecting to /${config.channel}..`);