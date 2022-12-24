const eventmodule = require('events')
const websocket = require('./websocket')
const Guilds = require('./structure/Guilds');
const User = require('./structure/User')
const reqmanager = require('./reqmanager')
const logger = require("./logger")
module.exports = class Client extends eventmodule {
    /**
     * Basic class for Discord client API
     * @param {Object} option 
     */
    constructor(option) {
        super();
        if (option) {
            this.option = option
        }
        this.up = false
        this.logs = new logger(this.option.display)

    }
    /**
     * Login to Discord Server with the token
     * Why is there an await/async keyword ?
     * @param {string} token 
     */
    async login(token) {
        this.token = token
        this.WS = new websocket(token, this)
        this.guilds = await new Guilds(token,this)
        this.on("ready", () => {
            this.up = true
            this.logs.emit("log","[Client] ready at "+Date.now().toString())
            this.readyAt = new Date(Date.now())
            this.readyTimestamp = Date.now()
        })
        this.uptime = this._getuptime()
        // reqmanager('https://discord.com/api/v9/users/@me/guilds',token,{},{method:"get"})
        // this.guilds.cache 
        reqmanager('https://discord.com/api/v9/users/@me', token, {}, { method: "get" }).then(datar => {
            const data = datar.data
            this.user = new User(data, token)
        })
    }
    _getuptime() {
        if (!this.up) return
        return (new Date(Date.now()).getMilliseconds()) - this.readyAt.getMilliseconds()
    }
}
