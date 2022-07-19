const ansi = require('ansi-escapes')

module.exports = class {
    constructor() {
        this.params = {
            inner: {},
            outer: {},
        }
    }

    resolve() {
        this.params.inner.left = this.params.outer.left = 0
        this.params.inner.top = this.params.outer.top = 0
        this.params.inner.width = this.params.outer.width = process.stdout.columns
        this.params.inner.height = this.params.outer.height = process.stdout.rows

        return this
    }

    compile() {
        return ansi.cursorHide + ansi.cursorTo(0, 0) + ansi.eraseDown
    }

    restore() {
        return ansi.cursorShow + ansi.cursorTo(0, 0) + ansi.eraseDown
    }

}
