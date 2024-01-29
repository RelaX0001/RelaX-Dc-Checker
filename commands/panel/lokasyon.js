const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")

const settings = require("../../botconfig/settings.json");
module.exports = {  //Created By relax0002
    name: "lokasyon-bilgi", //the command name for the Slash Command
    description: "Oyuncunun Lokasyon Verisi", //the command description for Slash Command Overview
    cooldown: 1.5,//Created By relax0002
    memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    options: [ //OPTIONAL OPTIONS, make the array empty / dont add this option if you don't need options!	
        //INFORMATIONS! You can add Options, but mind that the NAME MUST BE LOWERCASED! AND NO SPACES!!!, for the CHOCIES you need to add a array of arrays; [ ["",""] , ["",""] ] 
        //{"Integer": { name: "ping_amount", description: "How many times do you want to ping?", required: true }}, //to use in the code: interacton.getInteger("ping_amount")
        //{"String": { name: "ping_amount", description: "How many times do you want to ping?", required: true }}, //to use in the code: interacton.getString("ping_amount")
        //{"User": { name: "ping_a_user", description: "To Ping a user lol", required: false }}, //to use in the code: interacton.getUser("ping_a_user")
        //{"Channel": { name: "what_channel", description: "To Ping a Channel lol", required: false }}, //to use in the code: interacton.getChannel("what_channel")
        //{"Role": { name: "what_role", description: "To Ping a Role lol", required: false }}, //to use in the code: interacton.getRole("what_role")
        //{"IntChoices": { name: "what_ping", description: "What Ping do you want to get?", required: true, choices: [["Bot", 1], ["Discord Api", 2]] }, //here the second array input MUST BE A NUMBER // TO USE IN THE CODE: interacton.getInteger("what_ping")
        {
            "String":
            {//Created By relax0002
                name: "tc",
                description: "Kişinin TCKN (Varsa 1 DK Geç Gelir!)",
                required: true,
            },
            
        },
        
        //here the second array input MUST BE A STRING // TO USE IN THE CODE: interacton.getString("what_ping")
    ],
    run: async (client, interaction) => {
        const { member, channelId, guildId, applicationId,
            commandName, deferred, replied, ephemeral,
            options, id, createdTimestamp
        } = interaction;
        const { guild } = member;
            var mysql = require('mysql');
            var con = mysql.createConnection({
              host     : 'localhost',
              user     : 'root',
              password : '',
              database : 'secmen2015'
            });
           // interaction.reply("Yükleniyor...")
            var tc = interaction.options.getString("tc")
          
//Created By relax0002
            
            con.query(`SELECT * FROM secmen2015 WHERE TC="${tc}"`, function (err, result) {
                if (err) throw err;
                let data = JSON.parse(JSON.stringify(result))

                let as31 = data.map((o) => `${o.TC} ${o.ADI} ${o.SOYADI} ${o.CINSIYETI}, ${o.ANAADI} ${o.BABAADI}, ${o.DOGUMYERI} ${o.DOGUMTARIHI} ${o.NUFUSILI} ${o.NUFUSILCESI} ${o.ADRESIL} ${o.ADRESILCE} ${o.MAHALLE} ${o.CADDE} ${o.KAPINO} ${o.DAIRENO} ${o.ENGEL ||	""}`).join('\n')
                // interaction.channel.send(`:tada: ${tc} tc'li **${data.length}** kişi bulundu.`)
                 let dosyahazırla = new Discord.MessageAttachment(Buffer.from(as31), `RelaX Services.txt`);
                 interaction.user.send({ content: `:tada: ${tc} Tcsi'nin **2015-Lokasyon** Bilgisi.`, files: [ dosyahazırla ], ephemeral: true });
                // message.guild.channels.cache.get('1049044927306280973').send(`${message.author.tag} tarafından ${isim} ${soyisim} kişisi sorgulandı.`)
               }); 
             }//Created By relax0002
 }