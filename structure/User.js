const badges = require("./badge")
module.exports = class{
    /**
     * Function to take all of the message data and put it in this class instance
     * @param {MessageData} data 
     */
    patch(data){
        this.avatar = data.avatar;
        this.id = data.id;
        this.discriminator = data.discriminator;
        this.username = data.username;
        this.badges = new badges(data.public_flags);
        this.tag = `${this.username}#${this.discriminator}`;
        this.bot = data.bot ? true : false;
    }
    
    /**
     * Basic class for Discord User (Why there is a token here ?)
     * @param {MessageData} messagedata 
     * @param {string} token 
     */
    constructor(messagedata,token){
        this.token = token
        this.patch(messagedata)
    }
}