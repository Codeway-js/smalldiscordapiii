const Role = require("./Role")
const Collection = require("./Collection")
const restmanager = require("../reqmanager")
module.exports = class Roles {
    /**
     * @param {Role[]} data 
     * @param {string} token to fetch all Roles
     * @param {number} guild_id 
     */
    constructor(data, token,guid_id){
       this.token = token
       this.guild_id = guid_id
       this.cache = new Collection()
       data.forEach(element => {
        this.cache.set(element.id, new Role(element,token,guid_id))
    });
    }
    /**
     * Get a role data by its ID
     * @param {number} id 
     */
    async getbyid(id){
        let data = await restmanager("https://discord.com/api/v10/guids/"+guild_id+"/roles/"+id,this.token,{},{method:'get',return:true})
        return new Role(data,this.token)
    }
    
}