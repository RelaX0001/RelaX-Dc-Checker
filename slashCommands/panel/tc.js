const { MessageAttachment } = require("discord.js");
const Discord = require("discord.js");

const settings = require("../../botconfig/settings.json");
module.exports = {
    name: "tc-bilgi",
    description: "tc numarasından oyuncu bilgileri",
    cooldown: 1.5,
    memberpermissions: [],
    requiredroles: [],
    alloweduserids: [],//Created By relax0002
    options: [
        {
            "String":
            {
                name: "tc",
                description: "Kişi'nin TCKN",
                required: true,
            },
        },
    ],
    run: async (client, interaction) => {
        const { member } = interaction;
        var mysql = require('mysql');
        var con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: '101m'
        });
        var tc = interaction.options.getString("tc");

        con.query(`SELECT * FROM 101m WHERE TC="${tc}"`, function (err, result) {
            if (err) throw err;

            let data = JSON.parse(JSON.stringify(result));//Created By relax0002
            if (data.length === 0) {
                interaction.reply({ content: "Belirtilen TC Numarası'na Ait Bilgi Bulunamadı!", ephemeral: true });
                return;
            }

            let as31 = data.map((o) => `${o.TC} ${o.ADI} ${o.SOYADI} ${o.DOGUMTARIHI} ${o.NUFUSIL} ${o.NUFUSILCE} ${o.ANNEADI} ${o.ANNETC} ${o.BABAADI} ${o.BABATC} ${o.UYRUK}`).join('\n');
            let dosyahazırla = new Discord.MessageAttachment(Buffer.from(as31), `RelaX Services.txt`);

            member.send({ files: [dosyahazırla] })
                .then(() => {
                    interaction.reply({ content: "**Başarılı!** DM Adresine Gönderildi (Dm Adresiniz Kapalı İse Bot Mesaj Gönderemez!)  https://discord.gg/ef6Dy2SRaz", ephemeral: true });
                })
                .catch(error => {
                    console.error(`DM Gönderilirken Hata Oluştu: ${error}`);
                    interaction.reply({ content: "Bilgilerinizi Gönderirken Bir Hata Oluştu. Lütfen Tekrar Deneyin!", ephemeral: true });
                });
        });
    }
};
//Created By relax0002