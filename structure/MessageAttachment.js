const fs = require("fs")
module.exports = class {
    /**
* Basic class for Discord Attachment
* @param {Attachment} file 
* @param {string} name 
*/
    constructor(file, name) {
        if (typeof file == "string") {
            console.log(file, file.split("/"))
            this.name = file.split("/")
            this.name = this.name[this.name.length - 1]
            this.file = fs.readFileSync(file)
            console.log(this.file, " file")
        } else {
            this.name = name
            this.file = file
        }
    }
}