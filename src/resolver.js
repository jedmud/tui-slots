module.exports = class {
    constructor(config, parent, params) {
        this.config = config
        this.parent = parent
        this.params = params
    }

    resolve() {
        this.params.outer.width = this.outerWidth()
        this.params.outer.height = this.outerHeight()
        this.params.outer.left = this.outerLeft()
        this.params.outer.top = this.outerTop()
        this.params.inner.width = this.innerWidth()
        this.params.inner.height = this.innerHeight()
        this.params.inner.left = this.innerLeft()
        this.params.inner.top = this.innerTop()
    }

    outerWidth() {
        if (this.config.width !== null) {
            return this.config.width
        }

        return this.parent.width
            - this.config.left
            - this.config.right
    }

    outerHeight() {
        if (this.config.height !== null) {
            return this.config.height
        }

        return this.parent.height
            - this.config.top
            - this.config.bottom
    }

    outerLeft() {
        if (this.config.left !== null) {
            return this.parent.left
                + this.config.left
        }

        return this.parent.left
            + this.parent.width
            - this.config.right
            - this.config.width
    }

    outerTop() {
        if (this.config.top !== null) {
            return this.parent.top + this.config.top
        }

        return this.parent.top
            + this.parent.height
            - this.config.bottom
            - this.config.height
    }

    innerWidth() {
        return this.params.outer.width
            - this.config.borders.left.length
            - this.config.borders.right.length
            - this.config.padding.left
            - this.config.padding.right
    }

    innerHeight() {
        return this.params.outer.height
            - this.config.borders.top.length
            - this.config.borders.bottom.length
            - this.config.padding.top
            - this.config.padding.bottom
    }

    innerLeft() {
        return this.params.outer.left
            + this.config.borders.left.length
            + this.config.padding.left
    }

    innerTop() {
        return this.params.outer.top
            + this.config.borders.top.length
            + this.config.padding.top
    }
}
