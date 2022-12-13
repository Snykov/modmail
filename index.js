// System Modmail Discord - By Snykov

const discord = require("discord.js");
const translate = require("./tools/translate")
const client = new discord.Client()
  const {
  token,
  prefix,
  ServerID
} = require("./config.json")


client.on('ready', () => {
client.user.setActivity("By Snykov", {type: 'LISTENING'});

 console.log("✅ - Logado em "+client.user.username+" com sucesso!")


console.log(`\u001b[32m`, `―――――――――――――――――― Mey ――――――――――――――――――`)
console.log(`\u001b[37m`, `${client.user.username} Conectou com sucesso no Discord!`)
console.log(`\u001b[32m`, `―――――――――――――――――― Mey ――――――――――――――――――`)
console.log(`\u001b[32m`, `Nome do Bot:`, client.user.username)
console.log(`\u001b[32m`, 'Tag do Bot:', client.user.discriminator)
console.log(`\u001b[32m`, 'Bot ID:', client.user.id)
console.log(`\u001b[32m`, 'Servidores:', client.guilds.cache.size)
console.log(`\u001b[32m`, 'Membros:', client.users.cache.size)
console.log(`\u001b[32m`, 'Canais:', client.channels.cache.size)
console.log(`\u001b[32m`, 'Criado em:', client.user.createdAt)
console.log(`\u001b[32m`, 'Status:', client.user.presence.status)

});

const config = 
require('config.json');

const RPC = require("discord-rpc");
const rpc = new RPC.Client({
  transport: "ipc"})

