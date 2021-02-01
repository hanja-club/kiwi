
const fs = require('fs')
const path = require('path')
const {Liquid} = require('liquidjs')

const SKIN_CONFIG_FILENAME = 'skin.json'

const Skin = class Skin {
    constructor(index='') {
        this.liquid = new Liquid()
        this.index = index
    }
    formatIndex(vars) {
        return this.liquid.parseAndRenderSync(this.index, vars)
    }
}

Skin.load = function(dir) {
    const skin = new Skin
    try {
        const json = fs.readFileSync(path.join(dir, SKIN_CONFIG_FILENAME)).toString()
        const data = JSON.parse(json)
        const {index} = data
        skin.index = fs.readFileSync(path.join(dir, index)).toString()
    } catch(error) {
        console.error(error)
    }
    return skin
}

module.exports = Skin
