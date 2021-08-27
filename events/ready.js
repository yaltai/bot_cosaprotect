const client = require("../index");

client.on("ready", (client) => {
    console.log(`${client.user.tag} est prêt`)
    client.user.setPresence({
        activities: [{
          name: 'les tickets ...',
          type: 'WATCHING'
        }],
        status: 'dnd'
      })
});
