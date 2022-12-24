/**
 * Collection are map but with more function
 */
let Collection = Map

/**
 * Convert all the values in to an array
 * @returns {Array}
 */
Collection.prototype.array = function (){
    return [...this.values()]
}
/**
 * convert all the key (id) in to an array
 * @returns {Array}
 */
Collection.prototype.keyArray = function (){
    return [...this.keys()]
}
/**
 * return the first element of a colection
 * @param {number} return the n number if specified 
 * @returns {*} return the class of the ellement
 */
Collection.prototype.first = function (number){
    if(number == undefined){
        return this.values().first()
    }
    let iter = this.values()
    return Array.from({length:number},()=>iter.next().value)
}
/**
 * return the first key of a collection
 * @param {number} number return the n number fi specified
 * @returns {string} id
 */
Collection.prototype.firstKey = function (number){
    if(number == undefined){
        return this.keys().first()
    }
    let iter = this.keys()
    return Array.from({length:number},()=>iter.next().value)
}
/**
 * return the last element of a colection
 * @param {number} return the n number if specified 
 * @returns {*} return the class of the ellement
 */
Collection.prototype.last = function (number){
    let arr = this.array()
    if(number == undefined){
        return arr[arr.length-1]
    }
    return arr.slice(-number)
}
/**
 * return the first key of a collection
 * @param {number} number return the n number fi specified
 * @returns {string} id
 */
Collection.prototype.lastKey = function (number){
    let arr = this.keyArray()
    if(number == undefined){
        return arr[arr.length-1]
    }
    return arr.slice(-number)
}
/**
 * return a random element
 * @returns {*} return a random element of the collection
 */
Collection.prototype.random = function (){
    let arr = this.array()
    return arr[Math.floor(Math.random(),arr.length)]
}
/**
 * return a random key
 * @returns return a random key of the collection
 */
Collection.prototype.randomKey = function (){
    let arr = this.keyArray()
    return arr[Math.floor(Math.random(),arr.length)]
}
/**
 * return the first element of the condition
 * @param {condition} condition 
 * @returns {*} element
 */
Collection.prototype.find = function (condition){
    let arr = this.array()
    return arr.find()
}
/**
 * return the key element of the condition
 * @param {condition} condition 
 * @returns {*} element
 */
Collection.prototype.findKey = function (condition){
    let arr = this.keyArray()
    return arr.find()
}
module.exports = Collection