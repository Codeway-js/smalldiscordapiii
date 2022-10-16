
const ws = require('ws')
module.exports = class VoiceWebsocket {
    constructor(clientthis, clienttoken, token, guild_id, endpoint) {
        this.clientthis = clientthis
        this.clienttoken = clienttoken
        this.token = token
        this.guild_id = guild_id
        this.endpoint = endpoint
        this.voicesession = this.clientthis.guilds.cache.get(guild_id).voicesession
        console.log(this.clientthis.guilds.cache.get(guild_id).voicesession)
        let first = true
        this.ws = new ws("wss://" + endpoint+"")
        this.ws.on('message', msg => {
            if(first){
                this.ws.send(JSON.stringify({ "op": 10,"d": {"server_id": "802515159192305674", "user_id": "751131163388543089","session_id": token,"token": clienttoken}}))
                first=false
            }
            let rresult
            try {
                rresult = JSON.parse(msg)
            } catch {
                return console.log(msg+ "nothing or buffer")
            }
            console.log(rresult)
            if (rresult.op == 8) {
                this.heeardbeat = rresult.d.heartbeat_interval
                this.ws.send(JSON.stringify({ op: 3, d: rresult.d.heartbeat_interval }))
                setInterval(() => {
                    this.ws.send(JSON.stringify({ op: 3, d: this.heeardbeat }))
                    console.log("heartbeat")
                }, this.heeardbeat)
            }
        })
        this.ws.once('open', () => {
            this.ws.send(JSON.stringify({ "op": 10,"d": {"server_id": this.guild_id, "user_id": this.clientthis.user.id,"session_id": this.voicesession,"token": token}}))
                
            console.log("test3")
        })
    }

}