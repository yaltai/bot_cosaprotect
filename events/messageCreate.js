const client = require("../index");
const { Message, Collection } = require("discord.js");


/**
 * @param {Message} message
 */

client.on("messageCreate", async (message) => {
    const config = client.config
    config.prefix

  if (
    message.author.bot ||
    !message.guild ||
    !message.content.toLowerCase().startsWith(config.prefix)
  )
    return;
  const [cmd, ...args] = message.content
    .slice(config.prefix.length)
    .trim()
    .split(" ");
  const command =
    client.commands.get(cmd.toLowerCase()) ||
    client.commands.get(client.aliases.get(cmd.toLowerCase()));
  if (!command) return;
  if (!message.member.permissions.has(command.UserPerms || []))
    return message.channel.send({
      content: `Tu n'as pas les permissions pour utilisé cette commande !`,
    });
  if (!client.cooldowns.has(command.name || command.aliases)) {
    client.cooldowns.set(command.name, new Collection()) ||
    client.cooldowns.set(command.aliases, new Collection())
  }
  const now = Date.now();
  const timestamps = client.cooldowns.get(command.name || command.aliases);
  const cooldownAmount = (command.cooldown) * 1000;
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.channel.send(
        `**❌ Attend encore ${timeLeft.toFixed(
          1
        )} seconde(s) avant d'utiliser cette commande \`${prefix}${command.name || command.aliases}\`**`
      );
    }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  await command.run(client, message, args);
});
