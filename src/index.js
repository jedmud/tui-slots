const deepmerge = require('deepmerge')
const defautConfig = require('../config.json')
const Screen = require('./screen')
const Slot = require('./slot')

module.exports = class {
    constructor() {
        this.config = {}

        this.slots = {
            screen: new Screen()
        }
    }

    configure(config) {
        for (const slot of config) {
            this.config[slot.name] = deepmerge(defautConfig, slot)
            this.slots[slot.name] = new Slot(this, slot.name)
        }

        return this
    }

    resolve() {
        for (const name in this.slots) {
            this.slots[name].resolve()
        }

        return this
    }

    write() {
        let content = ''

        for (const name in this.slots) {
            content += this.slots[name].compile()
        }

        process.stdout.write(content)
    }

    restore() {
        process.stdout.write(this.slots.screen.restore())
    }

    fetch(name = null) {
        if (name !== null) {
            return this.slots[name].params.inner
        }

        const params = {}

        for (const name in this.slots) {
            params[name] = this.slots[name].params.inner
        }

        return params
    }
}
