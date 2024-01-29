const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")

const settings = require("../../botconfig/settings.json");
module.exports = {
    name: "tc-gsm", //the command name for the Slash Command
    description: "tc den gsm bulma", //the command description for Slash Command Overview
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
                description: "Kişinin TCKN",
                required: true,
            },
            //Created By relax0002
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
                host: "localhost",
                user: "root",
                password: "",
                database: "gsm"
              });
            //interaction.reply("Yükleniyor...")
            var tc = interaction.options.getString("tc")
            //
            con.query(`SELECT * FROM gsm WHERE TC="${tc}"`, function (err, result) {
                let data = JSON.parse(JSON.stringify(result))
              if (err) throw err;
              data.map((o) => console.log(o.GSM))
              //message.reply(require('util').inspect(result));
    
              if(data.length < 1) return interaction.reply({ content: "Görünüşe Göre Bir Sonuç Bulunamadı Bunun Sebebi Aşağıdaki Maddelerden Biri Olabilir. \n ・ Sorguladığınız Kişinin Yaşı Küçükse Telefon Numarası Kişinin Anne Veya Babasına Kayıtlı Olabilir \n ・ Eğer Kişi Telefon Numarası'nı Yakın Bir Zaman'da Almış İse Sistemlerimiz'de Kayıt'lı Olmayabilir", ephemeral: true })
              if(tc.startsWith('0')) return interaction.reply(`Eksik Veya Hatalı Kullanım`)
              let arr = []
              for ( const obj of result) {
                arr.push(obj.TC)
//Created By relax0002
              }
                 
    //data.map((o) => interaction.channel.send(`:tada: ${tc}'ye ait bilgiyi buldum. \n ${o.GSM}`))
   // interaction.reply({ content: `:tada: ${tc}'ye ait bilgiyi buldum. \n ${o.GSM}`, ephemeral: true });
   data.map((o) => interaction.user.send({ content: `:tada: ${tc}'Ye Ait Bilgi'yi Buldum! \n ${o.GSM}`, ephemeral: true }))
   interaction.reply({ content: "**Başarılı!** DM Adresine Gönderildi (Dm Adresiniz Kapalı İse Bot Mesaj Gönderemez!)  https://discord.gg/ef6Dy2SRaz", ephemeral: true })
    // message.guild.channels.cache.get('1049044927306280973').send(`${message.author.tag} tarafından ${isim} ${soyisim} kişisi sorgulandı.`)
              }); 
            }
}//Created By relax0002