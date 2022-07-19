const ansi = require('ansi-escapes')

module.exports = class {
    constructor(config, params) {
        this.config = config
        this.params = params
    }

    compile() {
        if (this.params.height >= 1 && this.params.width >= 1) {
            return this.make()
        }

        return ''
    }

    make() {
        let content = ''

        if (this.config.borders.left.length === 1) {
            content += this.vertical(
                this.params.left,
                this.params.top,
                this.params.height,
                this.config.borders.left
            )
        }

        if (this.config.borders.right.length === 1) {
            content += this.vertical(
                this.params.left + this.params.width - 1,
                this.params.top,
                this.params.height,
                this.config.borders.right
            )
        }

        if (this.config.borders.top.length === 1) {
            content += this.horizontal(
                this.params.left,
                this.params.top,
                this.params.width,
                this.config.borders.top
            )
        }

        if (this.config.borders.bottom.length === 1) {
            content += this.horizontal(
                this.params.left,
                this.params.top + this.params.height - 1,
                this.params.width,
                this.config.borders.bottom
            )
        }

        return content
    }

    horizontal(left, top, width, chr) {
        return ansi.cursorTo(left, top) + Array(width + 1).join(chr)
    }

    vertical(left, top, height, chr) {
        let line = ''

        for (let i = top, l = top + height; i < l; i++) {
            line += ansi.cursorTo(left, i) + chr
        }

        return line
    }
}
