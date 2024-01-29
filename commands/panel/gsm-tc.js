const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")

const settings = require("../../botconfig/settings.json");
module.exports = {
    name: "gsm-tc",
    description: "gsm numarasından tc bilgileri",
    cooldown: 1.5,
    memberpermissions: [],
    requiredroles: [],
    alloweduserids: [],
    options: [
        {//Created By relax0002
            "String": {
                name: "gsm",
                description: "Kişi'nin Telefon Numarası",
                required: true,
            },
        },
    ],
    run: async (client, interaction) => {
        const { member } = interaction;
        const { guild } = member;

        var mysql = require('mysql');
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "gsm"
        });
//Created By relax0002
        var adx = interaction.options.getString("gsm");

        con.query(`SELECT * FROM gsm WHERE gsm="${adx}"`, function (err, result) {
            let data = JSON.parse(JSON.stringify(result));
            if (err) throw err;

            if (data.length < 1) {
                return interaction.reply({
                    content: "Görünüşe Göre Bir Sonuç Bulunamadı Bunun Sebebi Aşağıdaki Maddelerden Biri Olabilir. \n ・ Sorguladığınız Numara Yeni İse Sistemimize Kayıtlı Olmayabilir \n ・ Numarayı Yanlış Girmiş Olabilirsiniz. Numara'nın Başında '0' Olmamalı ve Sayılar Birleşik Olmalıdır",
                    ephemeral: true
                });//Created By relax0002
            }

            if (adx.startsWith('0')) {
                return interaction.reply({ content: "Numara '0' Olmadan Yazılmalıdır", ephemeral: true });
            }

            let arr = [];
            for (const obj of result) {
                arr.push(obj.GSM);
            }
//Created By relax0002
            // Send information to the user who initiated the interaction
            data.map((o) => {
                const embed = new MessageEmbed()
                    .setTitle(`:tada: ${adx} Numarası'na Ait Tckn`)
                    .setDescription(`TCKN: ${o.TC}`)
                    .setColor("#0099ff");
                interaction.user.send({ embeds: [embed] });
            });

            interaction.reply({
                content: "**Başarılı!** DM Adresine Gönderildi (DM Adresiniz Kapalı İse Bot Mesaj Gönderemez)  https://discord.gg/ef6Dy2SRaz",
                ephemeral: true
            });
        });
    }
};
//Created By relax0002