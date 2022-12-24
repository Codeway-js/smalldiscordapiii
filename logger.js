const EventEmitter = require('events')
class Loger extends EventEmitter{
    /**
     * logger class is for print all the log
     * @param {boolean} display display or not the log
     */
    constructor(display=false){
        super()
        this.display=display
        this.on("log",m=>{
            if(this.display){
                console.log(m)
            }
        })
    }
    
}
module.exports =  Loger