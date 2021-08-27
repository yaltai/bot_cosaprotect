const { MessageActionRow, MessageButton, Collection, MessageAttachment } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const client = require("../index");

client.on("interactionCreate", async (interaction, message) => {
  await interaction.deferUpdate();
  if (interaction.isButton()) {
    if (interaction.customId === "tic") {
      const thread = await interaction.guild.channels.create(
        `ticket de ${interaction.user.username}`,
        {
          type: "text",
          parent: "876988511310471219", // ID CATEGORIE TICKET
          permissionOverwrites: [
            {
              id: interaction.user.id,
              allow: ["VIEW_CHANNEL"],
              deny: ["SEND_MESSAGES"],
            },
            {
              id: "865218439169835058", // ID EVERYONE
              deny: ["VIEW_CHANNEL"],
            },
            {
              id: "865218436761518080", // ID STAFF
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
            },
            {
              id: "872174839635513354", // ID DOUANE
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
            },
          ],
        }
      );
      const embed1 = new MessageEmbed()
        .setAuthor(
          `${interaction.user.username} | Cosa Nostra`,
          "https://cdn.discordapp.com/icons/835495895909793793/8e86be9b82a380e4b34c8048e56088bb.webp?size=128"
        )
        .setDescription("Veuillez séléctionnez la raison de votre ticket")
        .setColor('#9300FF')

      let candi = new MessageButton()
        .setStyle("SECONDARY")
        .setCustomId("candi")
        .setLabel("Candidature");
      let divers = new MessageButton()
        .setStyle("SECONDARY")
        .setCustomId("divers")
        .setLabel("Divers");

      const row1 = new MessageActionRow().addComponents(divers, candi);

      thread
        .send({
          embeds: [embed1],
          components: [row1],
        })
        .then(async () => {
          interaction.followUp({
            content: "Ticket créé",
            ephemeral: true,
          });
        });
    } else if (interaction.customId === "del") {
        const thread = interaction.channel;
        const rembed = new MessageEmbed()
        .setAuthor(
            `${interaction.user.username} | Cosa Nostra`,
            "https://cdn.discordapp.com/icons/835495895909793793/8e86be9b82a380e4b34c8048e56088bb.webp?size=128"
        )
        .setDescription('Êtes-vous sur de vouloir supprimé ce ticket !')
        .setColor('#9300FF')
        let oui = new MessageButton()
        .setStyle("SUCCESS")
        .setCustomId("oui")
        .setLabel("Oui");

        let non = new MessageButton()
        .setStyle("DANGER")
        .setCustomId("non")
        .setLabel("Non");
        const row3 = new MessageActionRow().addComponents(oui, non);
        thread.send({embeds : [rembed], components : [row3] })


    } else if (interaction.customId === "oui") {
        const thread = interaction.channel;
        thread.delete()
          
    } else if (interaction.customId === 'non') {
        const thread = interaction.channel;
        thread.bulkDelete(1)
    }
    else if (interaction.customId === "candi") {
      const thread = interaction.channel;
      thread.bulkDelete(1);
      thread.edit({
        name: `Candidature de ${interaction.user.username}`,
        permissionOverwrites: [
          {
            id: interaction.user.id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
          },
          {
            id: "865218439169835058", // ID EVERYONE
            deny: ["VIEW_CHANNEL"],
          },
          {
            id: "874774779612258335", // ID STAFF
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
          },
        ],
      });
      const embed = new MessageEmbed()
        .setAuthor(
          `${interaction.user.username} | Cosa Nostra`,
          "https://cdn.discordapp.com/icons/835495895909793793/8e86be9b82a380e4b34c8048e56088bb.webp?size=128"
        )
        .setDescription(
          "Nous vous demandons d'expliquer votre requête de la manière la plus précise possible afin que le staff vous aide le plus vite possible. Merci d'avance"
        )
        .setFooter(
          "Pour fermer le ticket merci de cliquer sur le bouton ci dessous. ⬇️"
        )
        .setColor('#9300FF')
      const del = new MessageButton()
        .setCustomId("del")
        .setLabel("🗑️ Supprimez le ticket")
        .setStyle("DANGER");

      let btn2 = new MessageButton()
        .setStyle("LINK")
        .setURL(
          "https://docs.google.com/presentation/d/1BdAHo0UAYI6SkScpU7B9XIZqog2QHTkiVj-0OLSRWwo/edit#slide=id.gb802129777_1_0"
        )
        .setLabel("Réglement")
        .setEmoji("📜");
      const row = new MessageActionRow().addComponents(del, btn2);
      thread.send({ embeds: [embed], components: [row] });
    } else if (interaction.customId === "divers") {
      const thread = interaction.channel;
      thread.bulkDelete(1);
      thread.edit({
        name: `Divers de ${interaction.user.username}`,
        permissionOverwrites: [
          {
            id: interaction.user.id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
          },
          {
            id: "865218439169835058", // ID EVERYONE
            deny: ["VIEW_CHANNEL"],
          },
          {
            id: "874774779612258335", // ID STAFF
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
          },
        ],
      });
      const embed = new MessageEmbed()
        .setAuthor(
          `${interaction.user.username} | Cosa Nostra`,
          "https://cdn.discordapp.com/icons/835495895909793793/8e86be9b82a380e4b34c8048e56088bb.webp?size=128"
        )
        .setDescription(
          "Nous te demandons d'expliquer ta requête de la manière la plus précise possible afin que le staff t'aide le plus vite possible. Merci d'avance"
        )
        .setColor('#9300FF')
        .setFooter(
          "Pour fermer le ticket merci de cliquer sur le bouton ci dessous. ⬇️"
        );

      const del = new MessageButton()
        .setCustomId("del")
        .setLabel("🗑️ Supprimez le ticket")
        .setStyle("DANGER");

      let btn2 = new MessageButton()
        .setStyle("LINK")
        .setURL(
          "https://docs.google.com/presentation/d/1BdAHo0UAYI6SkScpU7B9XIZqog2QHTkiVj-0OLSRWwo/edit#slide=id.gb802129777_1_0"
        )
        .setLabel("Réglement")
        .setEmoji("📜");

      const row = new MessageActionRow().addComponents(del, btn2);
      thread.send({ embeds: [embed], components: [row] });
    } else if (interaction.customId === "remb") {
      const thread = interaction.channel;
      thread.bulkDelete(1);
      thread.edit({
        name: `Remboursement de ${interaction.user.username}`,
        permissionOverwrites: [
          {
            id: interaction.user.id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
          },
          {
            id: "865218439169835058", // ID EVERYONE
            deny: ["VIEW_CHANNEL"],
          },
          {
            id: "865218436761518080", // ID STAFF
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
          },
          {
            id: "872174839635513354", // ID DOUANE
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
          },
        ],
      });
      const embed = new MessageEmbed()
        .setAuthor(
          `${interaction.user.username} | Cosa Nostra`,
          "https://cdn.discordapp.com/icons/835495895909793793/8e86be9b82a380e4b34c8048e56088bb.webp?size=128"
        )
        .setDescription(
          "Nous te demandons d'expliquer ta requête de la manière la plus précise possible afin que le staff t'aide le plus vite possible. Merci d'avance"
        )
        .setColor('#9300FF')
        .setFooter(
          "Pour fermer le ticket merci de cliquer sur le bouton ci dessous. ⬇️"
        );
      const del = new MessageButton()
        .setCustomId("del")
        .setLabel("🗑️ Supprimez le ticket")
        .setStyle("DANGER");

      let btn2 = new MessageButton()
        .setStyle("LINK")
        .setURL(
          "https://docs.google.com/presentation/d/1BdAHo0UAYI6SkScpU7B9XIZqog2QHTkiVj-0OLSRWwo/edit#slide=id.gb802129777_1_0"
        )
        .setLabel("Réglement")
        .setEmoji("📜");

      const row = new MessageActionRow().addComponents(del, btn2);
      thread.send({ embeds: [embed], components: [row] });
    }
  }
});

