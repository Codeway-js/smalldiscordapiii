const nacle = require('tweetnacl')
console.log(nacle.secretbox(new Uint8Array([7,8]),new Uint8Array(24),new Uint8Array([185,73,135,126,230,103,61,100,165,245,174,35,36,190,20,128,115,15,40,137,165,247,232,243,124,36,7,42,34,204,177,55])))
const ffmepg = require('ffmpeg-static')
console.log(ffmepg)