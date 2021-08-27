const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "ticket",
  description: "crée un ticket pour t'aider",
  UserPerms: ["ADMINISTRATOR"],
  run: async (client, message, args) => {
    
    const embed = new MessageEmbed()
    .setColor("#9300FF")
    .setTitle("**Création de Ticket**")
    .setAuthor("Marbuela", "https://cdn.discordapp.com/icons/835495895909793793/8e86be9b82a380e4b34c8048e56088bb.webp?size=128")
    .setDescription(`Une question ou un problème?\nVeuillez sélectionnez le bouton ci-dessous.`)
    .setFooter("Marbuela ・ 2021")


 const bt = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setCustomId('tic')
        .setLabel('🎫 Créer un ticket !')
        .setStyle('SUCCESS'),
    );

 message.channel.send({
    embeds: [embed],
    components: [bt]
});
  },
};
