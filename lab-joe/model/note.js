'use strict'

const uuid = require('uuid/v4')

module.exports = function Note(title, content){
    return new Promise((resolve, reject) => {
        if(!title || !content) return reject(new Erro('cannot create note. title and content note supplied'))
        this._id = uuid()
        this.title = title
        this.content = content
        
        return resolve(this)
    })
}