const restmanger = require('../reqmanager')
function formatColor(color) {
    if (color.startsWith('#'))
        return parseInt(color.split('#')[1], 16);
    if (color === 'RANDOM')
        return Math.floor(Math.random() * (0xffffff + 1));
    return Number(color);
}
const Role = require('./Role')
module.exports = class {
    /**
     * Function to init the data of the member, such as id, username, avatar, ...
     * @param {MemberData} data 
     */
    patch(data){
        this.id = data.user.id;
        this.username = data.user.username;
        this.avatar = data.user.avatar;
        this.discriminator = data.user.discriminator;
        this.tag = `${this.username}#${this.discriminator}`;
        this.roles = data.roles;
    }
    /**
     * Basic class for Discod Member (Why there is a token here ?)
     * @param {MemberData} data 
     * @param {string} token 
     * @param {number} guildID 
     */
    constructor(data,token,guildID){
        this.patch(data)
        this.guildID = guildID
        this.token = token
    }
    /**
     * Add a role to this user
     * @param {number} RoleId 
     */
    addrole(RoleId){
        if(RoleId instanceof Role){
            RoleId=RoleId.id
        }
        restmanger("https://discord.com/api/v10/guilds/"+this.guildID+'/members/'+this.id+"/roles/"+RoleId,token,{},{method:"put"})
    }
    
    /**
     * Kick this member from a guild
     */
    kick(){
        restmanger("https://discord.com/api/v10/guilds/"+this.guildID+'/members/'+this.id,token,{},{method:"delete"})
    }
    /**
     * Ban this member from a guild
     */
    ban(){
        restmanger("https://discord.com/api/v10/guilds/"+this.guildID+'/bans/'+this.id,token,{},{method:"put"})
    }
}