const restmanager = require("../reqmanager")
const guild = require("./Guild")
const Collection = require("./Collection")
module.exports = class Guilds {
    /**
     * @param {string} token for fetch all element
     */
    constructor(token,client) {
        this.token = token
        this.client = client
        this.cache = new Collection()
        restmanager('https://discord.com/api/v9/users/@me/guilds', this.token, {}, { method: "get" }).then(data => {
            for (let i of data.data) {
                restmanager('https://discord.com/api/v9/guilds/' + i.id, this.token, {}, { method: "get" }).then(data2 => {
                    this.cache.set(i.id, new guild(data2.data, this.token,this.client))
                })
            }
            // console.log(data)
        })
    }
    /**
     * fetch an guild if there aren't on the collection
     * @param {number} id 
     */
    async fetch(id) {
        if (this.cache.get(id)) return this.cache.get(id)
        let guidsdata = await restmanager("https://discord.com/api/v9/guilds/" + id, this.token, {}, { method: 'get', return: true })
        return guild(guidsdata.id, this.token,this.client)
    }
    async get(id) {
        this.fetch(id)
    }
}