const Discord = require('discord.js');
const client = new Discord.Client();
var prefix = "-"

client.on('ready', () => {
  console.log(`Bot Giriş Yaptı!`);
});

client.on('ready', () => {
  client.user.setStatus("PLAYING"); 
  client.user.setActivity('-yardım', { type: "PLAYING"}); 
})

  client.on("message", (message) => {
    const arg = message.content.slice(prefix.length).trim().split(/ +/g);
    const komut = arg.shift().toLowerCase();
    if(komut === "çevir") {
            var cevir = require('node-google-translate-skidz');
            let hdil = arg[0];
            if(!hdil) return message.channel.send("**Hata,** şöyle yazmalısın: `-çevir [tr/en vs.] [kelime]`");
            if(hdil.length > 2) return message.channel.send("**Hata,** şöyle yazmalısın: `$çevir [tr/en vs.] [kelime]`");
            var cevrt = arg.slice(1).join(" ");
            if(!cevrt){
                message.channel.send("Çevirmek istediğin dili yazmalıydın!");
            }
            cevir({
                text: cevrt,
                target: hdil
            }, function(result) {
                var dl = result.translation
                const embed = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .addField("Çevrilmek istenen metin:", cevrt)
                .addField("Çevrilen Metin:", dl)
                .setFooter("Çeviri", message.author.avatarURL)
                 message.channel.send({embed})
                    .catch(error => message.channel.send("Bir hata oluştu!"))
            });
            }
});

client.on('guildMemberAdd', member => {
  let guild = member.guild;
  let joinRole = guild.roles.find('name', 'verme'); 
  member.addRole(joinRole); 
  const channel = member.guild.channels.find('name', 'giris-cikis');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(member.user.username, member.user.avatarURL)
  .setThumbnail(member.user.avatarURL)
  .setTitle('📥 | Sunucuya katıldı|-yardım yazarak komutları öğrenebilirsin')
  .setTimestamp()
  channel.sendEmbed(embed); 
});

client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', 'giris-cikis');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(member.user.username, member.user.avatarURL)
  .setThumbnail(member.user.avatarURL)
  .setTitle('📤 | Sunucudan ayrıldı | Görüşmek üzere!')
  .setTimestamp()
  channel.sendEmbed(embed); 
});

client.on('message', message => {
  if (message.content === prefix + 'yardım') {
    message.channel.send('```ÇEVİRİ BOTUNA HOŞGELDİNİZ \n -çevir \n -diller \n -davet \n NOT Giriş Çıkış sistemi için giris-cikis kanalı gereklidir```');
  }
});

client.on('message', message => {
  if (message.content === prefix + 'diller') {
    message.channel.send('http://dunyadevletler.blogspot.com.tr/2010/05/dil-kisaltmalari-dil-kodlari.html');
  }
});

client.on('message', message => {
  if (message.content === prefix + 'yapmıcı') {
    message.channel.send('Yapımcım Toprak T#9528 , {files: ["./foto/toprak.png"]}');
  }
});

client.on('message', message => {
  if (message.content === prefix + 'davet') {
    message.channel.send('https://discordapp.com/oauth2/authorize?client_id=442284088506974218&scope=bot&permissions=8');
  }
});

client.login('NDQyMjg0MDg4NTA2OTc0MjE4.Dc8kvQ.eaKSkVeP-JGQGRC-k2qqLKk_qC0');
