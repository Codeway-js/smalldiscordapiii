const voice = require('@discordjs/voice')
// const { methods } = require('smalldiscordapi/voice/djv/util/Secretbox')
// class Adaptator{
//     constuctor(clientthis){
//         this.client = clientthis
//     }
//     sendPayload(data){
//         this.client.WS.webs.send(data)
//     }
//     destroy(){}
// }
const eventemitter = require('events')
function Trackclient(client) {
    client.WS.on('VOICE_SERVER_UPDATE', d => {
        Adapterset.get(d.guild_id)?.onVoiceServerUpdate(d)
    })
    client.WS.on('VOICE_STATE_UPDATE', d => {
        Adapterset.get(d.guild_id)?.onVoiceStateUpdate(d)
    })
}
const Adapterset = new Map()
function createAdaptator(clientthis, gid) {
    return (methods) => {
        Adapterset.set(gid, methods)
        Trackclient(clientthis)
        return {
            sendPayload(data) {
                console.log(data)
                clientthis.WS.webs.send(JSON.stringify(data))
            },
            destroy() { }
        }
    }
}

module.exports.joinVoiceChannel = async (clientthis, id, gid) => { return await new VoiceConnection(voice.joinVoiceChannel({ selfDeaf: false, "channelId": id, "guildId": gid, "adapterCreator": createAdaptator(clientthis, gid) }), id) }
class VoiceConnection {
    constructor(co, cid) {
        this.connection = co
        this.playing = false
        this.cid = cid
    }
    play(file) {
        this.playing = true
        this.audiorecource = voice.createAudioResource(file)
        this.player = voice.createAudioPlayer()
        
        this.player.play(this.audiorecource)
        voice.entersState(this.connection, voice.VoiceConnectionStatus.Ready, 30e3)
        this.connection.subscribe(this.player)
        // this.connection.on("stateChange",a=>console.log(a))
        // this.connection.on("error",a=>console.warn(a))
        return new dispatcher(this.player)
    }
}
class dispatcher extends eventemitter {
    constructor(player) {
        super()
        this.player = player
        this.player.on("stateChange", (a,b) => {
            if(voice.AudioPlayerStatus.Idle == b.status){
                this.emit("finish")
            }
            })
    }
    destroy() {
        this.player.stop()
        this.player.removeAllListeners()
    }
    pause(){
        this.player.pause()
    }
}

// module.exports.play = (file, connection) => {
//     let audiorecource = voice.createAudioResource(file)
//     let player = voice.createAudioPlayer()
//     player.play(audiorecource)
//     voice.entersState(connection, voice.VoiceConnectionStatus.Ready, 30e3)
//     connection.subscribe(player)

// }