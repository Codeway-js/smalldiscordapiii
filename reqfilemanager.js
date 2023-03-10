const axios = require("axios")
const reqmanager = require("./reqmanager")

const fs = require("fs")
const path = require("path");
function Multipart() {
    this.boundary =
        "NodeDiscordIO" + "-" + "2.5.3";
    this.result = "";
}
Multipart.prototype.append = function (data) {
    /* Header */
    var str = "\r\n--";
    str += this.boundary + "\r\n";
    str += 'Content-Disposition: form-data; name="' + data[0] + '"';
    if (data[2]) {
        str += '; filename="' + data[2] + '"\r\n';
        str += 'Content-Type: application/octet-stream';
    }
    /* Body */
    str += "\r\n\r\n" + (data[1] instanceof Buffer ? data[1] : new Buffer.from(String(data[1]), 'utf-8')).toString('binary');
    this.result += str;
};
Multipart.prototype.finalize = function () {
    this.result += "\r\n--" + this.boundary + "--";
};
/**
 * 
 * @param {String} url to send the message
 * @param {String} token it's nessesary to send a message
 * @param {Object} data the message's data
 * @param {Buffer} file the file to send
 * @param {String} filename the name of the file for discord can be not real
 * @returns 
 */
module.exports = uploadFile = function (url, token, data, file, filename) {
    /* After like 15 minutes of fighting with Request, turns out Discord doesn't allow multiple files in one message...
    despite having an attachments array.*/
    var startfile, multi, message, isBuffer, isString;
    startfile = file
    multi = new Multipart();
    message = data
    isBuffer = (file instanceof Buffer);
    isString = (typeof file === 'string');

    if (!isBuffer && !isString) throw "uploadFile requires a String or Buffer as the 'file' value"
    if (isBuffer) {
        if (!filename) throw "uploadFile requires a 'filename' value to be set if using a Buffer"
        file = file;
    }
    if (isString) try { file = fs.readFileSync(file); } catch (e) { throw "File does not exist: " + file }
    let tab = [
        // ["content", message.content],
        ["mentions", ""],
        ["tts", false],
        ["nonce", message.nonce],
        ["file", file, filename || path.basename(startfile)]
    ]
    Object.keys(message).forEach(key => {
        
    
    if (!Array.isArray(message[key])||(Array.isArray(message[key]) &&message[key].length>0)) {
            tab.push([key, message[key]])
        }
    })
    tab.forEach(multi.append, multi);
    multi.finalize();
    return reqmanager(url, token, multi.result, { method: "post", header: "multipart/form-data; boundary=" + multi.boundary });

};
