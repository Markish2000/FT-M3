const commands = require("./commands");
process.stdout.write("prompt > ");

process.stdin.on("data", (data) => {
  const input = data.toString().trim().split(" ");
  const cmd = input.shift();
  const args = input.join(" ");

  commands[cmd]
    ? commands[cmd](args)
    : process.stdout.write("el comando no existe");
});
