const Resolver = require('./resolver')
const Compiler = require('./compiler')

module.exports = class {
    constructor(slots, name) {
        this.params = {
            inner: {},
            outer: {},
        }

        const config = slots.config[name]
        const parent = slots.slots[config.parent].params.inner

        this.resolver = new Resolver(config, parent, this.params)
        this.compiler = new Compiler(config, this.params.outer)
    }

    resolve() {
        return this.resolver.resolve()
    }

    compile() {
        return this.compiler.compile()
    }
}