const express = require("express"); 
const cheerio = require('cheerio');
const rp = require('request-promise');
const fs = require("fs");
const request = require("request");
const app = express(); 
app.get("/", (request, response) => { 
const ping = new Date(); 
ping.setHours(ping.getHours() - 3); 
console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`); 
response.sendStatus(200); 
}); 

app.listen(process.env.PORT); // Recebe solicitações que o deixa online 

   client.on('channelDelete', channel => {
  if (
      channel.parentID ==
      channel.guild.channels.cache.find(x => x.name == 'MODMAIL').id
  ) {
      const person = channel.guild.members.cache.find(x => x.id == channel.name);

      if (!person) return;

      let yembed = new discord.MessageEmbed()
          .setAuthor('MAIL DELETEDO')
          .setColor('RED')
          .setFooter('By Github : Snykov')
        .setTimestamp(new Date())
          .setDescription('Description By Github : Snykov');
      return person.send(yembed);
  }
});

client.on('message', async message => {
  if (message.author.bot) return;

  const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
  let command = args.shift().toLowerCase();

  if (message.guild) {
      if (command == 'mod-mail') {
          if (!message.content.startsWith(prefix)) return;
          if (!message.member.hasPermission('ADMINISTRATOR')) {
              return message.channel.send(
                  'Você precisa de permissões de administrador para configurar o sistema modmail!'
              );
          }

          if (!message.guild.me.hasPermission('ADMINISTRATOR')) {
              return message.channel.send(
                  'O bot precisa de permissões de administrador para configurar o sistema modmail!'
              );
          }

          let role = message.guild.roles.cache.find(x => x.name == 'Staff');
          let everyone = message.guild.roles.cache.find(x => x.name == '@everyone');

          if (!role) {
              role = await message.guild.roles.create({
                  data: {
                      name: 'Staff',
                      color: 'YELLOW'
                  },
                  reason: 'Função necessária for ModMail System'
              });
          }

          await message.guild.channels.create('MODMAIL', {
              type: 'category',
              topic: 'Todo o correio estará aqui ',
              permissionOverwrites: [
                  {
                      id: role.id,
                      allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                  },
                  {
                      id: everyone.id,
                      deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                  }
              ]
          });

          return message.channel.send('A configuração está concluída✅');
      } else if (command == 'close') {
          if (!message.content.startsWith(prefix)) return;
          if (!message.member.roles.cache.find(x => x.name == 'Staff')) {
              return message.channel.send(
                  ' Você precisa da função de equipe para usar este comando'
              );
          }
          if (
              message.channel.parentID ==
              message.guild.channels.cache.find(x => x.name == 'MODMAIL').id
          ) {
              const person = message.guild.members.cache.get(message.channel.name);

              if (!person) {
                  return message.channel.send(
                      'Não consigo fechar o canal e este erro está ocorrendo porque provavelmente o nome do canal foi alterado'
                  );
              }

              await message.channel.delete();

              let yembed = new discord.MessageEmbed()
                  .setAuthor('MAIL CLOSED')
                  .setDescription('*By Github : Snykov*')
                  .setColor('RED')
                  .setFooter('SRET By Github : Snykov','image url'); 
              if (args[0]) embed.setDescription(`Reason: ${args.join(' ')}`);
              return person.send(yembed);
          }
      } else if (command == 'open') {
          if (!message.content.startsWith(prefix)) return;
          const category = message.guild.channels.cache.find(
              x => x.name == 'MODMAIL'
          );
    
          if (!category) {
              return message.channel.send(
                  '  O sistema de moderação não está configurado neste servidor, use ' +
                      prefix +
                      'setup'
              );
          }

          if (!message.member.roles.cache.find(x => x.name == 'Staff')) {
              return message.channel.send(
                  'Você precisa da função `Staff` para usar este comando'
              );
          }

      
          if (isNaN(args[0]) || !args.length) {
              return message.channel.send(
                  'Por favor, forneça a identidade da pessoa'
              );
          }
     const target = message.guild.members.cache.find(x => x.id === args[0]);

          if (!target) {
              return message.channel.send('Incapaz de achar this pessoa.');
          }

          const channel = await message.guild.channels.create(target.id, {
              type: 'text',
              parent: category.id,
              topic:
                  'Correio é aberto diretamente por **' +
                  message.author.username +
                  '**para fazer contato com' +
                  message.author.tag
          });

          let nembed = new discord.MessageEmbed()
              .setAuthor('DETAILS', target.user.displayAvatarURL({ dynamic: true }))
              .setColor('BLUE')
              .setDescription(message.content)
              .addField('Name', target.user.username)
              .addField('Data de criação de conta', target.user.createdAt)
              .addField(
                  'Contato Direto',
                  'Sim (significa que este e-mail é aberto por uma equipe)'
              );

          channel.send(nembed);

          let uembed = new discord.MessageEmbed()
              .setAuthor('CORREIO DIRETO ABERTO')
              .setColor('GREEN')
              .setDescription(
                  'Você foi contatado pela equipe of **' +
                      message.guild.name +
                      '**,Por favor, espere até que ele envie outra mensagem para você!!'
              );

          target.send(uembed);

          let newEmbed = new discord.MessageEmbed()
              .setDescription('Abriu o Correio: <#' + channel + '>')
              .setColor('GREEN');

          return message.channel.send(newEmbed);
      } else if (command == 'Preciso de Ajuda') {
          if (!message.content.startsWith(prefix)) return;
          let embed = new discord.MessageEmbed()
              .setAuthor('MODMAIL BOT')
              .addField(
                  '$setup',
                  '  Configure o sistema modmail (Isto não é para vários servidores.)',
                  true
              )

              .addField(
                  '$open',
                  ' Deixe você abrir o e-mail para entrar em contato com qualquer pessoa com sua ID ',
                  true
              )
          
              .setThumbnail(client.user.displayAvatarURL())
              .addField(
                  '$close',
                  'Feche o correio in qual você usa this command.',
                  true
              );

          return message.channel.send(embed);
      }
  }

  if (message.channel.parentID) {
      const category = message.guild.channels.cache.find(
          x => x.name == 'MODMAIL'
      );

      if (message.channel.parentID == category.id) {
          let member = message.guild.members.cache.get(message.channel.name);

          if (!member) return message.channel.send('Incapaz de enviar mensagem');

          let lembed = new discord.MessageEmbed()
              .setColor('RED')
              .setFooter('By Github : Snykov')
              .setTimestamp(new Date())
              .setAuthor('Team members you contacted',message.author.displayAvatarURL({ dynamic: true }))
              .setDescription(message.content);

          return member.send(lembed);
      }
  }

  if (!message.guild) {
      const guild =
          (await client.guilds.cache.get(ServerID)) ||
          (await client.guilds.fetch(ServerID).catch(m => {}));
      if (!guild) return;
      const category = guild.channels.cache.find(x => x.name == 'MODMAIL');
      if (!category) return;
      const main = guild.channels.cache.find(x => x.name == message.author.id);

      if (!main) {
          let mx = await guild.channels.create(message.author.id, {
              type: 'text',
              parent: category.id,
              topic:
                  'Este e-mail foi criado for ajudando**' + message.author.tag + ' **'
          });
          
let sembed = new discord.MessageEmbed()
       .setAuthor('MAIL OPENED')
               .setColor('GREEN')
       .setDescription(
                  '*By Github : Snykov Message principal')
              .setFooter('By Github : Snykov ','image server url') 
              .setTimestamp(new Date())
  
      message.author.send(sembed);

          let eembed = new discord.MessageEmbed()
              .setAuthor(
                  'DETAILS', message.author.displayAvatarURL({ dynamic: true }))
              
              .setColor('BLUE')
              .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
              .setDescription(message.content)
              .addField('Name', message.author.username)
              .addField('data de criação da conta', message.author.createdAt)
              .addField(
                  ' contato direto',
                  'Não (significa que este this e-mail é aberto por uma pessoa, não por uma equipe) '
              );

          return mx.send(eembed);
      }


      let xembed = new discord.MessageEmbed()
          .setColor('RED')
          .setAuthor(
              message.author.tag,
              message.author.displayAvatarURL({ dynamic: true })
          )
          .setDescription(message.content);

      main.send(xembed);
  }
}); 


 client.login(token)