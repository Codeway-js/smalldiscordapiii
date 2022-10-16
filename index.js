const Client = require("./client")
const Embed = require("./structure/Embeds")
const messageAttachment = require("./structure/MessageAttachment")
const button = require("./structure/MessageComponents/Button")
const Modal = require("./structure/MessageComponents/TextInput")
const answeringcmd = require("./structure/MessageComponents/comandanswering")
const comdanswering = require("./structure/MessageComponents/comandanswering")
const Collection = require("./structure/Collection")
module.exports = {
    Client :Client,
    Embed:Embed,
    MessageAttachment:messageAttachment,
    Collection:Collection,
}
const bot = new Client()
bot.on('ready',()=>{
    console.log("bot is ready")
})
bot.on("message",msg=>{
    if(msg.author.bot) return
    // msg.channel.send("txt",{components:new button(2,"clickme","test")})
    msg.channel.send({content: 'test',embeds: [],components: [],},new messageAttachment("index.js"))
    bot.WS.webs.send(JSON.stringify({
        "op": 4,
        "d": {
          "guild_id": "802515159192305674",
          "channel_id": "802515159192305679",
          "self_mute": false,
          "self_deaf": false
        }
      }))

})
bot.on("interactionCreate",interaction=>{
    if(interaction.custom_id == "test"){
        interaction.reply(new Modal("the final test down",1,"label","mymodal","ùytxtinput"))
    }
    if(interaction.custom_id == "mymodal"){
        console.log(interaction.data.components[0].components)
        interaction.reply(new comdanswering("finish"))
    }
})
bot.login("NzUxMTMxMTYzMzg4NTQzMDg5.GOVaZ-.Ak5ZH2NOR7eZqTeLR_V8ohHbKGsssHH6pBmZbs")